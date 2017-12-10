Rails.application.routes.draw do

  root :to =>  'home#index'

  devise_for :users
  get 'admin/dashboard'

  namespace :admin do
    resources :authors
    resources :books do
      get :sort_posts, :on => :member
      get :sort_volumes, :on => :member
      resources :volumes do
        get :update_name, :on => :member
        get :update_description, :on => :member
      end
      resources :posts do
        get :release, :on => :member
        get :withdraw, :on => :member
      end
    end
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
