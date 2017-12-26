//= require html.sortable

var bookId = $(".book-container").data("book");

function ajaxSort(e){
  var item = e.detail.item
  var fromId = item.id.slice(5)
  var index = e.detail.elementIndex
  var oldindex = e.detail.oldElementIndex
  if( index > oldindex ){
    //当前上边元素的id 
    var to = $(".sortable-list").find("li").eq(index - 1)
  }else if( index < oldindex ) {
    //当前下边元素的id 
    var to = $(".sortable-list").find("li").eq(index + 1)
  }
  var toId = to[0].id.slice(5)

  //ajax排序
  var url = window.location.origin + "/manage/books/" + bookId + "/sort_posts"
  $.ajax({
    type: "get",
    url: url,
    data: {
      from: fromId,
      to:   toId
    },
    success: function(data) {
      if( data.respond ) {
        showAlert("success", data.message);
      }else {
        showAlert("warning", data.message);
      }
    },
    error: function() {
      showAlert("danger")
    }
  });
}

sortable('.sortable-list', {
  handle: ".post-handle",
  items: ":not(.sort-disabled)"
});
sortable('.sortable-list')[0].addEventListener('sortupdate', function(e){
  ajaxSort(e) 
})

sortable('.sortable-head');
sortable('.sortable-head')[0].addEventListener('sortupdate', function(e) {
  var item = $(e.detail.item).find("a")[0]
  var fromId = item.id.slice(7)
  var index = e.detail.elementIndex
  var oldindex = e.detail.oldElementIndex
  if( index > oldindex ){
    //当前上边元素的id 
    var to = $(".sortable-head").find("li").eq(index - 1).find(".nav-link")
  }else if( index < oldindex ) {
    //当前下边元素的id 
    var to = $(".sortable-head").find("li").eq(index + 1).find(".nav-link")
  }
  var toId = to[0].id.slice(7)

  //ajax排序
  var url = window.location.origin + "/manage/books/" + bookId + "/sort_volumes"
  $.ajax({
    type: "get",
    url: url,
    data: {
      from: fromId,
      to:   toId
    },
    success: function(data) {
      if( data.respond ) {
        showAlert("success", data.message)
      }else {
        showAlert("warning", data.message);
      }
    },
    error: function() {
      //通讯异常提醒
      showAlert("danger");
    }
  });
});
