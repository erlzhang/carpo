class Book < ApplicationRecord
  validates :title, presence: true

  has_many :posts, dependent: :destroy
  has_many :volumes, dependent: :destroy
  belongs_to :author
end
