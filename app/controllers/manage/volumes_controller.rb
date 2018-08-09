class Manage::VolumesController < ApplicationController
  layout 'manage'
  before_action :authenticate_user!
  before_action :current_author
  before_action :set_book
  before_action :set_volume, :only => [:show, :update, :destroy, :update_name, :update_description]
  def show
    @posts = @volume.posts.order("post_index")
    respond_to do |format|
      format.html
      format.js
    end
  end

  def create
    @volume = Volume.new(volume_params) 
    @volume.book = @book

    #Ajax返回数据
    @data = Hash.new
    @data["respond"] = true

    if @book.volumes.size > 5
      @data["respond"] = false
      @data["message"] = "分卷创建失败！当前书籍分卷数量已达上限！"
      return render json: @data
    end

    #设置排序
    current_index = @book.current_volume_index + 1
    @volume.volume_index = current_index

    begin
      Volume.transaction do
        @volume.save!
        @book.update_attributes!(:current_volume_index => current_index)

        #如果是用户创建的第一个卷，将默认卷下面的文章放到该卷下面
        if current_index == 1
          posts = @book.posts
          @volume.posts << posts
        end 
        @data["message"] = "成功创建卷!"
        @data["id"] = @volume.id
        @data["url"] = manage_book_volume_path(@book, @volume)
        @data["update_name_url"] = update_name_manage_book_volume_path(@book, @volume)
        @data["title"] = @volume.title
        if @book.volumes.size > 5
          @data["max"] = true
        end
      end
    rescue
      @data["respond"] = false
      @data["message"] = "系统错误，请刷新后重试！"
    end
    render json: @data
  end

  def update_name
    @volume.update_attribute(:title, params[:title])
  end

  def update_description
    @volume.update_attribute(:description, params[:description])
  end

  def destroy
    @data = Hash.new
    if @volume.posts.size > 0
      @data["respond"] = false
      @data["message"] = "操作失败，请先移除该卷下全部章节！"
    else
      @volume.delete
      if @book.volumes.size > 5
        @data["max"] = true
      end
      @data["respond"] = true
      @data["message"] = "成功删除卷！"
    end
    render json: @data
  end

  private

    def set_book
      @book = Book.find(params[:book_id])
    end

    def set_volume
      @volume = Volume.find(params[:id])
      if @volume.book != @book
        redirect_to manage_book_path(@book)
      end
    end
    
    def volume_params
      params.require(:volume).permit(:title, :description)
    end
end
