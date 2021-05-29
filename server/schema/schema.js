const graphql = require("graphql");
const Book = require("../models/books");
const Author = require("../models/author");

const { GraphQLObjectType, GraphQLSchema } = graphql;

const BookType = new GraphQLObjectType({
	name: "Book",
	fields: () => ({
		name: { type: graphql.GraphQLString },
		genre: { type: graphql.GraphQLString },
		author: { type: graphql.GraphQLString },
		authorInfo: {
			type: AuthorType,
			resolve(parent, args) {
				return Author.findOne({ name: parent.author });
			},
		},
	}),
});

const AuthorType = new GraphQLObjectType({
	name: "Author",
	fields: () => ({
		name: { type: graphql.GraphQLString },
		age: { type: graphql.GraphQLInt },
		books: {
			type: BookType,
			resolve(parent, args) {
				return Book.findOne({ author: parent.name });
			},
		},
	}),
});

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		book: {
			type: BookType,
			args: { name: { type: graphql.GraphQLString } },
			resolve(parent, args) {
				return Book.findOne({ name: args.name });
			},
		},
		author: {
			type: AuthorType,
			args: { name: { type: graphql.GraphQLString } },
			resolve(parent, args) {
				return Author.findOne({ name: args.name });
			},
		},
		authors: {
			type: graphql.GraphQLList(AuthorType),
			resolve() {
				return Author.find();
			},
		},
		books: {
			type: graphql.GraphQLList(BookType),
			resolve() {
				return Book.find();
			},
		},
	},
});

const Mutation = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		addBook: {
			type: BookType,
			args: {
				name: { type: graphql.GraphQLString },
				genre: { type: graphql.GraphQLString },
				author: { type: graphql.GraphQLString },
			},
			resolve(parent, args) {
				const book = new Book({
					name: args.name,
					genre: args.genre,
					author: args.author,
				});
				return book.save();
			},
		},
		addAuthor: {
			type: AuthorType,
			args: {
				name: { type: graphql.GraphQLString },
				age: { type: graphql.GraphQLInt },
			},
			resolve(parent, args) {
				const author = new Author({ name: args.name, age: args.age });
				return author.save();
			},
		},
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation,
});
