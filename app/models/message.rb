class Message < ApplicationRecord
  validates :category, presence: true
  validates :title, presence: true
  validates :content, presence: true
  validates :recipient, presence: true
  validates :sender, presence: true
  validates :reply_to, presence: true
end
