class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :jwt_authenticatable, jwt_revocation_strategy: self
  validates :password_confirmation, presence: true, on: :create
  validates :country_code, inclusion: { in: ISO3166::Country.all.map(&:alpha2) }, :allow_nil => true

  has_one_attached :avatar
end
