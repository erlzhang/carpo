class FollowsController < ApplicationController
  before_action :authenticate_user!
  before_action :current_author

  def create
    @follow = Follow.new
    @follow.from = current_author
    @follow.to = params[:author_id]
    @follow.save
  end

  def destroy
    @follow = Follow.find(params[:id])
    @follow.destroy
  end
end
