module Admin::PostsHelper
  def get_volumes
    collection = []
    @book.volumes.each do |volume|
      collection.push([volume.title, volume.id]) 
    end
    return collection
  end
end
