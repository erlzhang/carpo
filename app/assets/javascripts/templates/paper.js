function Paper() {
  var self = this;

  self.postContainer = document.getElementById("postContainer");
  self.bookId = postContainer.getAttribute("data-book");
  self.linkList = $(".post-link")

  console.log(self.linkList)

  self.current = Number($(".post-link.active").data("index"));

  self.linkList.on("click", function() {
    event.preventDefault();
    var queryId = $(this).data("post"),
        queryType = $(this).data("type");
    self.queryPost( queryId, queryType );
    $(".nav-link.post-link.active").removeClass("active");
    self.current = $(this).data("index");
  });

  $(".navigation-next").on("click", function() {
    self.next()
  });
  $(".navigation-prev").on("click", function() {
    self.prev()
  });
}

Paper.prototype = {
  queryPost: function(queryId, queryType) {
    var self = this,
        queryType = queryType || "post"

    $.ajax({
      url: window.location.origin + "/books/" + self.bookId + "/query_post",
      type: "GET",
      data: {
        "post_id": queryId,
        "type": queryType
      },
      success: function(data) {
        self.showPost(data)
      },
      error: function(){
      }
    });
  },
  showPost: function(post) {
    var self = this, content = '<div class="post">'
    content += '<h1 class="post-title">' + post.title + '</h1>'
    content += '<div class="post-content">' + post.content + '</div>'
    content += '</div>'
    self.postContainer.innerHTML = content;
    self.linkList.eq(self.current).addClass("active");
  },
  next: function() {
    var self = this;
    if( self.current == self.linkList.length - 1 ) {
      return;
    }
    self.linkList.eq(self.current).removeClass("active");
    self.current ++;
    var query = self.linkList.eq(self.current),
        queryId = query.data("post"),
        queryType = query.data("type");

    self.queryPost(queryId, queryType);
  },
  prev: function() {
    var self = this;
    if( self.current == 0 ) {
      return;
    }
    self.linkList.eq(self.current).removeClass("active");
    self.current --;
    var query = self.linkList.eq(self.current),
        queryId = query.data("post"),
        queryType = query.data("type");

    self.queryPost(queryId, queryType);
  }
}

var paper = new Paper();
