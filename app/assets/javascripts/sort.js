//= require html.sortable

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
  var url = window.location.href + "/sort_posts"
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
        console.log("success")
        //$("#" + type +  "-" + data.from).insertBefore($("#drag-" + type + "-" + data.to));
        //$("#drag-" + type +  "-" + data.from).insertBefore($("#" + type + "-" + data.from));
      }else {
        //应当阻止操作，但是插件没有该接口欸......
        //实在不行就强制页面刷新
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

sortable('.sortable-list', {
  handle: ".post-handle",
  items: ":not(.sort-disabled)"
});
sortable('.sortable-list')[0].addEventListener('sortupdate', function(e){
  ajaxSort(e) 
})

sortable('.sortable-head');
sortable('.sortable-head')[0].addEventListener('sortupdate', function(e) {
  //与章节排序基本一致，应当写成函数
  //不同之处在于id绑在了a标签上
  //添加卷不应当参加排序
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
  var url = window.location.href + "/sort_volumes"
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
        console.log("success")
        //$("#" + type +  "-" + data.from).insertBefore($("#drag-" + type + "-" + data.to));
        //$("#drag-" + type +  "-" + data.from).insertBefore($("#" + type + "-" + data.from));
      }else {
        //应当阻止操作，但是插件没有该借口欸......
        //实在不行就强制页面刷新
        //操作异常提醒
        console.log(data.message)
      }
    },
    error: function() {
      //通讯异常提醒
      console.log("error")
    }
  });
});
