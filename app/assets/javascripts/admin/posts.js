//= require module
//= require hotkeys
//= require simditor
//= require simditor-autosave
//= require marked.min
//= require to-markdown
//= require simditor-markdown
var editor = new Simditor({
  textarea: $('.editor'),
  toolbar: [
   'bold',
   'italic',
   'underline',
   'strikethrough',
   'fontScale',
   'color',
   'title',
   'ol',
   'ul',
   'blockquote',
   'code',
   'link',
   'image',
   'hr',
   'indent',
   'outdent',
   'alignment',
   'markdown'
  ]
});
