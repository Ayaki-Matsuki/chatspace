$(function(){
  
  function  buildHTML(message){
    var content = message.content ? `${ message.content }` : "";
    image = message.image ? `<img class='lower-message__image' src=${message.image} >`: "";
    var html = `<div class='chat-body>
                  <div class="chat-body__header">
                    <div class="chat-body__name">
                      ${message.user_name}
                    </div>
                    <div class="chat-body__time">
                      ${message.data}
                    </div>
                  </div>
                  <div class="chat-body__message">
                    <div class="chat-body__message__content">
                      ${content}
                    </div>
                  </div>
                    ${image}
                </div>`
    return html
  }
  function ScrollToNewMessage(){
    $('.chat-body').animate({scrollTop: $('.chat-body')[0].scrollHeight}, 'fast');
  }
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
      ScrollToNewMessage();
      
    })
    .fail(function(data){
      alert("エラーが発生したため送信できなかったよ！！");
    })
  })
})