class Manage::BooksController < ApplicationController
  layout 'application_manage'
  before_action :authenticate_user!
  before_action :current_author
  before_action :set_book, :only => [:show, :update, :destroy, :sort_posts, :sort_volumes]

  include ApplicationHelper
  
  def index
    @books = current_author.books.order("created_at desc")
    @book = Book.new
  end

  def show
    @volumes = []
    @volumes = @book.volumes.where("volume_index > ?", 0).order("volume_index") 
    @new_volume = Volume.new

    #初始应该显示哪个卷
    if params[:volume]
      @volume = Volume.find(params[:volume])
    end
    @volume = @volume || @volumes.first

    if @volumes.empty?
      @posts = @book.posts.order("post_index")
    else
      @posts = @volume.posts.order("post_index")
    end
  end

  def create
    @book = Book.new(book_params)
    @book.author = current_author
    volume = Volume.new(:title => "无")
    volume.book = @book
    if @book.save
      volume.save
      render json: @book
    else
      render json: @book.errors, status: :unprocessable_entity
    end
  end

  def update
    @data = Hash.new
    if @book.update(book_params)
      @data["title"] = @book.title
      @data["description"] = @book.description
      @data["message"] = "书籍信息更新成功"
      render json: @data
    else
      render json: @book.errors, status: :unprocessable_entity
    end
  end

  def destroy
    if @book.posts.size > 0
      flash[:danger] = "操作失败！已有文章的书籍不能删除！"
      redirect_to manage_books_path
    else
      @book.destroy
      redirect_to manage_books_path
    end
  end

  def sort_posts
    @data = Hash.new
    @data["respond"] = true

    #验证参数是否存在
    unless params[:from] or params[:to]
      @data["respond"] = false
      @data["message"] = "内部错误或是无效操作！"
      return render json: @data
    end

    from = Post.find(params[:from])
    to = Post.find(params[:to])
    
    #验证参数是否有效
    unless from or to
      @data["respond"] = false
      @data["message"] = "内部错误或是无效操作！"
      return render json: @data
    end

    from_index = from.post_index
    to_index = to.post_index

    begin
      Post.transaction do
        if from_index > to_index
          #章节前移，中间章节需向后移动
          medium = @book.posts.where("post_index >= ? and post_index < ?", to_index, from_index);
          medium.each do |post|
            index = post.post_index
            post.update_attributes!(:post_index => index + 1)
          end
          from.update_attributes!(:post_index => to_index)
        else
          #章节后移，中介章节需向前移动
          medium = @book.posts.where("post_index <= ? and post_index > ?", to_index, from_index);
          medium.each do |post|
            index = post.post_index
            post.update_attributes!(:post_index => index - 1)
          end
        end
        from.update_attributes!(:post_index => to_index)
      end
    rescue
      @data["respond"] = false
      @data["message"] = "网络通讯原因导致操作失败，请刷新页面后重试！"
    end
    render json: @data
  end

  def sort_volumes
    @data = Hash.new
    @data["respond"] = true
    @data["message"] = "操作成功！"

    #验证参数是否存在
    unless params[:from] or params[:to]
      @data["respond"] = false
      @data["message"] = "内部错误或是无效操作！"
      return render json: @data
    end

    from = Volume.find(params[:from])
    to = Volume.find(params[:to])
    
    #验证参数是否有效
    unless from or to
      @data["respond"] = false
      @data["message"] = "内部错误或是无效操作！"
      return render json: @data
    end

    from_index = from.volume_index
    to_index = to.volume_index

    begin
      Volume.transaction do
        if from_index > to_index
          #章节前移，中间章节需向后移动
          medium = @book.volumes.where("volume_index >= ? and volume_index < ?", to_index, from_index);
          medium.each do |volume|
            index = volume.volume_index
            volume.update_attributes!(:volume_index => index + 1)
          end
          from.update_attributes!(:volume_index => to_index)
        else
          #章节后移，中介章节需向前移动
          medium = @book.volumes.where("volume_index <= ? and volume_index > ?", to_index, from_index);
          medium.each do |volume|
            index = volume.volume_index
            volume.update_attributes!(:volume_index => index - 1)
          end
        end
        from.update_attributes!(:volume_index => to_index)
      end
    rescue
      @data["respond"] = false
      @data["message"] = "网络通讯原因导致操作失败，请刷新页面后重试！"
    end
    render json: @data
  end

  private

    def set_book
      @book = Book.find(params[:id])
      if @book.author != current_author
        redirect_to manage_books_path
      end
    end

    def book_params
      params.require(:book).permit(:title, :description, :status, :openess)
    end

end
