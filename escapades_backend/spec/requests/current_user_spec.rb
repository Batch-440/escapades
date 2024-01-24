require 'rails_helper'
require 'devise/jwt/test_helpers'

RSpec.describe 'Current User', type: :request do
  let(:user) { create(:user) }

  it 'current_user returns correct user' do
    auth_token = Devise::JWT::TestHelpers.auth_headers({}, user)['Authorization']
    get "/current_user", headers: { 'Authorization' => auth_token }
    serialized_user = UserSerializer.new(user).serializable_hash[:data][:attributes]
    expect(JSON.parse(serialized_user.to_json)).to include(JSON.parse(response.body))
  end
end
