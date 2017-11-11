class Admin::BooksController < ApplicationController
  before_action :logged_in_author
  before_action :set_book, :only => [:show, :edit, :update, :destroy]
  
  def index
    @books = @current_author.books
  end

  def show
    @volumes = []
    @volumes = @book.volumes.where("volume_index > ?", 0) 
    @volume = Volume.new
  end

  def new
    @book = Book.new
  end
  
  def create
    @book = Book.new(book_params)
    @book.author = @current_author
    volume = Volume.new(:title => "无")
    volume.book = @book
    aaa
    if @book.save
      volume.save
      #设置默认卷
      flash[:success] = "书籍创建成功"
      redirect_to admin_book_path(@book)
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @book.update(book_params)
      redirect_to admin_books_path
    else
      render :edit
    end
  end

  def destroy
    if @book.posts.size > 0
      flash[:danger] = "操作失败！已有文章的书籍不能删除！"
      redirect_to admin_books_path
    else
      @book.destroy
      redirect_to admin_books_path
    end
  end

  private

    def set_book
      @book = Book.find(params[:id])
      if @book.author != current_author
        redirect_to admin_books_path
      end
    end

    def book_params
      params.require(:book).permit(:title, :description, :status, :openess)
    end

end
