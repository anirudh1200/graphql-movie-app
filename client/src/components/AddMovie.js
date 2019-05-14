import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getDirectorsQuery, getMoviesQuery } from '../queries/queries';
import { addMovieMutation } from '../queries/mutations';

class AddMovie extends Component {

	state = {
		name: '',
		genre: '',
		year: '',
		directorId: []
	}

	displayDirectors = () => {
		let data = this.props.getDirectorsQuery;
		if (data.loading) {
			return (<option disabled>Loading...</option>)
		} else {
			return data.directors.map(director => {
				return (<option key={director.id} value={director.id}>{director.name}</option>);
			})
		}
	}

	submitForm = e => {
		e.preventDefault();
		console.log(this.state);
		this.props.addMovieMutation({
			variables: {
				name: this.state.name,
				genre: this.state.genre,
				year: this.state.year,
				directorId: this.state.directorId
			},
			refetchQueries: [{ query: getMoviesQuery }]
		});
	}

	render() {
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
					<label>Genre: </label>
					<input
						type="text"
						onChange={e => this.setState({ genre: e.target.value })}
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
					<label>Director: </label>
					<select
						onChange={e => {
							e.persist();
							this.setState(prevState => {
								let { directorId } = prevState
								directorId.push(e.target.value);
								return ({ directorId: directorId });
							})
						}}
					>
						<option>Select author</option>
						{this.displayDirectors()}
					</select>
				</div>
				<button>+</button>
			</form>
		)
	}
}

export default compose(
	graphql(getDirectorsQuery, { name: "getDirectorsQuery" }),
	graphql(addMovieMutation, { name: "addMovieMutation" }),
)(AddMovie);