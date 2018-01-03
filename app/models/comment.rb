class Comment < ApplicationRecord
  belongs_to :book

  validates :name, presence: true
  validates :email, presence: true
  validates :content, presence: true
end
