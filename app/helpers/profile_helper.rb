module ProfileHelper
  def get_avatar(author, size="", cl="")
    img = ""
    if author.file_avatar.blank?
      url = "avatar/" + author.avatar_id.to_s + ".png"
    else
      url = author.file_avatar.url(:thumb)
    end
    return image_tag url, :class => "img-fluid rounded-circle " + cl, :width => size, :height => size
  end
end
