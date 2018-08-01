class ManageController < ApplicationController
  layout 'manage'
  before_action :authenticate_user!

  def dashboard
    if current_user.author
      @author = current_user.author
      if @author.status == 2
        @count = Hash.new 
        books = @author.books
        @count[:book] = books.size
        @count[:post] = Post.where(:book_id => books).count
        @count[:word] = Post.where(:book_id => books).sum("length(content)")
        @count[:day] = ( Date.today - @author.created_at.to_date).to_i
      else
        redirect_to root_path
      end
    else
      redirect_to complete_your_information_path
    end
  end
end
