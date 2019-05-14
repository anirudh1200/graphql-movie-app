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

export const getDirectorsAndActorsQuery = gql`
	{
		directors{
			name
			id
		},
		actors{
			name
			id
		}
	}
`

export const getMovieQuery = gql`
	query($id: ID){
		movie(id: $id){
			id
			name
			year
			genres{
				name
			}
			director{
				id
				name
				movies{
					name
					id
				}
			}
			actors{
				name
				movies{
					id
					name
				}
			}
		}
	}
`