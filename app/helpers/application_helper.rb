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

  def author_post_count(author)
    count = 0
    author.books.each do |book|
      count += book.posts.count
    end
    return count
  end
end
