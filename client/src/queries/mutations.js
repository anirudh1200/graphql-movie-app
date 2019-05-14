import { gql } from 'apollo-boost';

export const addMovieMutation = gql`
	mutation($name: String!, $genres: [String]!, $year: String!, $directorId: String!, $actorIds: [String]!){
		addMovie(name: $name, year: $year, genres: $genres, directorId: $directorId, actorIds: $actorIds){
			name
			id
		}
	}
`