const graphql = require('graphql'),
	Movie = require('../models/movie'),
	Director = require('../models/director'),
	Actor = require('../models/actor');

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
		genres: {
			type: new GraphQLList(GenreType),
			resolve(parent, args) {
				return parent.genres.map(genre => ({ name: genre }));
			}
		},
		actors: {
			type: new GraphQLList(ActorType),
			resolve(parent, args) {
				return Actor.find({ '_id': { $in: parent.actorIds } });
			}
		},
		year: { type: GraphQLString },
		director: {
			type: DirectorType,
			resolve(parent, args) {
				return Director.findById(parent.directorId);
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
				return Movie.find({ directorId: parent.id })
			}
		}
	})
});

const GenreType = new GraphQLObjectType({
	name: 'Genre',
	fields: () => ({
		name: { type: GraphQLString },
		movies: {
			type: new GraphQLList(MovieType),
			resolve(parent, args) {
				return Movie.find({ genres: parent.name })
			}
		}
	})
});

const ActorType = new GraphQLObjectType({
	name: 'Actor',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		movies: {
			type: new GraphQLList(MovieType),
			resolve(parent, args) {
				return Movie.find({ actorIds: parent.id })
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
				return Movie.findById(args.id);
			}
		},
		director: {
			type: DirectorType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return Director.findById(args.id);
			}
		},
		genre: {
			type: GraphQLString,
			args: { name: { type: GraphQLString } },
			resolve(parent, args) {
				return Movie.find({ genres: args.name });
			}
		},
		actor: {
			type: GraphQLString,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return Actor.findById(args.id);
			}
		},
		movies: {
			type: new GraphQLList(MovieType),
			resolve(parent, args) {
				return Movie.find({});
			}
		},
		directors: {
			type: new GraphQLList(DirectorType),
			resolve(parent, args) {
				return Director.find({});
			}
		},
		actors: {
			type: new GraphQLList(ActorType),
			resolve(parent, args) {
				return Actor.find({});
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
				genres: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
				actorIds: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
				year: { type: new GraphQLNonNull(GraphQLString) },
				directorId: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve(parent, args) {
				let movie = new Movie({
					name: args.name,
					genres: args.genres,
					actorIds: args.actorIds,
					year: args.year,
					directorId: args.directorId,
				});
				return movie.save();
			}
		},
		addActor: {
			type: ActorType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
			},
			resolve(parent, args) {
				let actor = new Actor({
					name: args.name,
				});
				return actor.save();
			}
		},
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
});