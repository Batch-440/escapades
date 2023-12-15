require 'rails_helper'

RSpec.describe 'User Login', type: :request do
  let(:user) { create(:user) }

  it 'logs in an existing user and returns a bearer token' do
    post '/login', params: { user: { email: user.email, password: user.password } }

    expect(response).to have_http_status(:ok)
    expect(JSON.parse(response.body)["status"]["message"]).to eq('Logged in successfully.')
    expect(response.headers['authorization']).to start_with('Bearer ')
  end

  it 'returns an error for invalid login credentials' do
    post '/login', params: { user: { email: 'invalid@example.com', password: 'invalid_password' } }

    expect(response).to have_http_status(:unauthorized)
    expect(response.body).to eq("Invalid Email or password.")
  end
end
