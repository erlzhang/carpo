class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  include SessionsHelper

  def logged_in_author
  	current_author
  	unless logged_in?
  		redirect_to login_path
  	end
  end
end
