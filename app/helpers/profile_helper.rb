module ProfileHelper
  def get_avatar(author)
    img = ""
    if !author.file_avatar.blank?
      image_tag author.file_avatar.url(:thumb), :class => "img-fluid rounded-circle" 
    else
      image_tag "avatar/" + author.avatar_id.to_s + ".png", :class => "img-fluid rounded-circle"
    end
  end
end
