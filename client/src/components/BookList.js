import { useState } from "react";
import BookDetails from "./BookDetails";
import { useQuery } from "react-apollo";
import { getBooksQuery } from "../queries/queries";

const BookList = () => {
	const [selected, setSelected] = useState(null);
	const { loading, error, data } = useQuery(getBooksQuery);
	if (loading) return <h2>Loading...</h2>;
	if (error) return <h2>Error</h2>;
	return (
		<>
			<h1>BOOKS</h1>
			<ol>
				{data.books.map((book) => {
					return (
						<li key={book.name}>
							<h3
								onClick={(e) => {
									setSelected(e.target.innerText);
								}}
							>
								{book.name}
							</h3>
						</li>
					);
				})}
			</ol>
			{selected == null ? (
				<h3>No book selected</h3>
			) : (
				<BookDetails book={selected} />
			)}
		</>
	);
};

export default BookList;
