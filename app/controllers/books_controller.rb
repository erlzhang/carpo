class BooksController < ApplicationController
  def show
    @book = Book.find(params[:id])
    @init_post = @book.posts.first
    if @book.volumes.size > 1
    end
  end

  def query_post
    @data = Hash.new
    @data[:respond] = true
    @data[:post] = Post.find(params[:post_id])
    render json: @data
  end
end
