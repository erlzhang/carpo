class Manage::PostsController < ApplicationController
  layout 'editor'
  before_action :authenticate_user!
  before_action :current_author
  before_action :set_book
  before_action :set_post, :only => [:show, :edit, :destroy, :update, :release, :withdraw]

  def new
    @post = Post.new
    if params[:volume_id]
      @post.volume_id = params[:volume_id]
    end
  end

  def create
    @post = Post.new(post_params)
    @post.book = @book
    unless @post.volume
      @post.volume = @book.volumes.first
    end

    #设置排序
    current_index = @book.current_post_index + 1
    @post.post_index = current_index

    if @post.save
      render json: {:message => "保存成功", :url => edit_manage_book_post_path(@book, @post), :method => "created"}
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  def edit
  end

  def update
    if @post.update(post_params)
      render json: {:message => "保存成功", :post => @post}
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end
  
  def destroy
    @post.destroy
  end

  def release
    @post.update_attribute(:status, 1)
  end

  def withdraw
    @post.update_attribute(:status, 0)
  end

  private
    
    def set_book
      @book = Book.find(params[:book_id])
      if @book.author != current_author
        redirect_to manage_books_path
      end
    end

    def set_post
      @post = Post.find(params[:id])
      if @post.book != @book
        redirect_to manage_book_path(@book)
      end
    end

    def post_params
      params.require(:post).permit(:title, :content, :volume_id, :status)
    end
end
