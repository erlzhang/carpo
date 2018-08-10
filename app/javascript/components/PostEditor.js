import MediumEditor from 'medium-editor'
export default class PostEditor {
  constructor () {
    this.ele = document.getElementById("editorContainer")
    this.form = document.getElementsByTagName("form")[0]
    this.textarea = document.getElementById("post_content")

    this.editor = new MediumEditor(this.ele)

    this.form.addEventListener("ajax:before", () => {
      this.sync()  
    })
  }

  sync () {
  }
}
