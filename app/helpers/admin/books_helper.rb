module Admin::BooksHelper
  def last_updated(book)
    post = book.posts.order("updated_at desc").first
    if post
      return post.updated_at.strftime("%Y-%m-%d")
    else
      return book.updated_at.strftime("%Y-%m-%d")
    end
  end
end
