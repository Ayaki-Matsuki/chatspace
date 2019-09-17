$(function() {
  function searchUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    return html
  }

  function noUser(message){
    var html = `<div class="chat-group-user clearfix">
                  <p class="group-user__name">
                  ${message}
                  </p>
                </div>`
    return html
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    
    $.ajax({
      url: '/users',
      type: "GET",
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users){
      $('#user-search-result').empty();
      if (users.length !==0)
        users.forEach(function(user){
          searchUser(user);
          var html = searchUser(user);
          $('#user-search-result').append(html)
        })
        else {
          var html = noUser("一致するメンバーがいません");
          $('#user-search-result').append(html)
        }
    })
    .fail(function(){
      alert("検索に失敗したよ！！")
    })
  })


  function appendUser(user_id, user_name){
    var html = `<div class='chat-group-user'>
                  <input name='group[user_ids][]' type='hidden' value="${user_id}">
                  <p class='chat-group-user__name'>${user_name}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    return html
  }
  $('#user-search-result').on("click", ".user-search-add", function(){
    var user_id = $(this).attr("data-user-id");
    var user_name = $(this).attr("data-user-name");
    var html = appendUser(user_id, user_name);
    $('#chat-group-users').append(html)
    $(this).parent().remove();
  })

  $("#chat-group-users").on("click", ".user-search-remove", function(){
    $(this).parent().remove();
  })
})