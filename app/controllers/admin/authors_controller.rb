class Admin::AuthorsController < ApplicationController
  layout "application_admin"
  before_action :authenticate_user!
  before_action :set_author, only: [:edit, :update]

  def new
    @author = Author.new
  end

  def create
    @author = Author.new(author_params)  
    @author.user = current_user
    #先不要审核功能
    @author.status = 2
    if @author.save
      flash[:success] = "个人信息创建成功"
      redirect_to admin_dashboard_path
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @author.update(author_params)
      redirect_to admin_dashboard_path
    else
      render :edit
    end
  end

  private
    def set_author
      @author = Author.find(params[:id])
      if @author.user != current_user
        redirect_to admin_dashboard_path
      end
    end
    def author_params
      params.require(:author).permit(:name, :introduction, :birthday, :url, :file_avatar, :file_avatar_cache, :remove_file_avatar)
    end
end
