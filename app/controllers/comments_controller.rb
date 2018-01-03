class CommentsController < ApplicationController

  def create
    @book = Book.find(params[:id])
    @comment = Comment.new(comment_params)
    @comment.book = @book
    @comment.save
  end

  private
    def comment_params
      params.require(:comment).permit(:name, :email, :content);
    end
end
