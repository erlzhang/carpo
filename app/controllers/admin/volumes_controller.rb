class Admin::VolumesController < ApplicationController
  before_action :logged_in_author
  before_action :set_book
  before_action :set_volume, :only => [:show, :update, :destroy, :update_name, :update_description]
  def show
    respond_to do |format|
      format.html
      format.js
    end
  end

  def create
    @volume = Volume.new(volume_params) 
    @volume.book = @book

    #设置排序
    current_index = @book.current_volume_index + 1
    @volume.volume_index = current_index


    if @volume.save
      @book.update_attribute(:current_volume_index, current_index)

      #如果是用户创建的第一个卷，将默认卷下面的文章放到该卷下面
      if current_index == 1
        posts = @book.posts
        @volume.posts << posts
      end 

      redirect_to admin_book_path(@book)
    else
      render :new
    end
  end

  def update_name
    @volume.update_attribute(:title, params[:title])
  end

  def update_description
    @volume.update_attribute(:description, params[:description])
  end

  def destroy
    if @volume.posts.size > 0
      flash[:danger] = "操作失败，请先移除该卷下全部章节！"
    else
      @volume.delete
      flash[:warning] = "成功删除卷！"  
    end
    redirect_to admin_book_path(@book)
  end

  private

    def set_book
      @book = Book.find(params[:book_id])
    end

    def set_volume
      @volume = Volume.find(params[:id])
      if @volume.book != @book
        redirect_to admin_book_path(@book)
      end
    end
    
    def volume_params
      params.require(:volume).permit(:title, :description)
    end
end
