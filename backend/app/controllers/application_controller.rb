class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception, prepend: true, if: proc { |c| c.request.format != 'application/json' }
  protect_from_forgery with: :null_session, prepend: true, if: proc { |c| c.request.format == 'application/json' }
  include Pundit::Authorization
  
    rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized
  
    private
  
    def user_not_authorized
      render json: { error: "You are not authorized to perform this action" }, status: :forbidden
    end
end
  