import { gql } from 'apollo-boost';

export const addMovieMutation = gql`
	mutation($name: String!, $genres: [String]!, $year: String!, $directorId: String!, $actorIds: [String]!){
		addMovie(name: $name, year: $year, genres: $genres, directorId: $directorId, actorIds: $actorIds){
			name
			id
		}
	}
`

export const addActorMutation = gql`
	mutation($name: String!){
		addActor(name: $name){
			name
			id
		}
	}
`

export const addDirectorMutation = gql`
	mutation($name: String!){
		addDirector(name: name){
			name
			id
		}
	}
`