$(function(){
  
  function  buildHTML(message){
    var html = `<div class="chat-body__header">
                  <div class="chat-body__name">
                    ${message.user_name}
                  </div>
                  <div class="chat-body__time">
                    ${message.data}
                  </div>
                </div>
                <div class="chat-body__message">
                  <div class="chat-body__message__content">
                    ${message.content}
                  </div>
                  ${message.image}
                </div>`
    return html
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
    })
    .fail(function(data){
      alert("エラーが発生したため送信できなかったよ！！");
    })
  })
})