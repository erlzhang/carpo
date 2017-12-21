//= require sort

/**增添卷**/
var addVolume = document.getElementById("addVolume");
addVolume.onclick = function() {
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
    if(newVolumeTitle == "" || newVolumeTitle == "\n") {
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
            var current = $(".nav-item.new")
            var title = current.text();
            var link = '<a data-remote="true" id="volume-' + data.id + '" class="nav-link" href="' + data.url + '">' + title + '</a>'
            $(current).html(link)
            $(current).removeClass("active nav-link new")

            //创建删除链接
            var delete_link = '<a class="delete-volume" data-remote="true" data-method="delete" href="' + data.url + '"><i class="fa fa-times"></i></a>'
            $(current).append(delete_link)

            //重载拖动列表
            sortable('.sortable-head', 'reload');

            /*绑定必要功能*/
            initVolumeAction();

            /*提示信息*/
            showAlert("success", data.message);
          }else {
            //分卷创建失败，删除已经添加的节点 
            showAlert("warning", data.message);
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

initVolumeAction();

updateVolumeDescription();

//ajax删除卷
$(".delete-volume").each(function(){
  $(this).on("ajax:success", function(e, data){
    if( data.respond ){
      showAlert("success", data.message)
      $(this).parents("li.nav-item").remove();
    }else {
      showAlert("warning", data.message);
    }
  });
  $(this).on("ajax:error", function(event){
    //提示错误信息
    showAlert("danger", "网络原因导致操作失败！请刷新页面后重试！");
  });
});

//ajax 修改书籍信息
$(".toggle-side-form").click(function() {
  $(".book-side-form").toggleClass("on");
});
$(".collapse-side-form").click(function() {
  $(".book-side-form").removeClass("on")
});

$('.edit_book[data-remote="true"]').on("ajax:success", function(e, data, status) {
  if( status == "success" ){
    console.log(data)
    $(".book-title").html(data.title);
    $(".book-description").html(data.description);
    $(".book-side-form").removeClass("on");
    showAlert("success", data.message);
  }
});
$('.edit_book[data-remote="true"]').on("ajax:error", function(e, xhr, status, error) {
  console.log(xhr)
  var errors = xhr.responseJSON
  for( var key in errors ){
    console.log(key)
    console.log(errors[key])
    var input = $("#book_" + key)
    input.addClass("is-invalid");
  }
});

//绑定卷初始功能
function initVolumeAction() {
  var volumeList = $(".volume");
  updateVolumeName();
  /*tab切换卷*/
  volumeList.on("click", function() {
    volumeList.removeClass("active");
    $(event.target).addClass("active")
    update_name();
  });
}

/*双击修改卷名*/
function updateVolumeName(){
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
      if( newText == "" ){
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
function updateVolumeDescription() {
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
