export default class BookVolumesPanel {
  constructor () {
    let self = this;
    this.newBtn = document.getElementById("addVolume")
    this.list = document.getElementById("volumeList")

    this.current = document.querySelector(".volume.active")

    this.newBtn.addEventListener("click", () => {
      self.newVolume.call(self) 
    })

    document.addEventListener("keydown", () => {
      if( event && event.keyCode == 13 ){
        if( self.newEle ) {
          self.newEle.blur()
        }
      }
    });

    document.addEventListener("ajax:success", (event) => {
      if( event.target.classList.contains("delete-volume") ) {
        self.deleteVolumeCallback.call(self, event.target)
      }
      if( event.target.classList.contains("volume") ) {
        self.changeVolumeCallback.call(self, event.target)
      }
    })
  }

  newVolume () {
    let self = this, ele = document.createElement("li")
    ele.className = "nav-item nav-link active new position-relative"
    ele.contentEditable = true
    this.list.insertBefore(ele, this.newBtn.parentNode);
    ele.focus()
    this.newEle = ele
    this.newEle.addEventListener("blur", () => {
      self.saveNewVolume();
    })
  }

  saveNewVolume () {
    let self = this;

    if( this.newEle.innerText == "" ) {
    } else {
      let newVolumeForm = document.getElementById("new_volume")
      document.getElementsByName("volume[title]").value = this.newEle.innerText
      newVolumeForm.submit()
    }
    
  }

  // callbacks

  deleteVolumeCallback (ele) {
  
  }

  createVolumeCallback () {
  
  }

  changeVolumeCallback (ele) {}

}
