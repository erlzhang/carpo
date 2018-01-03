class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def current_author
    if current_user
      if current_user.author
        if current_user.author.status == 2
          return current_user.author
        else
          redirect_to manage_dashboard_path
        end
      else
        redirect_to manage_dashboard_path
      end
    end
  end

  def after_sign_in_path_for(resource)
    manage_dashboard_path
  end

  def sort(model, index_type, from, to)
    begin
      model.constantize.transaction do
        if from_index > to_index
          #前移，中间向后移动
          medium = @book.posts.where("post_index >= ? and post_index < ?", to_index, from_index);
          medium.each do |post|
            index = post.post_index
            post.update_attributes!(:post_index => index + 1)
          end
          from.update_attributes!(:post_index => to_index)
        else
          #后移，中间向前移动
          medium = @book.posts.where("post_index <= ? and post_index > ?", to_index, from_index);
          medium.each do |post|
            index = post.post_index
            post.update_attributes!(:post_index => index - 1)
          end
        end
        from.update_attributes!(:post_index => to_index)
      end
    rescue
      @data["respond"] = false
      @data["message"] = "网络通讯原因导致操作失败，请刷新页面后重试！"
    end
  end

end
