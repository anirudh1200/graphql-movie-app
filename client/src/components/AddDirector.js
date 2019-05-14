import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getDirectorsAndActorsQuery } from '../queries/queries';
import { addDirectorMutation } from '../queries/mutations';

class AddDirector extends Component {

	state = {
		directorName: ''
	}

	submitDirector = e => {
		e.preventDefault();
		this.props.addDirectorMutation({
			variables: {
				name: this.state.directorName
			},
			refetchQueries: [{ getDirectorsAndActorsQuery }]
		});
	}

	render() {
		return (
			<form id="add-director" onSubmit={this.submitDirector}>
				<div className="field">
					<label>Director Name: </label>
					<input
						type="text"
						onChange={e => this.setState({ directorName: e.target.value })}
					/>
				</div>
				<button>+</button>
			</form>
		)
	}
}

export default compose(
	graphql(addDirectorMutation, { name: "addDirectorMutation" }),
	graphql(getDirectorsAndActorsQuery, { name: "getDirectorsAndActorsQuery" }),
)(AddDirector);