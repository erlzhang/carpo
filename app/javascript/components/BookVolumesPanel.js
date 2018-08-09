import Alert from 'widgets/Alert.js';
import Core from 'widgets/Core.js';

import VolumePanel from 'components/VolumePanel.js'

export default class BookVolumesPanel {
  constructor () {
    this.newBtn = document.getElementById("addVolume")
    this.list = document.getElementById("volumeList")

    this.current = document.querySelector(".volume.active")
    this.volumePanel = new VolumePanel(this.current)

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
        this.deleteVolumeCallback(event.target, data)
      }
      if( event.target.classList.contains("volume") ) {
        this.changeVolumeCallback(event.target, data)
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

    document.addEventListener("ajax:before", (event) => {
      if( event.target == this.current ) {
        event.preventDefault()
        return false 
      }
    })
  }

  editVolumeTitle () {
  
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

      // 模拟点击事件，触发rails_ujs提交表单
      Core.dispathMouseEvent("click", "submitNewVolume")
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
      this.newEle.innerHTML = '<a data-remote="true" id="volume-' + data.id + '" data-url-updatename="' + data.update_name_url + '" class="nav-link volume text-truncate" href="' + data.url + '">' + data.title + '</a>'

      let deleteBtn = document.createElement("a")
      deleteBtn.setAttribute("class", "delete-volume close-icon")
      deleteBtn.setAttribute("data-remote", true)
      deleteBtn.setAttribute("data-method", "delete")
      deleteBtn.href = data.url

      this.newEle.appendChild(deleteBtn)

      this.newEle.classList.remove("active", "nav-link", "new")
      new Alert("success", data.message)

      Core.dispathMouseEvent("click", "volume-" + data.id)
    } else {
      this.removeNewVolume()
      new Alert("warning", data.message)
    }
  }

  deleteVolumeCallback (ele, data) {
    if( data.respond ) {
      let pnode = ele
      while ( !pnode.classList.contains("nav-item") ) {
        pnode = pnode.parentNode
      }
      pnode.parentNode.removeChild(pnode)
      new Alert("success", data.message)
      
      // 如果被删除的是当前卷，需要切换当前卷
      let newId = document.getElementsByClassName("volume")[0].id
      Core.dispathMouseEvent("click", newId)
    } else {
      new Alert("danger") 
    }
  
  }

  changeVolumeCallback (ele, data) {
    if( this.current ) {
      this.current.classList.remove("active")
      this.current.removeEventListener("dblclick", this.volumePanel.editTitle)
      this.volumePanel = null
    }
    ele.classList.add("active")
    this.current = ele
    this.volumePanel = new VolumePanel(this.current)
  }
}
