# frozen_string_literal: true

class MovieBtree
	MOVIE_FILE_BY_CHAR = {
		'a' => 'as',
		'b' => 'bhm',
		'c' => 'cdl',
		'd' => 'cdl',
		'e' => '123456789xqzyuvkojneg',
		'f' => 'fiprw',
		'g' => '123456789xqzyuvkojneg',
		'h' => 'bhm',
		'i' => 'fiprw',
		'j' => '123456789xqzyuvkojneg',
		'k' => '123456789xqzyuvkojneg',
		'l' => 'cdl',
		'm' => 'bhm',
		'n' => '123456789xqzyuvkojneg',
		'o' => '123456789xqzyuvkojneg',
		'p' => 'fiprw',
		'q' => '123456789xqzyuvkojneg',
		'r' => 'fiprw',
		's' => 'as',
		't' => 't',
		'u' => '123456789xqzyuvkojneg',
		'v' => '123456789xqzyuvkojneg',
		'w' => 'fiprw',
		'x' => '123456789xqzyuvkojneg',
		'y' => '123456789xqzyuvkojneg',
		'z' => '123456789xqzyuvkojneg',
		'1' => '123456789xqzyuvkojneg',
		'2' => '123456789xqzyuvkojneg',
		'3' => '123456789xqzyuvkojneg',
		'4' => '123456789xqzyuvkojneg',
		'5' => '123456789xqzyuvkojneg',
		'6' => '123456789xqzyuvkojneg',
		'7' => '123456789xqzyuvkojneg',
		'8' => '123456789xqzyuvkojneg',
		'9' => '123456789xqzyuvkojneg'
	}.freeze

	def find_movie_file(title)
		char = title.first.downcase
		btree.value_of(char)
	end

	private

	def btree
		@btree ||= begin
			tree = Btree::Tree.new

			MOVIE_FILE_BY_CHAR.each { |k, v| tree.insert(k, v) }

			tree
		end
	end
end
