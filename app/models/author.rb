class Author < ActiveRecord::Base
  belongs_to :user
  has_many :books

  mount_uploader :file_avatar, AvatarUploader

  validates :name, presence: true

  def can_create_book?
    self.books.size < 8
  end
end
