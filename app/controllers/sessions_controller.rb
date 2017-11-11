class SessionsController < ApplicationController
  def new
  end

  def create
    author = Author.find_by(email: params[:session][:email].downcase)
    if author && author.authenticate(params[:session][:password]) 
      log_in author
      params[:session][:remember_me] == '1' ? remember(author) : forget(author) 
      flash[:success] = "登陆成功"
      redirect_to admin_books_path
    else
      flash.now[:danger] = "用户名或密码错误"
      render :new
    end
  end

  def destroy
    #log_out if logged_in? 
    log_out
    redirect_to login_path
  end
end
