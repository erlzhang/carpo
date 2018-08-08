import Alert from 'components/Alert.js'

export default class ProfilePanel {
  constructor () {
    this.nameInput = document.getElementById("author_name")
    this.progress = document.getElementById("authorProgress")
    this.progressList = document.querySelectorAll(".author-new-progress li")
    this.newAuthor = document.getElementById("new_author")
    this.authorAvatar = document.getElementById("author_avatar")

    this.nameInput.addEventListener("input", () => this.canSubmitStep1() )

    this.newAuthor.addEventListener("ajax:success", () => this.step2())
    this.newAuthor.addEventListener("ajax:error", () => new Alert("danger") )
    this.authorAvatar.addEventListener("ajax:success", () => this.step3())
    this.authorAvatar.addEventListener("ajax:error", () => new Alert("danger") )

  
  }

  step2 () {
    this.progress.classList.add("half")
    setTimeout( () => {
      this.progressList[1].classList.add("active") 
      document.getElementById("step-1").style.display = "none"
      document.getElementById("step-2").style.display = "block"
      this.bindAvatarEvents()
    }, 300 )
  }

  bindAvatarEvents () {
    this.avatarList = document.getElementsByName("author[avatar_id]")
    this.currentAvatar = document.getElementById("currentAvatar")
    this.avatarUploader = document.getElementById("author_file_avatar")
    this.removeAvatar = document.getElementById("author_remove_file_avatar")

    for( let avatar of this.avatarList ) {
      if( avatar.checked && !this.currentAvatar.getAttribute("data-file") ) {
        this.avatarFromChecked( avatar )
      }
      avatar.addEventListener("click", (event) => {
        console.log(event.target)
        this.avatarFromChecked( event.target )
      })
    }

    this.avatarUploader.addEventListener("change", () => this.avatarFromUploader())
  }

  avatarFromChecked (input) {
    this.checkedAvatar = input

    let img,
        childNodes = input.nextElementSibling.childNodes

    for( let child of childNodes ) {
      if( child.nodeName == "IMG" ) {
        img = child
        break
      }
    }

    this.currentAvatar.style.backgroundImage = "url('" + img.src + "')"
    this.avatarUploader.value = ""
    if( this.removeAvatar ) {
      this.removeAvatar.value = 1
    }
  }

  avatarFromUploader () {
    let file = this.avatarUploader.files[0],
        url = this.getObjectURL(file)

    this.currentAvatar.style.backgroundImage = "url('" + url + "')"
    this.checkedAvatar.removeAttribute("checked")
    if( this.removeAvatar ) {
      this.removeAvatar.value = 0
    }
  }

  step3 () {
    this.progress.classList.remove("half")
    this.progress.classList.add("done")
    setTimeout( () => {
      this.progressList[2].classList.add("active") 
      document.getElementById("step-2").style.display = "none"
      document.getElementById("step-3").style.display = "block"
    }, 300 )
  
  }

  canSubmitStep1 () {
    let submitBtn = document.getElementById("submit_author_name")
    if( submitBtn.disabled && this.nameInput.value != "" ) {
      submitBtn.disabled = false
    }
  }

  getObjectURL (file) {
    let url = null;
    if( window.createObjectURL != undefined ){
      url = window.createObjectURL(file)
    }else if (window.URL != undefined) {
      url = window.URL.createObjectURL(file)
    } else if (window.webkitURL != undefined) {
      url = window.webkitURL.createObjectURL(file)
    }
    return url;
  }
}
