import { useMutation } from "react-apollo";
import { useState } from "react";
import { addBookMutation, getBooksQuery } from "../queries/queries";

const AddBook = () => {
	const [book, setBook] = useState("");
	const [author, setAuthor] = useState("");
	const [genre, setGenre] = useState("");
	const [addBook] = useMutation(addBookMutation, {
		refetchQueries: [{ query: getBooksQuery }],
	});

	return (
		<>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					e.target.book.value = "";
					e.target.author.value = "";
					e.target.genre.value = "";
					addBook({
						variables: {
							name: book,
							author,
							genre,
						},
					});
				}}
			>
				<input
					type="text"
					name="book"
					placeholder="Book Name"
					onChange={(e) => setBook(e.target.value)}
				/>
				<input
					type="text"
					name="author"
					placeholder="Author"
					onChange={(e) => setAuthor(e.target.value)}
				/>
				<input
					type="text"
					name="genre"
					placeholder="genre"
					onChange={(e) => setGenre(e.target.value)}
				/>

				<input type="Submit" defaultValue="Add" />
			</form>
		</>
	);
};

export default AddBook;
