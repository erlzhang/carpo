class Admin::AuthorsController < ApplicationController
	before_action :logged_in_author
	before_action :set_author, :only => [:show, :edit, :update]

  def index
  	@authors = Author.all
  end

  def show
  end

  def new
  	@author = Author.new
  end

  def create
  	@author = Author.new(author_params)
  end

  def edit
  end

  def update
  end

  private

  	def set_author
  		@author = Author.find(params[:id])
  	end

  	def author_params
  		params.require(:author).permit(:name, :email, :description, :password, :password_confirmation)
    end
end
