class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def current_author
    if current_user
      if current_user.author
        if current_user.author.status == 2
          return current_user.author
        else
          redirect_to admin_dashboard_path
        end
      else
        redirect_to admin_dashboard_path
      end
    end
  end

end
