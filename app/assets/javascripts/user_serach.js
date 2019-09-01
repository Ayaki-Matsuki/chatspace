$(function() {
  function searchUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name${user.name}>追加</div>
                </div>`
    return html
  }
  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    
  })
})