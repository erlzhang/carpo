class BooksController < ApplicationController
  def show
    @book = Book.find(params[:id])

    if ( @book.openess == 0 ) and ( current_author != @book.author )
      redirect_to root_path
    end

    @volumes = @book.volumes.where("volume_index > ?", 0).order("volume_index")
  end

  def query_post
    @data = Hash.new
    @data[:respond] = true
    puts params[:type]
    case params[:type]
      when "chapter"
        chapter = Post.find(params[:post_id])
        @data[:title] = chapter.title
        @data[:content] = chapter.content
        @data[:id] = chapter.id
      when "volume"
        volume = Volume.find(params[:post_id])
        @data[:title] = volume.title
        @data[:content] = volume.description
        @data[:id] = volume.id
      when "book"
        book = Book.find(params[:post_id])
        @data[:title] = book.title
        @data[:content] = book.content
        @data[:id] = book.id
    end
    render json: @data
  end
end
