import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getBooksQuery = gql`
	{
		movies{
			name
			id
		}
	}
`

class MovieList extends Component {
	displayMovies = () => {
		let { data } = this.props;
		if (data.loading) {
			return (<div>Loading books...</div>);
		} else {
			return data.movies.map(movie => {
				return (
					<li key={movie.id}>{movie.name }</li>
				)
			})
		}
	}
	render() {
		console.log(this.props);
		return (
			<div>
				<ul id="movie-list">
					{this.displayMovies()}
				</ul>
			</div>
		)
	}
}

export default graphql(getBooksQuery)(MovieList);