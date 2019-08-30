$(function(){
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this); 
    var url = $(this).attr('action');
    $.ajax({  
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
       var html = buildHTML(data);
       $('.chat-body__message').append(html);
       $('#message_content').val();
    })
    .fail(function(data){
      alert("エラーが発生したため送信できなかったよ！！");
    })
  })
})