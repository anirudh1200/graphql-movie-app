import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getDirectorsAndActorsQuery, getMoviesQuery } from '../queries/queries';
import { addMovieMutation } from '../queries/mutations';

class AddMovie extends Component {

	state = {
		name: '',
		genres: [],
		year: '',
		directorId: '',
		actorIds: [],
		actorNo: 1,
		genreNo: 1,
	}

	displayDirectors = () => {
		let data = this.props.getDirectorsAndActorsQuery;
		if (data.loading) {
			return (<option disabled>Loading...</option>)
		} else {
			return data.directors.map(director => {
				return (<option key={director.id} value={director.id}>{director.name}</option>);
			})
		}
	}

	displayActors = () => {
		let data = this.props.getDirectorsAndActorsQuery;
		if (data.loading) {
			return (<option disabled>Loading...</option>)
		} else {
			return data.actors.map(actor => {
				return (<option key={actor.id} value={actor.id}>{actor.name}</option>);
			})
		}
	}

	displayGenre = () => {
		let data = ['Action', 'Adventure', 'Comedy', 'Crime', 'Drama', 'Fantasy', 'Historical', 'Horror', 'Mystery', 'Thriller', 'Romance', 'Science fiction'];
		return data.map((genre, i) => {
			return (<option key={i} value={genre}>{genre}</option>);
		})
	}

	submitForm = e => {
		e.preventDefault();
		console.log(this.state);
		this.props.addMovieMutation({
			variables: {
				name: this.state.name,
				genres: this.state.genres,
				year: this.state.year,
				directorId: this.state.directorId,
				actorIds: this.state.actorIds,
			},
			refetchQueries: [{ query: getMoviesQuery }]
		});
	}

	render() {
		let actorInputs = [];
		for (let i = 0; i < this.state.actorNo; i++) {
			actorInputs.push(
				(
					<select
						key={i}
						onChange={e => {
							e.persist();
							this.setState(prevState => {
								let newActorList = prevState.actorIds;
								newActorList.push(e.target.value);
								return ({ actorIds: newActorList });
							})
						}}
					>
						<option>Actors</option>
						{this.displayActors()}
					</select>
				)
			)
		}
		let genreInputs = [];
		for (let i = 0; i < this.state.genreNo; i++) {
			genreInputs.push(
				(
					<select
						key={i}
						onChange={e => {
							e.persist();
							this.setState(prevState => {
								let newGenreList = prevState.genres;
								newGenreList.push(e.target.value);
								return ({ genres: newGenreList });
							})
						}}
					>
						<option>Genre</option>
						{this.displayGenre()}
					</select>
				)
			)
		}
		return (
			<form id="add-movie" onSubmit={this.submitForm}>
				<div className="field">
					<label>Movie name: </label>
					<input
						type="text"
						onChange={e => this.setState({ name: e.target.value })}
					/>
				</div>
				<div className="field">
					<label>Year: </label>
					<input
						type="number"
						min="1900"
						max="2050"
						onChange={e => this.setState({ year: e.target.value })}
					/>
				</div>
				<div className="field">
					<label>Genre: </label>
					{genreInputs}
					<span onClick={e => this.setState({ genreNo: this.state.genreNo + 1 })}>+</span>
				</div>
				<div className="field">
					<label>Director: </label>
					<select
						onChange={e => {
							e.persist();
							this.setState({ directorId: e.target.value })
						}}
					>
						<option>Select Director</option>
						{this.displayDirectors()}
					</select>
				</div>
				<div className="field">
					<label>Actors: </label>
					{actorInputs}
					<span onClick={e => this.setState({ actorNo: this.state.actorNo + 1 })}>+</span>
				</div>
				<button>Add</button>
			</form>
		)
	}
}

export default compose(
	graphql(getDirectorsAndActorsQuery, { name: "getDirectorsAndActorsQuery" }),
	graphql(addMovieMutation, { name: "addMovieMutation" }),
)(AddMovie);