import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getDirectorsAndActorsQuery } from '../queries/queries';
import { addActorMutation } from '../queries/mutations';

class AddActor extends Component {

	state = {
		actorName: '',
	}

	submitActor = e => {
		e.preventDefault();
		this.props.addActorMutation({
			variables: {
				name: this.state.actorName
			},
			refetchQueries: [{ query: getDirectorsAndActorsQuery }]
		});
		this.setState({ actorName: '' });
	}

	render() {
		return (
			<form id="add-actor" onSubmit={this.submitActor}>
				<div className="field">
					<label>Actor Name: </label>
					<input
						value={this.state.actorName}
						type="text"
						onChange={e => this.setState({ actorName: e.target.value })}
					/>
				</div>
				<button>+</button>
			</form>
		)
	}
}

export default compose(
	graphql(addActorMutation, { name: "addActorMutation" }),
	graphql(getDirectorsAndActorsQuery, { name: "getDirectorsAndActorsQuery" }),
)(AddActor);