import { graphql } from "react-apollo";
import {
	getAuthorsQuery,
	addBookMutation,
	getBooksQuery,
} from "../queries/queries";
import { useState } from "react";
import { flowRight as compose } from "lodash";

const AddBook = (props) => {
	// console.log(props);
	const [name, setName] = useState("");
	const [genre, setGenre] = useState("");
	const [authorId, setAuthorId] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		props.addBookMutation({
			variables: {
				name,
				genre,
				authorId,
			},
			refetchQueries: [{ query: getBooksQuery }],
		});
		// props.addBookMutation({
		// 	variables: {
		// 		name: name,
		// 		genre: genre,
		// 		authorId: authorId,
		// 	},
		// });
	};

	return (
		<form id="add-book" onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Book Name"
				// value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<input
				type="text"
				placeholder="Genre"
				// value={genre}
				onChange={(e) => setGenre(e.target.value)}
			/>
			<input
				type="text"
				placeholder="AuthorId"
				// value={author}
				onChange={(e) => setAuthorId(e.target.value)}
			/>
			<input type="submit" value="Add" />
		</form>
	);
};

export default compose(
	graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
	graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
