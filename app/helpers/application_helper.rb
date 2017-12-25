module ApplicationHelper
  def namespace_controller_name
    params[:controller].split("/").join(" ")
  end

  def input_class(model, attr)
    content = "form-control"
    if is_invalid?(model, attr)
      content += " is-invalid "
    end
    return content
  end

  def invalid_message(model, attr)
    content = '<small class="form-text text-danger">'
    model.errors.full_messages_for(attr).each do |msg|
      content += msg
    end
    content += "</small>"
    return content.html_safe
  end

  def is_invalid?(model, attr)
    model.errors.include?(attr)
  end

  def author_count(author)
    count = Hash.new
    books = author.books
    count[:book] = books.size
    count[:post] = Post.where(:book_id => books).count
    return count
  end
end
