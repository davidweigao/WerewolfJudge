import { connect } from 'react-redux'
import CreateGameComponent from '../components/CreateGameComponent'
import { addCharacter, removeCharacter, startGame, pingSocket } from '../actions'

const mapStateToProps = (state) => {
	let characters = state.game_builder.characters
	return {
		wolfCount:characters.werewolf,
		villagerCount:characters.villager,
		seerEnabled: characters.seer > 0,
		witchEnabled: characters.witch > 0,
		hunterEnabled: characters.hunter > 0,
		idiotEnabled: characters.idiot > 0,
	}
}

const mapDispatchToProps = (dispatch) => {return {
	onAddClicked: (type) => {
		dispatch(addCharacter(type))
	},
	onRemoveClicked: (type) => {
		dispatch(removeCharacter(type))
	},
	onToggled: (type, on) => {
		dispatch(on ? removeCharacter(type) : addCharacter(type))
	},
	onStartClicked: () => {
		dispatch(startGame())
	},
}}

const CreateGamePage = connect(mapStateToProps, mapDispatchToProps)(CreateGameComponent)

export default CreateGamePage