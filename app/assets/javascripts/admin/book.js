/**增添卷**/
var addVolume = document.getElementById("addVolume");
addVolume.onclick = function() {
  var newVolume = document.createElement("li")
  newVolume.className = "volume new"
  newVolume.contentEditable = true
  $(newVolume).insertBefore(addVolume)
  range = document.createRange();
  newVolume.focus()
  /*需要确保卷名不能被换行；按回车键失去焦点；*/
  document.onkeydown = function() {
    if(event && event.keyCode == 13) {
      newVolume.blur();
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
            console.log($(".volume.new"))
            var current = $(".volume.new")
            var title = current.text();
            current.attr({
              "id": "volume-" + data.id,
              "draggable": "true"
            });
            var link = '<a data-remote="true" href="' + data.url + '">' + title + '</a>'
            $(current).html(link)

            //创建删除链接
            var delete_link = '<a class="delete_volume" data-remote="true" data-method="delete" href="' + data.url + '"><i class="fa fa-times"></i></a>'
            $(current).append(delete_link)
            
            //创建拖动感应区
            var drag = '<div class="volume-drag" id="drag-volume-' + data.id + '"></div>';
            $(drag).insertBefore($(".volume.new"));
            $(".volume.new").removeClass("new");

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

function init_volume_action() {
  var volumeList = $(".volume")

  /*双击修改卷名*/
  volumeList.on("dblclick", function(){
    event.preventDefault();
    originalText = this.innerText;
    this.contentEditable = true
    this.focus()
    document.onkeydown = function() {
      if(event && event.keyCode == 13) {
        volumeList.blur();
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
          }

        });
      }
      this.contentEditable = false
    }
  })
  /*tab切换卷*/
  volumeList.eq(0).addClass("active");
  volumeList.on("click", function() {
    volumeList.removeClass("active");
    $(event.target).parent("li").addClass("active")
  });
  /*卷排序*/
  drag_sort("volume", volumeList);
}

/*文章拖动排序*/
var postList = document.getElementsByClassName("chapter")
update_description();
drag_sort("post", postList);

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

/*Ajax拖动排序，通用*/
function drag_sort(type, list){
  var len = type.length
  $(list).each(function(){
    var id = this.id.slice(len + 1);
    this.ondragstart = function(event) { 
      console.log("drag start")
      event.dataTransfer.setData('text/plain', event.target.id)
      event.dataTransfer.dropEffect = "copy"
    }
  })
  var dragList = $("." + type +  "-drag")
  dragList.each(function(){
    this.ondragover = function(){
      event.preventDefault();
      event.dataTransfer.dropEffect = "copy";
    }
    this.ondragenter = function(){
      event.preventDefault();
      $(event.target).addClass("on")
      event.dataTransfer.dropEffect = "copy";
    }
    this.ondragleave = function(){
      event.preventDefault();
      $(event.target).removeClass("on")
      event.dataTransfer.dropEffect = "copy";
      }
    this.ondrop = function(){
      event.preventDefault();
      /*Ajax排序，成功后进行后续操作*/
      var data = event.dataTransfer.getData("text");  
      var url = window.location.href + "/sort_" + type +  "s"
      var fromId = data.slice(len + 1);
      var toId = this.id.slice(len + 6);
      $(this).removeClass("on")
      if( Math.abs(fromId - toId) > 1 ){
        console.log("Ajax Start")
        $.ajax({
          type: "get",
          url: url,
          data: {
            from: fromId,
            to:   toId
          },
          success: function(data) {
            console.log("success")
            if( data.respond ) {
              $("#" + type +  "-" + data.from).insertBefore($("#drag-" + type + "-" + data.to));
              $("#drag-" + type +  "-" + data.from).insertBefore($("#" + type + "-" + data.from));
            }else {
              //操作异常提醒
              console.log(data.message)
            }
          },
          error: function() {
            //通讯异常提醒
            console.log("error")
          }
        });
      }
    }
  });
}
