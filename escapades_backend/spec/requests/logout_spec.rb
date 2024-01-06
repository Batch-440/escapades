require 'rails_helper'
require 'devise/jwt/test_helpers'

RSpec.describe 'User Logout', type: :request do
  let(:user) { create(:user) }

  it 'logs out an authenticated user' do
    auth_token = Devise::JWT::TestHelpers.auth_headers({}, user)['Authorization']
    delete '/logout', headers: { 'Authorization' => auth_token }

    expect(response).to have_http_status(:ok)
    expect(JSON.parse(response.body)["message"]).to eq('Logged out successfully.')
  end

  it 'returns an error for an unauthorized logout attempt' do
    delete '/logout'

    expect(response).to have_http_status(:unauthorized)
    expect(JSON.parse(response.body)["message"]).to eq("Couldn't find an active session.")
  end
end
