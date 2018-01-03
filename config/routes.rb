Rails.application.routes.draw do

  root :to =>  'home#index'

  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }
  get 'manage/dashboard'
  get 'manage/demo'

  namespace :manage do
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

  resources :books, only: [:show] do
    get :query_post, :on => :member
  end

  resources :messages, only: [:new, :show, :create, :destroy] do
    get :inbox, :on => :collection
    get :outbox, :on => :collection
  end

  #profile => author
  get 'complete_your_information', :to =>"profile#new" 
  get 'edit_profile', :to => "profile#edit"
  patch 'profile/update'
  patch 'profile/update_avatar'
  get 'profile/update'
  get 'profile/update_avatar'
  post 'profile/create'

end
