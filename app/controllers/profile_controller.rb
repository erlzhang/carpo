class ProfileController < ApplicationController
  layout "application_manage"
  before_action :authenticate_user!
  before_action :set_author, only: [:edit, :update, :update_avatar]

  def new
    if current_user.author
      return redirect_to manage_dashboard_path
    end
    @author = Author.new
  end

  def create
    if current_user.author
      return redirect_to manage_dashboard_path
    end
    @author = Author.new(author_params)  
    @author.user = current_user
    #先不要审核功能
    @author.status = 2
    data = Hash.new
    if @author.save
      data[:id] = @author.id
      render json: data
    else
      render json: @author.errors, STATus: :unprocessable_entity
    end
  end


  def edit
  end

  def update
    if @author.update(author_params)
      redirect_to manage_dashboard_path
    else
      render :edit
    end
  end

  def update_avatar
    if @author.update(author_params)
    else
      render json: @author.errors, status: :unprocessable_entity
    end
  end

  private
    def set_author
      @author = current_user.author
      if @author.blank?
        if params[:id]
          @author = Author.find(params[:id])
        else
          redirect_to manage_dashboard_path
        end
      end
    end

    def author_params
      params.require(:author).permit(:name, :introduction, :birthday, :url, :file_avatar, :file_avatar_cache, :remove_file_avatar, :avatar_id)
    end
end
