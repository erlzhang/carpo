function invalidInput(errors, modal){
  var i = 0;
  for( var key in errors ){
    var input = $("#" + modal + "_" + key)
    input.addClass("is-invalid");
    if( i == 0 ){
      input.focus();
    }
    i++;
  }
}
