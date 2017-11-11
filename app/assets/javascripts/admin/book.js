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
        success: function(){
          console.log("success")
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

/*双击修改卷名*/
var volumeList = $(".volume")
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
/*双击修改卷描述*/
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
/*tab切换卷*/
volumeList.eq(0).addClass("active");
volumeList.on("click", function() {
  volumeList.removeClass("active");
  $(event.target).parent("li").addClass("active")
});
/*创建文章拖动感应区*/
var postList = document.getElementsByClassName("chapter")
$(postList).each(function(){
  var post_id = this.id.slice(5);
  this.ondragstart = function(event) { 
    console.log("drag start")
    event.dataTransfer.setData('text/plain', event.target.id)
    event.dataTransfer.dropEffect = "copy"
  }
  var drag = document.createElement("li");
})
var postDragList = $(".post-drag")
postDragList.each(function(){
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
    /*Ajax文章排序，成功后进行后续操作*/
    var data = event.dataTransfer.getData("text");  
    $(event.target).removeClass("on")
    $("#" + data).insertBefore(event.target);
    $("#drag-" + data).insertBefore($("#" + data));
  }
});
