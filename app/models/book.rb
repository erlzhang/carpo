class Book < ApplicationRecord
  has_many :posts
  has_many :volumes
end
