require 'rails_helper'

RSpec.describe 'User Signup', type: :request do
  let(:valid_params) do
    {
      user: {
        email: 'test@example.com',
        first_name: 'John',
        last_name: 'Doe',
        password: '123456789'
      }
    }
  end

  it 'creates a new user account and returns a bearer token' do
    post '/signup', params: valid_params

    expect(response).to have_http_status(:ok)
    expect(JSON.parse(response.body)["status"]["message"]).to eq('Signed up successfully.')
    expect(response.headers['authorization']).to start_with('Bearer ')
    expect(User.count).to eq(1)
  end

  it 'returns an error for invalid signup data' do
    invalid_params = valid_params.merge(user: { invalid_param: 'invalid_param' })

    post '/signup', params: invalid_params

    expect(response).to have_http_status(:unprocessable_entity)
    expect(JSON.parse(response.body)["status"]["message"]).to include("User couldn't be created successfully.")
  end
end
