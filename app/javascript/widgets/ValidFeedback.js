export default class ValidFeedback {
  constructor(modal) {
    this.modal = modal
    this.invalidInputs = []
  }

  show (errors) {
    for( let key in errors ) {
      if( this.invalidInputs.includes(key) ) {
        continue
      }
      this.invalidInputs.push(key)
      let input = document.getElementById(this.modal + '_' + key)
      this.addInvalidHint(input, errors[key])
    }

    this.invalidInputs = this.invalidInputs.filter( (key) => {
      if ( !Object.keys(errors).includes(key) ) {
        removeInvalidHint(document.getElementById(this.modal + '_' + key)) 
        return false
      }
      return true
    } )
  }

  removeInvalidHint (input) {
    let hint = input.nextElementSibling
    if( hint.classList.contains("invalid-feedback") ) {
      hint.parentNode.removeChild(hint)
    }
    input.classList.remove("is-invalid")
  }

  addInvalidHint (input, message) {
    let hint = document.createElement("div") 
    hint.classList.add("invalid-feedback")
    hint.innerHTML = message
    input.parentNode.appendChild(hint)
    input.classList.add("is-invalid")
  }

  hideAll () {
    let hints = document.getElementsByClassName("invalid-feedback")
    for( let hint of hints ) {
      hint.previousElementSibling.classList.remove("is-invalid")
      hint.parentNode.removeChild(hint)
    }
    this.invalidInputs = []
  }
}
