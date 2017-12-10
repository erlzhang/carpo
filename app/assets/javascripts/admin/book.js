/**增添卷**/
var addVolume = document.getElementById("addVolume");
addVolume.onclick = function() {
  event.preventDefault();
  /*新卷框架*/
  var newVolume = document.createElement("li")
  newVolume.className = "nav-item nav-link active new"
  newVolume.contentEditable = true
  $(newVolume).insertBefore($(addVolume).parent(".nav-item"))
  $(newVolume).focus()
  /*需要确保卷名不能被换行；按回车键失去焦点；*/
  document.onkeydown = function() {
    if(event && event.keyCode == 13) {
      $(newVolume).blur()
    }
  }
  newVolume.onblur = function() {
    newVolumeTitle = this.innerText
    if(newVolumeTitle == "") {
      $(this).remove();/*如果卷名为空，则删除*/
    }else{
      var form = document.getElementById("new_volume");
      serialize = $(form).serialize() + newVolumeTitle
      /*Ajax创建卷*/
      $.ajax({
        url: form.action,
        type: "POST",
        data: serialize,
        async: false,
        success: function(data){
          if( data.respond ) {
            //分卷创建成功，添加id，创建拖动感应区
            console.log(data.id)
            console.log($(".nav-item.new"))
            var current = $(".nav-item.new")
            var title = current.text();
            var link = '<a data-remote="true" id="volume-' + data.id + '" class="nav-link" href="' + data.url + '">' + title + '</a>'
            $(current).html(link)
            $(current).removeClass("active nav-link new")

            //创建删除链接
            var delete_link = '<a class="delete-volume" data-remote="true" data-method="delete" href="' + data.url + '"><i class="fa fa-times"></i></a>'
            //$(current).append(delete_link)

            //重载拖动列表
            sortable('.sortable-head', 'reload');

            /*绑定必要功能*/
            init_volume_action()
          }else {
            //分卷创建失败，删除已经添加的节点 
          }
        },
        error: function(){
          console.log("error")
        }
      });
      /*成功后取消contenteditable*/
      this.contentEditable = false
    }
  }
}

init_volume_action()
update_description();

//ajax删除卷
console.log($(".delete-volume"))
$(".delete-volume").each(function(){
  $(this).on("ajax:success", function(event){
    $(this).parents("li.nav-item").remove();
  });
});
$(".delete-volume").each(function(){
  $(this).on("ajax:error", function(event){
    //提示错误信息
  });
});
/*
*/

function init_volume_action() {
  var volumeList = $(".volume")
  /*双击修改卷名(仅限当前分卷)*/
  update_name();
  /*tab切换卷*/
  volumeList.on("click", function() {
    volumeList.removeClass("active");
    $(event.target).addClass("active")
    update_name();
  });
}

/*双击修改卷名*/
function update_name(){
  var currentVolume = $(".volume.active")
  currentVolume.on("dblclick", function(){
    event.preventDefault();
    originalText = this.innerText;
    this.contentEditable = true
    this.focus()
    document.onkeydown = function() {
      if(event && event.keyCode == 13) {
        currentVolume.blur();
      }
    }
    this.onblur = function(){
      newText = this.innerText;
      if( newText == ""  ){
        this.innerText = originalText
      }else if( newText != originalText ){
        /*Ajax修改卷名*/
        console.log("The volume name should be changed!")
        var url = window.location.href + "/volumes/" + this.id.slice(7) + "/update_name"
        $.ajax({
          type: "get",
          url: url,
          data: {
            title: newText 
          },
          success: function() {
            console.log("success")
          },
          error: function() {
            console.log("error")
            $(currentVolume).text(originalText)
          }

        });
      }
      this.contentEditable = false
    }
  })
}

/*双击修改卷描述*/
function update_description() {
  $(".volume-description").on("dblclick",function() {
    event.preventDefault();
    var originalText = ""
    if($(this).hasClass("hint")){
      this.innerText = ""  
    }else{
      originalText = this.innerText;
    }
    this.contentEditable = true
    this.focus()
    this.onblur = function(){
      newText = this.innerText;
      if( newText == ""  ){
        this.innerText = originalText
      }else if( newText != originalText ){
        /*Ajax修改卷名*/
        console.log("The volume name should be changed!")
        var url = window.location.href + "/volumes/" + this.getAttribute("data-volume") + "/update_description"
        $.ajax({
          type: "get",
          url: url,
          data: {
            description: newText 
          },
          success: function() {
            console.log("success")
          },
          error: function() {
            console.log("error")
          }
        });
      }
      this.contentEditable = false
    }
  });
}
