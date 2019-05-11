const express = require('express'),
	graphqlHTTP = require('express-graphql'),
	schema = require('./schema/schema'),
	app = express();

app.use('/graphql', graphqlHTTP({
	schema,
	graphiql: true,
}));

const port = 4000;
app.listen(port, () => {
	console.log(`Now listening for requests on port ${port}`);
});