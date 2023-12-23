require 'rails_helper'
require 'devise/jwt/test_helpers'

RSpec.describe 'User Login', type: :request do
  let(:user) { create(:user) }

  it 'logs in an existing user and returns a bearer token' do
    auth_token = Devise::JWT::TestHelpers.auth_headers({}, user)['Authorization']
    get "/current_user", headers: { 'Authorization' => auth_token }
    expect(user).to have_attributes(JSON.parse(response.body))
  end

end
