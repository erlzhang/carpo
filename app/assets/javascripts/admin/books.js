$("#newBookModal").modal({
  show: false 
});

$("#new_book").on("ajax:success", function(e, data){
  $("#newBookModal").modal("hide"); 
  window.location.href = window.location.href + '/' + data.id
});

$("#new_book").on("ajax:error", function(e, xhr, status, error){
  var errors = xhr.responseJSON
  invalidInput(errors, "book")
});

