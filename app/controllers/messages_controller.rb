class MessagesController < ApplicationController
  layout 'manage'

  before_action :authenticate_user!
  before_action :current_author
  before_action :set_message, :only => [:show, :destroy]

  def inbox
    @message = Message.where(:recipient => current_author.id).order("created_at desc");
  end

  def outbox
    @message = Message.where(:sender => current_author.id).order("created_at desc");
  end

  def show
  end

  def new
    @message = Message.new
  end

  def create
    @message = Message.new(message_params)
    @message.sender = current_author.id
    @message.save
  end

  def destroy
    @message.destroy
  end

  private
    def set_message
      @message = Message.find(params[:id])
      if @message.recipient != current_author.id and @message.sender != current_author.id
        redirect_to messages_path();
      end
    end

    def message_params
      params.require(:message).permit(:title, :content, :recipient, :reply_to, :type)
    end
end
