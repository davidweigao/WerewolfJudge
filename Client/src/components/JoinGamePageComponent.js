import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form';

class JoinGamePageComponent2 extends Component {
  render() {
    const { handleSubmit } = this.props
    return (
      <form onSubmit={handleSubmit}>
		<div>
          <label htmlFor="room">Room</label>
          <Field name="room" component="input" type="text"/>
        </div>
		<input type="submit" value="Submit" />
	</form>
    );
  }
}

// Decorate the form component
JoinGamePageComponent2 = reduxForm({
  form: 'room' // a unique name for this form
})(JoinGamePageComponent2)

class JoinGamePageComponent extends React.Component {

  render() {
  	const { handleSubmit } = this.props
    return (
      <JoinGamePageComponent2 onSubmit={e => handleSubmit(e)} />
    );
  }
}

export default JoinGamePageComponent