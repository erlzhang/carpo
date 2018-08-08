import Alert from 'widgets/Alert.js'

export default class BookVolumesPanel {
  constructor () {
    this.newBtn = document.getElementById("addVolume")
    this.list = document.getElementById("volumeList")

    this.current = document.querySelector(".volume.active")

    this.newBtn.addEventListener("click", () => this.newVolume() )

    document.addEventListener("keydown", () => {
      if( event && event.keyCode == 13 ){
        if( this.newEle ) {
          this.newEle.blur()
        }
      }
    });

    document.addEventListener("ajax:success", (event) => {
      let data = event.detail[0]
      if( event.target.classList.contains("delete-volume") ) {
        this.deleteVolumeCallback()
      }
      if( event.target.classList.contains("volume") ) {
        this.changeVolumeCallback(data)
      }
      if( event.target.id == "new_volume" ) {
        this.createVolumeCallback(data)
      }
    })

    document.addEventListener("ajax:error", (event) => {
      new Alert("danger") 
      if( event.target.id == "new_volume" ) {
        this.removeNewVolume()
      }
    })
  }

  newVolume () {
    let ele = document.createElement("li")
    ele.className = "nav-item nav-link active new position-relative"
    ele.contentEditable = true
    this.list.insertBefore(ele, this.newBtn.parentNode);
    ele.focus()
    this.newEle = ele
    this.newEle.addEventListener("blur", () => {
      this.saveNewVolume();
    })
  }

  saveNewVolume () {
    if( this.newEle.innerText == "" ) {
      this.removeNewVolume()
    } else {
      let newVolumeForm = document.getElementById("new_volume")
      document.getElementsByName("volume[title]")[0].value = this.newEle.innerText
      newVolumeForm.submit()
      this.newEle.contentEditable = false
    }
  }

  removeNewVolume () {
    this.newEle.parentNode.removeChild(this.newEle)
    this.newEle = null
  }

  // callbacks

  createVolumeCallback (data) {
    if( data.respond ) {
      this.newEle.innerHTML = '<a data-remote="true" id="volume-' + data.id + '" class="nav-link volume text-truncate" href="' + data.url + '">' + title + '</a>'

      let deleteBtn = document.createElement("a")
      deleteBtn.setAttribute("class", "delete-volume", "close-icon")
      deleteBtn.setAttribute("data-remote", true)
      deleteBtn.setAttribute("data-method", "delete")
      deleteBtn.href = data.url

      this.newEle.appendChild(deleteBtn)

      this.newEle.classList.remove("active", "nav-link", "new")
      new Alert("success", data.message)
    } else {
      this.removeNewVolume()
      new Alert("warning", data.message)
    }
  }

  deleteVolumeCallback (ele) {
  
  }

  changeVolumeCallback (ele) {}

}
