Rails.application.routes.draw do

  get 'demo/admin'
  get 'demo/editor'
  get 'demo/books'
  get 'demo/book'

  get 'login' => 'sessions#new'
  post 'login' => 'sessions#create'
  delete 'logout' => 'sessions#destroy'

  namespace :admin do
    resources :books do
      get :sort_posts, :on => :member
      get :sort_volumes, :on => :member
      resources :volumes do
        get :update_name, :on => :member
        get :update_description, :on => :member
      end
      resources :posts do
        get :release, :on => :member
      end
    end
    resources :authors
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
