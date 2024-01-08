class UserSerializer
  include JSONAPI::Serializer
  attributes :id, :email, :first_name, :last_name, :date_of_birth, :country_code
  attributes :avatar_url do |user|
    Cloudinary::Utils.cloudinary_url(user.avatar.key, cloud_name: ENV['CLOUD_NAME'])
  end
end
