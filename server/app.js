const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors());

mongoose
	.connect(
		"mongodb+srv://me:me@cluster0.jskqd.mongodb.net/test?retryWrites=true&w=majority",
		{ useNewUrlParser: true },
		{ useUnifiedTopology: true }
	)
	.then((result) => console.log("connected to database"))
	.catch((err) => console.log(err));

app.use(
	"/graphql",
	graphqlHTTP({
		schema,
		graphiql: true,
	})
);

app.listen(5000, () => {
	console.log("listening to port 5000");
});
