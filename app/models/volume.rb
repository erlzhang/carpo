class Volume < ApplicationRecord
  belongs_to :book
  has_many :posts
end
