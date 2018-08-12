import Sortable from 'sortablejs'
import axios from 'axios'

import Alert from 'widgets/Alert.js'

export default class VolumePanel {
  constructor (titleEle) {
    this.titleEle = titleEle
    this.descEle = document.getElementById("volumeDescription")

    this.editTitle = (event) => {
      this.edit(this.titleEle, (newText, originText) => this.updateTitle(newText, originText))
    }

    this.editDesc = (event) => {
      this.edit(this.descEle, (newText, originText) => this.updateDesc(newText, originText))
    }
    this.titleEle.addEventListener("dblclick", this.editTitle)
    this.descEle.addEventListener("dblclick", this.editDesc)
    this.list = document.getElementById("sortableList")

    document.addEventListener("ajax:success", (event) => {
      if( event.target.classList.contains("release-post") ) {
        event.target.classList.add("d-none")
        event.target.nextElementSibling.classList.remove("d-none")
        new Alert("success")
      }

      if( event.target.classList.contains("post-withdraw") ) {
        event.target.classList.add("d-none")
        event.target.previousElementSibling.classList.remove("d-none")
        new Alert("success")
      }

      if( event.target.classList.contains("delete-post") ) {
        event.target.parentNode.removeChild(event.target)
        new Alert("success")
      }

    })
    document.addEventListener("ajax:error", (event) => {
      new Alert("danger")
    })
  }

  edit (ele, fn) {
    let originText = ''

    if( ele.classList.contains("hint") ) {
      ele.innerText = ''
    } else {
      originText = ele.innerText
    }
    ele.contentEditable = true

    ele.focus()
    ele.addEventListener("blur", () => {
      let newText = ele.innerText
      if( newText == "" ) {
        ele.innerText = originText
      } else if ( newText != originText ) {
        fn.call(this, newText, originText)
      }
      ele.contentEditable = false
    })

  }

  updateDesc (newText, originText) {
    let url = window.location.origin + this.descEle.getAttribute("data-url-updatedescription") + ".json"
    axios({
      url: url,
      method: 'get',
      responseType: "json",
      params: {
        description: newText
      }
    })
    .then((response) => {
      new Alert("success")
    })
    .catch((error) => {
      new Alert("danger")
      this.titleEle.innerText = originText
    })
  }

  updateTitle (newText, originText) {
    let url = window.location.origin + this.titleEle.getAttribute("data-url-updatename") + ".json"
    axios({
      url: url,
      method: 'get',
      responseType: "json",
      params: {
        title: newText
      }
    })
    .then((response) => {
      new Alert("success")
    })
    .catch((error) => {
      new Alert("danger")
      this.titleEle.innerText = originText
    })
  }

  //callbacks

  sortEndCallback () {

  }

}
