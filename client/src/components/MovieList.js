import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getMoviesQuery } from '../queries/queries';
import MovieDetails from './MovieDetails';

class MovieList extends Component {

	state = {
		selected: null,
	}

	displayMovies = () => {
		let { data } = this.props;
		if (data.loading) {
			return (<div>Loading movies...</div>);
		} else {
			return data.movies.map(movie => {
				return (
					<li
						key={movie.id}
						onClick={() => {
							this.setState({ selected: movie.id })
						}}
					>
						{movie.name}
					</li>
				)
			})
		}
	}

	render() {
		return (
			<div>
				<ul id="movie-list">
					{this.displayMovies()}
				</ul>
				<MovieDetails
					movieId={this.state.selected}
				/>
			</div>
		)
	}
}

export default graphql(getMoviesQuery)(MovieList);