const express = require('express'),
	graphqlHTTP = require('express-graphql'),
	mongoose = require('mongoose'),
	schema = require('./schema/schema'),
	app = express();

// Connecting to mongoDb database
const db = 'mongodb://localhost/movie-graphql';
mongoose.connect(db, { useNewUrlParser: true });
mongoose.connection.once('open', () => {
	console.log('connected to database');
});

app.use('/graphql', graphqlHTTP({
	schema,
	graphiql: true,
}));

const port = 4000;
app.listen(port, () => {
	console.log(`Now listening for requests on port ${port}`);
});