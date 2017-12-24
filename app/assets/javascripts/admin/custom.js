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

function showAlert(type, message){
  if( !message ) {
    if( type == "success" ){
      message = "操作成功！"
    }else {
      message = "网络通讯错误！请检查当前网络或联系管理员！"
    }
  }
  var content = "";
  content += '<div class="alert alert-' + type + ' alert-float fixed-bottom" role="alert">'
  content += message
  content += '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
  content += '</div>'
  $("body").append(content);
}
