class UserSerializer
  include JSONAPI::Serializer
  attributes :id, :email, :first_name, :last_name, :date_of_birth
end
