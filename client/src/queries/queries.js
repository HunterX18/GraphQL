import { gql } from "apollo-boost";

const getBooksQuery = gql`
	{
		books {
			name
		}
	}
`;

const getBookQuery = gql`
	query ($name: String!) {
		book(name: $name) {
			name
			author
		}
	}
`;

const getAuthorsQuery = gql`
	{
		authors {
			name
			age
		}
	}
`;

const addBookMutation = gql`
	mutation ($name: String!, $genre: String!, $author: String!) {
		addBook(name: $name, genre: $genre, author: $author) {
			name
			author
		}
	}
`;

const addAuthorMutation = gql`
	mutation ($name: String!, $age: Int!) {
		addAuthor(name: $name, age: $age) {
			name
			age
		}
	}
`;

export {
	getBooksQuery,
	getBookQuery,
	getAuthorsQuery,
	addAuthorMutation,
	addBookMutation,
};
