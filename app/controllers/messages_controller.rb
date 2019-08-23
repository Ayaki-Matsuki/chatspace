class MessagesController < ApplicationController
  before_action :set_group

  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)
  end

  def create
    @message = @group.messages.new(messages_params)
    if @message.save
      redirect_to group_message_path(@group), notice: "メッセージが送信されたよ！"
    else
      @messages = @group.messages.includes(:user)
      flash.now[:alert] = "メッセージを入力しよう！"
      render :index
    end
  end

  private 

  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end
