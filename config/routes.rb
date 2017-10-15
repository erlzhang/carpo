Rails.application.routes.draw do
  namespace :admin do
    resources :books
  end


  get 'books/index'

  get 'books/show'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
