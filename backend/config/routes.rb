Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: 'users/sessions'
  }
  resource :user, only: [:show]
  resources :todos

  match '/ws', to: proc { [404, {}, ['Not Found']] }, via: :all
end
