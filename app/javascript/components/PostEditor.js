import MediumEditor from 'medium-editor'
import Alert from 'widgets/Alert.js';

export default class PostEditor {
  constructor () {
    this.ele = document.getElementById("editorContainer")
    this.form = document.getElementsByTagName("form")[0]
    this.textarea = document.getElementById("post_content")

    let options = {
      toolbar: {
        buttons: ['bold', 'italic', 'underline', 'h2', 'h3', 'quote', 'pre', 'unorderedlist', 'anchor', 'removeFormat']
      } 
    }

    this.editor = new MediumEditor(this.ele, options)

    this.form.addEventListener("ajax:before", () => {
      this.sync()  
    })

    this.form.addEventListener("ajax:success", (event) => {
      new Alert("success", event.detail[0].message)
    })
  }

  sync () {
    this.textarea.value = this.editor.getContent()
  }
}
