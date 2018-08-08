import Alert from 'components/Alert.js'

export default class BookConfigPanel {
  constructor () {
    let self = this;

    this.toggleBtn = document.getElementById("toggleBookConfig");
    this.cancelBtn = document.getElementById("collapseSideForm")

    this.panel = document.getElementById("bookConfig")
    this.form = document.querySelector(".edit_book")
    this.title = document.getElementById("bookTitle")
    this.description = document.getElementById("bookDescription")

    this.isOpen = false;

    this.toggleBtn.addEventListener("click", () => {
      self.show(); 
    });

    this.cancelBtn.addEventListener("click", () => {
      self.hide();
    })

    this.form.addEventListener("ajax:success", (event) => {
      let data = event.detail[0]
      self.update(data)
      self.hide()
      new Alert('success', data.message)
    })
  }

  show () {
    if( this.isOpen ) {
      return
    }
    this.panel.classList.add("on")
    this.isOpen = true
  }

  hide () {
    if( !this.isOpen ) {
      return
    }
    this.panel.classList.remove("on")
    this.isOpen = false
  }

  update (data) {
    this.title.innerText = data.title
    this.title.innerHtml = data.description
  }
}
