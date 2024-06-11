class Users::SessionsController < Devise::SessionsController
    respond_to :json
  
    private
  
    def respond_with(resource, _opts = {})
      if resource.is_a?(User) && resource.valid?
        render json: {
          token: current_token,
          user: resource
        }
      else
        render json: { error: 'Invalid email or password' }, status: :unauthorized
      end
    end

  
    def respond_to_on_destroy
      head :no_content
    end

    private

    def current_token
      request.env['warden-jwt_auth.token']
    end
end
