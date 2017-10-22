class Post < ApplicationRecord
  belongs_to :book
  belongs_to :volume

  validates :title, presence: true
  validates :content, presence: true
end
