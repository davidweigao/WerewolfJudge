import {connect} from 'react-redux'
import JoinGamePageComponent from '../components/JoinGamePageComponent'
import { joinGame } from '../actions'

const mapStateToProps = (state, ownProps) => {
	return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		handleSubmit: values => {
			dispatch(joinGame(values.room))
			console.log(values.room);
		}
	}
}

const JoingamePage = connect(mapStateToProps, mapDispatchToProps)(JoinGamePageComponent)

export default JoingamePage