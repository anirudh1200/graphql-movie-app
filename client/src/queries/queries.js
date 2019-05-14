import { gql } from 'apollo-boost';

export const getDirectorsQuery = gql`
	{
		directors{
			name
			id
		}
	}
`

export const getMoviesQuery = gql`
	{
		movies{
			name
			id
		}
}
`

export const getMovieQuery = gql`
	query($id: ID){
		movie(id: $id){
			name
			year
			genre
			directors{
				id
				name
				movies{
					name
					id
				}
			}
			id
		}
	}
`