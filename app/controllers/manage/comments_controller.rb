class Manage::CommentsController < ApplicationController
  layout 'manage'

  before_action :authenticate_user!
  before_action :current_author

  def index
    @comments = current_author.comments
    @comment = Comment.new
  end

  def create
   @comment = Message.new(comment_params) 
   @comment.name = current_author.name
   @comment.email = current_author.user.email 
   @comment.save
  end

  private
    def comment_params 
      params.require(:comment).permit(:content, :reply_to, :book_id)
    end
end
