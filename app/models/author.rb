class Author < ApplicationRecord
  attr_accessor :remember_token

  has_many :books

  validates :name, presence: true, length: { maximum: 50 } 
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i 
  validates :email, presence: true, length: { maximum: 255 }, format: { with: VALID_EMAIL_REGEX } 
  has_secure_password
  validates :password, length: { minimum: 6 }, allow_blank: true

  def Author.digest(string)
    cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST : BCrypt::Engine.cost 
    BCrypt::Password.create(string, cost: cost)
  end

  # 返回一个随机令牌
  def Author.new_token
    SecureRandom.urlsafe_base64
  end

  def remember
    self.remember_token = Author.new_token
    update_attribute(:remember_digest, Author.digest(remember_token)) 
  end

  def forget
    update_attribute(:remember_digest, nil)
  end

  def authenticated?(remember_token)
    return false if remember_digest.nil?
    BCrypt::Password.new(remember_digest).is_password?(remember_token) 
  end
end
