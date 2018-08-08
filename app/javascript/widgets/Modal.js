export default class Modal {
  constructor (modalId, btnId) {
    this.modalEle = document.getElementById(modalId)
    this.controller = document.getElementById(btnId)
    this.closeBtn = document.querySelector(".modal-header close")

    this.controller.addEventListener("click", () => this.show() )

    if( this.closeBtn ) {
      this.closeBtn.addEventListener("click", () => this.hide() )
    }

    this.modalEle.addEventListener("click", (event) => {
      if( event.target.getAttribute("role") == "dialog" ) {
        this.hide()
      }
    })
  }

  show () {
    this.modalEle.classList.add("show")
    this.modalEle.style.display = "block"
    this.addBackdrop()

    let e = document.createEvent("HTMLEvents")
    e.initEvent("modal:shown", true, false)
    this.modalEle.dispatchEvent(e)
  }

  hide () {
    this.modalEle.classList.remove("show")
    this.modalEle.style.display = "none"
    this.removeBackdrop()

    let e = document.createEvent("HTMLEvents")
    e.initEvent("modal:hidden", true, false)
    this.modalEle.dispatchEvent(e)
  }

  addBackdrop () {
    this.backdrop = document.createElement("div");
    this.backdrop.classList.add("modal-backdrop", "fade", "show")
    document.body.appendChild(this.backdrop)
  }

  removeBackdrop() {
    document.body.removeChild(this.backdrop)
  }
}
