function Paper() {
  var self = this;

  self.postContainer = document.getElementById("postContainer");
  self.bookId = postContainer.getAttribute("data-book");

  self.current = 0;

  $(".post-link").on("click", function() {
    event.preventDefault();
    self.current = $(this).data("post");
    self.queryPost(self.current);
  });
}

Paper.prototype = {
  queryPost: function(id) {
    $.ajax({
      url: window.location.origin + "/books/" + self.bookId + "/query_post",
      type: "GET",
      data: {
        "post_id": id
      },
      success: function(data) {
        self.showPost(data.post)
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
  }
}

var paper = new Paper();
