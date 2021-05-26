import { graphql } from "react-apollo";
import { getBookQuery } from "../queries/queries";

const BookDetails = (props) => {
	// console.log(props);
	const { book } = props.data;
	if (book)
		return (
			<>
				<h2>{book.name}</h2>
				<h3>{book.genre}</h3>
			</>
		);
	else return <h2>No book selected</h2>;
};

export default graphql(getBookQuery, {
	options: (props) => {
		return {
			variables: {
				id: props.bookid,
			},
		};
	},
})(BookDetails);
