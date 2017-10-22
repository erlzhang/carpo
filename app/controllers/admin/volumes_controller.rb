class Admin::VolumesController < ApplicationController
  before_action :set_book
  before_action :set_volume, :only => [:edit, :update, :destroy]

  def new
    @volume = Volume.new
  end

  def create
    @volume = Volume.new(volume_params) 
    @volume.book = @book

    #设置排序
    current_index = @book.current_volume_index + 1
    @volume.index = current_index

    if @volume.save
      @book.update_attribute(:current_volume_index, current_index)
      redirect_to admin_book_path(@book)
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @volume.update(volume_params)
      flash[:success] = "分卷信息修改成功！"
      redirect_to admin_book_path(@book)
    else
      render :edit
    end
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
    end
    
    def volume_params
      params.require(:volume).permit(:title, :description)
    end
end
