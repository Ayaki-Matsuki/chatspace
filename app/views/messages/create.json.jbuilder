json.id @message.id
json.(@message, :content, :image)
json.created_at @message.created_at
json.user_name @message.user.name