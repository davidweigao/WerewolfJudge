import { connect } from 'react-redux'
import GameInitPageComponent from '../components/GameInitPageComponent'
import { joinGame } from '../actions'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onCreateClicked: () => {
			console.log("create clicked")
		},
		onJoinClicked: () => {
			console.log("join clicked")
		}
	}
}

const GameInitPage = connect(
	mapStateToProps,
	mapDispatchToProps,
)(GameInitPageComponent)

export default GameInitPage