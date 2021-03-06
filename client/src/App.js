import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import AddBook from "./components/AddBook";
import BookList from "./components/BookList";

const client = new ApolloClient({
	uri: "http://localhost:5000/graphql",
});

function App() {
	return (
		<ApolloProvider client={client}>
			<div className="main">
				<BookList />
				<AddBook />
			</div>
		</ApolloProvider>
	);
}

export default App;
