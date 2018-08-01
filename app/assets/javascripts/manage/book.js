//= require sort

/**增添卷**/
var addVolume = document.getElementById("addVolume");
addVolume.onclick = function() {
  event.preventDefault();
  /*新卷框架*/
  var newVolume = document.createElement("li")
  newVolume.className = "nav-item nav-link active new position-relative"
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
            var link = '<a data-remote="true" id="volume-' + data.id + '" class="nav-link volume text-truncate" href="' + data.url + '">' + title + '</a>'
            $(current).html(link)
            $(current).removeClass("active nav-link new")

            //创建删除链接
            var delete_link = '<a class="delete-volume close-icon" data-remote="true" data-method="delete" href="' + data.url + '"></a>'
            $(current).append(delete_link)

            //重载拖动列表
            sortable('.sortable-head', 'reload');

            /*绑定必要功能*/
            initVolumeAction();

            /*提示信息*/
            showAlert("success", data.message);

            /*判断当前分卷是否已达上限*/
            if( data.max ) {
              $(".nav-item.plus").addClass("d-none");
            }
          }else {
            //分卷创建失败，删除已经添加的节点 
            showAlert("warning", data.message);
          }
        },
        error: function(){
          showAlert("danger");
        }
      });
      /*成功后取消contenteditable*/
      this.contentEditable = false
    }
  }
}

initVolumeAction();

updateVolumeDescription();

initPostActions();

//ajax删除卷
$(".delete-volume").each(function(){
  $(this).on("ajax:success", function(e, data){
    if( data.respond ){
      showAlert("success", data.message)
      $(this).parents("li.nav-item").remove();
      if( !data.max ){
        $(".nav-item.plus").removeClass("d-none");
      }
    }else {
      showAlert("warning", data.message);
    }
  });
  $(this).on("ajax:error", function(event){
    //提示错误信息
    showAlert("danger");
  });
});

//ajax 修改书籍信息
$(".toggle-side-form").click(function(event) {
  event.preventDefault();
  $(".book-side-form").addClass("on");
});
$(".collapse-side-form").click(function(event) {
  event.preventDefault();
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
  var errors = xhr.responseJSON
  invalidInput("book", errors);
});

//卷折行处理
/*
var ifVolumeSlide = 0
var slideStart = 0;
var slideEnd = 0;
volumeSlide();

function volumeSlide() {
  var items = $(".card-header-tabs .nav-item");
  var containerWidth = $(".card-header-tabs").width() - 65;
  console.log(containerWidth)
  var width = 0
  for( var i = 0, len = items.length - 1; i < len; i++ ){
    var w = items.eq(i).width();
    width += w + 16
    if( width > containerWidth ){
      items.eq(i).hide();
      if( slideEnd == 0 ){
        slideEnd = i;
      }
    }
  }
  $(".nav-slide-controls .right").click(function() {
    items.eq(slideEnd).show(); 
    var itemWidth = items.eq(slideEnd).width();
    var startWidth = 0
    for( var i = slideStart; i < slideEnd; i ++ ){
      startWidth += items.eq(i).width();
      if( startWidth <= itemWidth ){
        items.eq(i).hide();
        slideStart = i;
      } 
    }
    
  });
}
*/

function initPostActions() {
  //ajax删除文章
  $(".delete-post").on("ajax:success", function() {
    $(this).parents(".list-group-item").remove();
    showAlert("success");
  });

  //ajax发布文章
  $(".release-post").on("ajax:success", function() {
    $(this).addClass("d-none");
    $(this).siblings(".post-withdraw").removeClass("d-none");
    showAlert("success");
  });
  $(".post-withdraw").on("ajax:complete", function() {
    $(this).addClass("d-none");
    $(this).siblings(".release-post").removeClass("d-none");
    showAlert("success");
  });
}

//绑定卷初始功能
function initVolumeAction() {
  var volumeList = $(".volume");
  updateVolumeName();
  /*tab切换卷*/
  volumeList.on("click", function() {
    volumeList.removeClass("active");
    $(event.target).addClass("active")
    updateVolumeName();
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
        var url = window.location.origin + $(this).data("url-updatename")
        console.log(url)
        $.ajax({
          type: "get",
          url: url,
          data: {
            title: newText 
          },
          success: function(data) {
            showAlert("success");
          },
          error: function() {
            showAlert("danger");
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
        var url = window.location.origin + $(this).data("url-updatedescription"); 
        $.ajax({
          type: "get",
          url: url,
          data: {
            description: newText 
          },
          success: function() {
            showAlert("success");
          },
          error: function() {
            showAlert("danger");
          }
        });
      }
      this.contentEditable = false
    }
  });
}
