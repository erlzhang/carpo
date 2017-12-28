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

$(".delete-book").on("ajax:success", function(e, data) {
  if( data.respond ) {
    $(this).parents(".book-col").remove();
    if($(".add-book-col").hasClass("d-none") && data.can_add) {
      $(".add-book-col").removeClass("d-none");
    }
    showAlert("success");
  }else {
    showAlert("warning", data.message)
  }
});
$(".delete-book").on("ajax:error", function(e, xhr, status, error){
    showAlert("danger")
});
