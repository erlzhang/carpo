class Admin::BooksController < ApplicationController
  before_action :set_book, :only => [:show, :edit, :update, :destroy]
  def index
    @books = Book.all
  end

  def show
  end

  def new
    @book = Book.new
  end
  
  def create
    @book = Book.new(book_params)

    #设置默认卷
    volume = Volume.create(:title => "无", :book_id => @book)

    if @book.save
      flash[:success] = "书籍创建成功"
      redirect_to admin_books_path
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
    end

    def book_params
      params.require(:book).permit(:title, :description, :status, :openess)
    end

end
