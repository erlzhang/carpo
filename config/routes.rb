Rails.application.routes.draw do

  namespace :admin do
    resources :books do
      resources :volumes
      resources :posts do
        get :release, :on => :member
      end
    end
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
