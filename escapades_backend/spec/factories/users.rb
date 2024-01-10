require 'faker'

FactoryBot.define do
  factory :user do
    before(:create) do |user|
      password = Faker::Internet.password
      user.password = password
      user.password_confirmation = password
    end

    email { Faker::Internet.email }
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
  end
end
