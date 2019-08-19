class MessagesController < ApplicationController
  before_action :set_group

  def index
  end

  private 

  def group_params
    params.require(:group).permit(:name, { :user_ids => [] })
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end
