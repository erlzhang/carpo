import Alert from 'widgets/Alert.js'

export default class BookConfigPanel {
  constructor () {
    this.toggleBtn = document.getElementById("toggleBookConfig");
    this.cancelBtn = document.getElementById("collapseSideForm")

    this.panel = document.getElementById("bookConfig")
    this.form = document.querySelector(".edit_book")
    this.title = document.getElementById("bookTitle")
    this.desc = document.getElementById("bookDescription")

    this.isOpen = false;

    this.toggleBtn.addEventListener("click", () => this.show() );

    this.cancelBtn.addEventListener("click", () => this.hide() )

    this.form.addEventListener("ajax:success", (event) => {
      let data = event.detail[0]
      this.update(data)
      this.hide()
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
    this.desc.innerText = data.description
  }
}
