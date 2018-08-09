import Modal from 'widgets/Modal.js'
import ValidFeedback from 'widgets/ValidFeedback.js'

const bookModal = new Modal('newBookModal', 'btnNewBook'),
      newBook = document.getElementById("new_book"),
      feedback = new ValidFeedback("book")

newBook.addEventListener("ajax:success", (event) => {
  let book = event.detail[0]
  bookModal.hide() 
  window.location.href = window.location.origin + '/manage/books/' + book.id
})

newBook.addEventListener("ajax:error", (event) => {
  let errors = event.detail[0]
  feedback.show(errors)
})

bookModal.modalEle.addEventListener("modal:hidden", (event) => {
  feedback.hideAll()
})

const deleteBtns = document.getElementsByClassName("delete-book")

for( let btn of deleteBtns ) {
  btn.addEventListener("ajax:success", (event) => {
    let data = event.detail[0]
    if( data.respond ) {
      let col = event.target
      while ( !col.classList.contains("book-col") ) {
        col = col.parentNode
      }
      col.parentNode.removeChild(col)
    } else {
      new Alert("warning", data.message) 
    }
  })
  btn.addEventListener("ajax:error", (event) => {
    new Alert("danger")
  })
}
