//import Sortable

export default class VolumePanel {
  constructor () {
    let self = this

    this.descEle = document.getElementById("volumeDescription")
    this.description.addEventListener("dblclick", (event) => {
      event.preventDefault()
      self.editDescription.call(self)
    })


    this.list = document.getElementById("sortableList")

    this.sortable = new Sortable(this.list, {
      handle: '.post-handle',
      onUpdate: () => {
      
      }
    })
  }

  editDescription () {
    let originText = '',
        descEle = this.descEle,
        self = this

    if( descEle.classList.contain("hint") ) {
      descEle.innerText = '' 
    } else {
      originText = descEle.innerText
    }
    descEle.contentEditable = true
    descEle.focus()
    descEle.addEventListener("blur", () => {
      newText = descEle.innerText
      if( newText == "" ) {
        descEle.innerText = originText
      } else if ( newText != originText ) {
        self.updateDescription.call(self)
      }
      descEle.contentEditable = false
    })
     
  }

  updateDescription () {
  
  }

  //callbacks

  sortEndCallback () {
  
  }

}
