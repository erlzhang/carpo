export default class Alert {
  constructor (type, message=false) {
    this.icons = {
      "success": "checkmark",
      "warning": "warning",
      "danger": "cancel" 
    }

    this.defaultMessages = {
      "success": "操作成功！",
      "warning": "操作失败，请重新操作！",
      "danger": "网络通讯错误！请检查当前网络或联系管理员！"
    }

    this.show(type, message)
  }

  initContent (type, message) {
    let container = document.createElement("div")
    container.classList.add("alert", "alert-float", "fixed-bottom", "alert-" + type)
    container.setAttribute("role", "alert")

    let content = ""
    content += '<span class="icon-' + this.icons[type] + ' mr-3"></span>'
    content += message
    content += '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'

    container.innerHTML = content
    document.body.appendChild(container)

    let self = this

    setTimeout( () => {
      document.body.removeChild(container)
      self = null
    }, 15000 )
  }

  show (type, message=false) {
    message = message || this.defaultMessages[type]
    this.initContent(type, message)
  }
   
}
