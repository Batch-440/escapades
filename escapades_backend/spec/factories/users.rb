require 'faker'

FactoryBot.define do
  before(:create) do
   email = Faker::Internet.password
  end

  factory :user do
    email { Faker::Internet.email }
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    password { email }
    password_confirmation { email }
  end
end
