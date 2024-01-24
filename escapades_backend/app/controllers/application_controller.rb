class ApplicationController < ActionController::API
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters

    devise_parameter_sanitizer.permit(:sign_up, keys: %i[first_name last_name email password password_confirmation date_of_birth country_code avatar])
    devise_parameter_sanitizer.permit(:sign_in, keys: %i[email password])
  end
end
