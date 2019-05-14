import { gql } from 'apollo-boost';

export const addMovieMutation = gql`
	mutation($name: String!, $genre: String!, $year: String!,$directorId: [String]!){
		addMovie(name: $name, year: $year,genre: $genre, directorId: $directorId){
			name
			id
		}
	}
`