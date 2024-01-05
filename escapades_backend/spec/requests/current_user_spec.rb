require 'rails_helper'
require 'devise/jwt/test_helpers'

RSpec.describe 'Current User', type: :request do
  let(:user) { create(:user) }

  it 'current_user returns correct user' do
    auth_token = Devise::JWT::TestHelpers.auth_headers({}, user)['Authorization']
    get "/current_user", headers: { 'Authorization' => auth_token }
    expect(user).to have_attributes(JSON.parse(response.body).reject {|k| k == "avatar_url"})
  end
end
