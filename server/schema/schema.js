const graphql = require('graphql');

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLID,
} = graphql;

// dummy data
let movies = [
	{ name: 'Avengers', genre: ' Action | Adventure | Sci-Fi', id: '1', year: '2012' },
	{ name: 'Titanic', genre: 'Drama | Romance', id: '2', year: '1997' },
	{ name: 'Thor: Ragnarok', genre: 'Action | Adventure | Comedy | Fantasy | Sci-Fi', id: '3', year: '2017' },
];

const MovieType = new GraphQLObjectType({
	name: 'Movie',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
		year: { type: GraphQLString }
	})
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		movie: {
			type: MovieType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				// code to get data from db, other source
				return movies.find(movie => movie.id === args.id);
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});