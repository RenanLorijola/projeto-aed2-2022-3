# frozen_string_literal: true

class MoviesController < ApplicationController
	rescue_from(::Movie::FileNotFoundError) { head :not_found }
	
	def show
		title = params[:title]

		movie = Movie.find(title)

		if movie
			render json: movie
		else
			head :not_found
		end
	end
end
