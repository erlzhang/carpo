class AdminController < ApplicationController
  layout 'application_admin'
  before_action :authenticate_user!

  def dashboard
    if current_user.author
      @author = current_user.author
      if @author.status == 2
        #dashboard没有内容，填完信息直接转调到书籍管理页面
        redirect_to admin_books_path
      else
        redirect_to root_path
      end
    else
      redirect_to new_admin_author_path
    end
  end
end
