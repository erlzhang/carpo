console.log("template: paper")

var postContainer = document.getElementById("postContainer");
var bookId = postContainer.getAttribute("data-book");

$(".post-link").on("click", function(event) {
  event.preventDefault
  var postId = $(this).data("post");
  query_post(postId);
});

function query_post(id) {
  $.ajax({
    url: window.location.origin + "/books/" + bookId + "/query_post",
    type: "GET",
    data: {
      "post_id": id
    },
    success: function(data) {
      console.log(data)
      showPost(data.post)
    },
    error: function(){
  
    }
  });
}

function showPost(post) {
  var content = '<div class="post">'
  content += '<h1 class="post-title">' + post.title + '</h1>'
  content += '<div class="post-content">' + post.content + '</div>'
  content += '</div>'
  postContainer.innerHTML = content;
}
