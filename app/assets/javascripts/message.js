$(function(){
  $('.new_message').on('submit', function(e){
    e.preventDefault();
    var message = new FormData(this); 
    console.log(message);
  })

})