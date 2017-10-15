class Book < ApplicationRecord
  validates :title, presence: true, length: { maximum: 30 }
  validates :description, length: { maximum: 300 }
  

  has_many :posts
  has_many :volumes
end
