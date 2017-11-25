class Admin::BooksController < ApplicationController
  before_action :logged_in_author
  before_action :set_book, :only => [:show, :edit, :update, :destroy, :sort_posts, :sort_volumes]
  
  def index
    @books = @current_author.books
  end

  def show
    @volumes = []
    @volumes = @book.volumes.where("volume_index > ?", 0).order("volume_index") 
    @volume = Volume.new
    if @volumes.empty?
      @posts = @book.posts.order("post_index")
    else
      @posts = @volumes.first.posts.order("post_index")
    end
  end

  def new
    @book = Book.new
  end
  
  def create
    @book = Book.new(book_params)
    @book.author = @current_author
    volume = Volume.new(:title => "无")
    volume.book = @book
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

  def sort_posts
    #全部json数据用一个hash包裹
    @data = Hash.new
    #初始结果设定为true，只有发生情况会抛出false
    @data["respond"] = true
    @data["from"] = params[:from]
    @data["to"] = params[:to]

    #验证参数是否z存在
    unless params[:from] or params[:to]
      flash[:danger] = "非法操作!"
      redirect_to admin_book_path(@book)
    end

    from = Post.find(params[:from])
    to = Post.find(params[:to])
    
    #验证参数是否有效
    unless from or to
      @data["respond"] = false
      @data["message"] = "内部错误或是无效操作！"
      return
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
      @data["message"] = "系统原因导致操作失败，请刷新页面后重新操作！"
    end
  end

  def sort_volumes
    #全部json数据用一个hash包裹
    @data = Hash.new
    #初始结果设定为true，只有发生情况会抛出false
    @data["respond"] = true
    @data["from"] = params[:from]
    @data["to"] = params[:to]

    #验证参数是否z存在
    unless params[:from] or params[:to]
      flash[:danger] = "非法操作!"
      redirect_to admin_book_path(@book)
    end

    from = Volume.find(params[:from])
    to = Volume.find(params[:to])
    
    #验证参数是否有效
    unless from or to
      @data["respond"] = false
      @data["message"] = "内部错误或是无效操作！"
      return
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
      @data["message"] = "系统原因导致操作失败，请刷新页面后重新操作！"
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
