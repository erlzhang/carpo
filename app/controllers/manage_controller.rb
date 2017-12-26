class ManageController < ApplicationController
  layout 'application_manage'
  before_action :authenticate_user!

  def dashboard
    if current_user.author
      @author = current_user.author
      if @author.status == 2
        #dashboard没有内容，填完信息直接转调到书籍管理页面
        redirect_to manage_books_path
      else
        redirect_to root_path
      end
    else
      #redirect_to new_manage_author_path
      redirect_to complete_your_information_path
    end
  end
end
