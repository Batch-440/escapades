require 'rails_helper'
require 'devise/jwt/test_helpers'

RSpec.describe 'Current User', type: :request do
  let(:user) { create(:user) }

  it 'current_user returns correct user' do
    auth_token = Devise::JWT::TestHelpers.auth_headers({}, user)['Authorization']
    get "/current_user", headers: { 'Authorization' => auth_token }
    expected_response = JSON.parse(response.body)
    expected_response.delete("avatar_url")
    expect(user).to have_attributes(expected_response)
  end
end
