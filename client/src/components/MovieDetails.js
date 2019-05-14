import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getMovieQuery } from '../queries/queries';

class MovieDetails extends Component {

	displayBookDetails = () => {
		const { movie } = this.props.data;
		if (movie) {
			const otherMovies = movie.directors[0].movies.map(item => {
				return (<li key={item.id}>{item.name}</li>);
			});
			return (
				<div>
					<h2>{movie.name}</h2>
					<p>{movie.genre}</p>
					<p>{movie.directors[0].name}</p>
					<ul className="other-movies">
						{otherMovies}
					</ul>
				</div>
			)
		} else {
			return (
				<div>No Book Selected</div>
			)
		}
	}

	render() {
		console.log(this.props);
		return (
			<div id="book-details">
				{this.displayBookDetails()}
			</div>
		)
	}
}

export default graphql(getMovieQuery, {
	options: props => {
		return {
			variables: {
				id: props.movieId
			}
		}
	}
})(MovieDetails);