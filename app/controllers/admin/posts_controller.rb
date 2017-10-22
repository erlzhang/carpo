class Admin::PostsController < ApplicationController
  before_action :set_book
  before_action :set_post, :only => [:edit, :destroy, :update, :release]

  def new
    @post = Post.new
    if params[:volume_id]
      @post.volume_id = params[:volume_id]
    end
  end

  def create
    @post = Post.new(post_params)
    @post.book = @book

    #设置排序
    current_index = @book.current_post_index + 1
    @post.index = current_index

    if @post.save
      @book.update_attribute(:current_post_index, current_index)
      redirect_to admin_book_path(@book)
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @post.update(post_params)
      redirect_to admin_book_path(@book)
    else
      render :edit
    end
  end
  
  def destroy
    @post.destroy
    redirect_to admin_book_path(@book)
  end

  def release
    @post.update_attribute(:status, 1)
    redirect_to admin_book_path(@book)
  end

  private
    
    def set_book
      @book = Book.find(params[:book_id])
    end

    def set_post
      @post = Post.find(params[:id])
    end

    def post_params
      params.require(:post).permit(:title, :content, :volume_id)
    end
end
