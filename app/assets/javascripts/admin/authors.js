$("#author").modal({
  show: true,
  backdrop: 'static'
});

$("#authorProgress").carousel({
  interval: false 
})
$("#author_name").on("input", function(){
  var submit = document.getElementById("submit_author_name");
  if( submit.disabled && $(this).val() != "" ){
    submit.disabled = false
  }
});
var avatarList = document.getElementsByName("author[avatar_id]");
var authorId = 5
for( var i = 0; i < avatarList.length; i++ ){
  avatarList[i].onclick = function() {
    if( this.checked ){
      var img = $(this).siblings(".custom-control-description").find("img")
      var src = img[0].src
      $(".current-avatar").css("background-image", "url(" + src + ")");
      currentImg = this.value
      imgType = "id"
    }
  }
}
$("#author_file_avatar").on("change", function(){
  var file = this.files[0];
  var url = getObjectURL(file);
  $(".current-avatar").css("background-image", "url( " + url + " )")
});


//获取上传图片地址
function getObjectURL(file){
  var url = null;
  if( window.createObjectURL != undefined ){
    url = window.createObjectURL(file)
  }else if (window.URL != undefined) {
    url = window.URL.createObjectURL(file)
  } else if (window.webkitURL != undefined) {
    url = window.webkitURL.createObjectURL(file)
  }
  return url;
}

$("#new_author").on("ajax:success", function(e, data, status, xhr) {
  console.log(data) 
  if( status == "success" ){
    authorId = data.id
    $(".author-new-progress").addClass("half");
    setTimeout(function(){
      $(".author-new-progress li").eq(1).addClass("active");
      $("#authorProgress").carousel(1);
    }, 300)
    var form = document.getElementById("author_avatar")
    form.action = "/admin/authors/" + authorId + "/update_avatar"
  }
});
$("#new_author").on("ajax:error", function(e ,xhr, status, error){
  console.log(xhr)
  console.log(error)
  console.log(status)
});

var form = document.getElementById("author_avatar")
form.action = "/admin/authors/" + authorId + "/update_avatar"
$("#author_avatar").on("ajax:success", function(){
  console.log("success")
});
$("#author_avatar").on("ajax:error", function(e, xhr, status, error){
  console.log(error)
  console.log(status)
});
/*
$("#submit_author_avatar").click(function() {
  event.preventDefault();
  var type = ""
  console.log(currentImg)
  $.ajax({
    url: window.location.origin + "/admin/authors/" + authorId + "/update_avatar/",
    data: "avatar=" + currentImg + "&avatar_type=" + imgType,
    type: "POST",
    success: function(data) {
      console.log(data) 
      $(".author-new-progress").removeClass("half").addClass("done");
      setTimeout(function(){
        $(".author-new-progress li").eq(2).addClass("active");
        $("#authorProgress").carousel(2);
      }, 300)
      var form = document.getElementById("init_author_info")
      form.action = "/admin/authors/" + authorId
    },
    error: function(respond) {
      console.log(respond)
    }
  })
});
*/
