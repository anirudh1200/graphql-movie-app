import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getMovieQuery } from '../queries/queries';

class MovieDetails extends Component {

	displayMovieDetails = () => {
		const { movie } = this.props.data;
		console.log(movie);
		if (movie) {
			const otherMovies = movie.director.movies.map(item => {
				return (<li key={item.id}>{item.name}</li>);
			});
			return (
				<div>
					<h2>{movie.name}</h2>
					<p>{movie.genre}</p>
					<p>{movie.director.name}</p>
					<ul className="other-movies">
						{otherMovies}
					</ul>
				</div>
			)
		} else {
			return (
				<div>No Movie Selected</div>
			)
		}
	}

	render() {
		console.log(this.props);
		return (
			<div id="movie-details">
				{this.displayMovieDetails()}
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