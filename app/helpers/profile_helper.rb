module ProfileHelper
  def get_avatar(author, size="", cl="")
    img = ""
    if !author.file_avatar.blank?
      url = author.file_avatar.url(:thumb)
    else
      url = "avatar/" + author.avatar_id.to_s + ".png"
    end
    return image_tag url, :class => "img-fluid rounded-circle " + cl, :width => size, :height => size
  end
end
