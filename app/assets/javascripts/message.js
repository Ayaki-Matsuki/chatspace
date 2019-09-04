$(function(){
  
  function  buildHTML(message){
    image = (message.image) ? `<img class= "lower-message__image" src=${message.image} >`: "";
    var html =  ` <div class="chat-body__box" data-message-id="${message.id}">
                    <div class="chat-body__box__header">
                      <div class="chat-body__box__header__name">
                        ${message.user_name}
                      </div>
                      <div class="chat-body__box__header__time">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="chat-body__box__message">
                      <div class="chat-body__box__message__content">
                        ${message.content}
                      </div>
                      ${image}
                    </div>
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
      $('.chat-body').append(html);
      $('#new_message')[0].reset();
      ScrollToNewMessage();
      $('.chat-footer__send').prop('disabled', false);
    })
    .fail(function(data){
      alert("エラーが発生したため送信できなかったよ！！");
    })
  })

  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      last_message_id = $('.chat-body__box:last').data("message-id");
      $.ajax({
        url: 'api/messages',
        type: 'GET',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML = '';
        messages.forEach(function (message){
          insertHTML = buildHTML(message);
          $('.chat-body').append(insertHTML);
        })
        $('.chat-body').animate({scrollTop: $('.chat-body')[0].scrollHeight}, 'fast');
      })
      .fail(function() {
        alert("自動更新に失敗しました");
      });
    }
  };
  setInterval(reloadMessages, 5000);
});