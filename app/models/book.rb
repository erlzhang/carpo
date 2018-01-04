class Book < ApplicationRecord
  validates :title, presence: true
  validates :category, presence: true

  has_many :posts, dependent: :destroy
  has_many :volumes, dependent: :destroy
  belongs_to :author

  mount_uploader :file_cover, CoverUploader
end
