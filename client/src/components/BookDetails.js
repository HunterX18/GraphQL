import { useQuery } from "react-apollo";
import { getBookQuery } from "../queries/queries";

const BookDetails = ({book}) => {
	const { loading, error, data } = useQuery(getBookQuery, {
		variables: {
			name: book,
		},
	});
	if (loading) return <h3>Loading...</h3>;
	if (error) {
		console.log(error);
		return <h3>Error</h3>;
	}
	console.log(data);
	return <h4>Written By {data.book.author}</h4>;
};

export default BookDetails;
