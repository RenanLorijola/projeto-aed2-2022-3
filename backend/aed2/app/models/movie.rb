# frozen_string_literal: true

class Movie
	FileNotFoundError = Class.new(StandardError)

	REVIEWS_FILE_PATH = './data/reviews.csv'

	REVIEW_LIMIT_PER_MOVIE = 5
	LIMIT_OF_SUGGESTED_MOVIES = 5

	attr_reader :title, :movie

	def initialize(title)
		@title = title.downcase
	end

	def self.find(title)
		new(title).find
	end

	def find
		movie_row = movies_csv_file.find { |row| row['movie_title'].downcase == title }

		return unless movie_row

		build_movie(movie_row)

		movie.merge!(
			reviews: reviews(movie[:rotten_tomatoes_link]),
			suggested_movies: suggested_movies
		)
	end

	private

	def build_movie(row)
		@movie = {
			rotten_tomatoes_link: row['rotten_tomatoes_link'],
			movie_title: row['movie_title'],
			movie_info: row['movie_info'],
			critics_consensus: row['critics_consensus'],
			genres: Array(row['genres'].to_s.split(', ')),
			directors: Array(row['directors'].to_s.split(', ')),
			authors: Array(row['authors'].to_s.split(', ')),
			actors: Array(row['actors'].to_s.split(', ')),
			original_release_date: row['original_release_date'],
			runtime: row['runtime']
		}
	end

	def reviews(link)
		reviews = []

		File.open(REVIEWS_FILE_PATH) do |file|
			CSV.parse(file, headers: true) do |row|
				if row['rotten_tomatoes_link'] == link && reviews.count < REVIEW_LIMIT_PER_MOVIE
					reviews << {
						critic_name: row['critic_name'],
						score: row['review_score'],
						date: row['review_date'],
						content: row['review_content']
					}

					break if reviews.count == REVIEW_LIMIT_PER_MOVIE
				end
			end
		end

		reviews
	end

	def suggested_movies
		@suggested_movies ||= begin
			genre = movie[:genres].first

			movie_rows = movies_csv_file.select do |row|
				Array(row['genres'].to_s.split(', ')).include?(genre)
			end.sample(LIMIT_OF_SUGGESTED_MOVIES)

			movie_rows.map do |row|
				{
					rotten_tomatoes_link: row['rotten_tomatoes_link'],
					movie_title: row['movie_title']		
				}
			end
		end
	end

	def file_path
		@file_path ||= begin
			btree = MovieBtree.new
			file = btree.find_movie_file(title)

			raise FileNotFoundError unless file

			"./data/#{file}.csv"
		end
	end

	def movies_csv_file
		@movies_csv_file ||= CSV.read(file_path, headers: true)
	end
end
