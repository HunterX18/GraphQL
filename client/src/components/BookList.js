import { graphql } from "react-apollo";
import { getBooksQuery } from "../queries/queries";
import BookDetails from "./BookDetails";
import { useState } from "react";

const BookList = (props) => {
	const [selected, setSelected] = useState(null);
	const data = props.data;
	if (data.loading) return <>Loading...</>;
	else {
		return (
			<>
				{data.books.map((book) => {
					return (
						<li key={book.id} onClick={(e) => setSelected(book.id)}>
							{book.name}
						</li>
					);
				})}
				<BookDetails bookid={selected} />
			</>
		);
	}
};

export default graphql(getBooksQuery)(BookList);
