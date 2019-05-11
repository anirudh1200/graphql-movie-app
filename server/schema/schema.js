const graphql = require('graphql');

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLID,
	GraphQLList
} = graphql;

// dummy data
let movies = [
	{ name: 'Avengers', genre: ' Action | Adventure | Sci-Fi', id: '1', year: '2012', directorId: ['1'] },
	{ name: 'Titanic', genre: 'Drama | Romance', id: '2', year: '1997', directorId: ['2'] },
	{ name: 'Thor: Ragnarok', genre: 'Action | Adventure | Comedy | Fantasy | Sci-Fi', id: '3', year: '2017', directorId: ['3'] },
	{ name: 'Avatar', genre: 'Fantasy | Sci-Fi', id: '4', year: '2009', directorId: ['2'] },
	{ name: 'Green Lantern', genre: 'Action | Adventure | Sci-Fi', id: '5', year: '2011', directorId: ['3'] },
];

let directors = [
	{ name: 'Joss Whedon', id: '1' },
	{ name: 'James Cameron', id: '2' },
	{ name: 'Taika Waititi', id: '3' },
];

const MovieType = new GraphQLObjectType({
	name: 'Movie',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
		year: { type: GraphQLString },
		directors: {
			type: new GraphQLList(DirectorType),
			resolve(parent, args) {
				const directorArray =  directors.filter(director => (parent.directorId.includes(director.id)));
				return directorArray;
			}
		}
	})
});

const DirectorType = new GraphQLObjectType({
	name: 'Director',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		movies: {
			type: new GraphQLList(MovieType),
			resolve(parent, args) {
				const movieArray = movies.filter(movie => movie.directorId.includes(parent.id));
				return movieArray;
			}
		}
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
		},
		director: {
			type: DirectorType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return directors.find(director => director.id === args.id);
			}
		},
		movies: {
			type: new GraphQLList(MovieType),
			resolve(parent, args){
				return movies;
			}
		},
		directors: {
			type: new GraphQLList(DirectorType),
			resilve(parent, args){
				return directors;
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});