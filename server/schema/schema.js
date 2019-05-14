const graphql = require('graphql'),
	Movie = require('../models/movie'),
	Director = require('../models/director');

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLID,
	GraphQLList,
	GraphQLNonNull
} = graphql;

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
				// const directorArray =  directors.filter(director => (parent.directorId.includes(director.id)));
				// return directorArray;
				return Director.find({
					'_id': { $in: parent.directorId }
				});
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
				// const movieArray = movies.filter(movie => movie.directorId.includes(parent.id));
				// return movieArray;
				return Movie.find({
					directorId: parent.id
				})
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
				// return movies.find(movie => movie.id === args.id);
				return Movie.findById(args.id);
			}
		},
		director: {
			type: DirectorType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				// return directors.find(director => director.id === args.id);
				return Director.findById(args.id);
			}
		},
		movies: {
			type: new GraphQLList(MovieType),
			resolve(parent, args) {
				// return movies;
				return Movie.find({});
			}
		},
		directors: {
			type: new GraphQLList(DirectorType),
			resolve(parent, args) {
				// return directors;
				return Director.find({});
			}
		}
	}
});

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addDirector: {
			type: DirectorType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
			},
			resolve(parent, args) {
				let director = new Director({
					name: args.name,
				});
				return director.save();
			}
		},
		addMovie: {
			type: MovieType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				genre: { type: new GraphQLNonNull(GraphQLString) },
				year: { type: new GraphQLNonNull(GraphQLString) },
				directorId: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) }
			},
			resolve(parent, args) {
				let movie = new Movie({
					name: args.name,
					genre: args.genre,
					year: args.year,
					directorId: args.directorId,
				});
				return movie.save();
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
});