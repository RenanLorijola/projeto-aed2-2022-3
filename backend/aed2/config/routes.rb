Rails.application.routes.draw do
	scope :v1, defaults: { format: :json } do
		resource :movies, only: %i[show]
	end
end
