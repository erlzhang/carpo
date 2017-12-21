class Admin::PostsController < ApplicationController
  layout 'application_editor'
  before_action :authenticate_user!
  before_action :current_author
  before_action :set_book
  before_action :set_post, :only => [:show, :edit, :destroy, :update, :release, :withdraw]

  def show
  end

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
      @book.update_attribute(:current_post_index, current_index)
      redirect_to admin_book_path(@book, :volume => @post.volume)
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @post.update(post_params)
      redirect_to admin_book_path(@book, :volume => @post.volume)
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
    redirect_to admin_book_path(@book, :volume => @post.volume)
  end

  def withdraw
    @post.update_attribute(:status, 0)
    redirect_to admin_book_path(@book, :volume => @post.volume)
  end

  private
    
    def set_book
      @book = Book.find(params[:book_id])
      if @book.author != current_author
        redirect_to admin_books_path
      end
    end

    def set_post
      @post = Post.find(params[:id])
      if @post.book != @book
        redirect_to admin_book_path(@book)
      end
    end

    def post_params
      params.require(:post).permit(:title, :content, :volume_id, :status)
    end
end
