const game = (state = [], action) => {
	switch (action.type) {
		case 'CREATE_GAME':
			return Object.assign({}, state, {step: 1.2})
		case 'JOIN_GAME':
			return Object.assign({}, state, {step: 1.1})
		case 'SET_GAME_ID':
			return Object.assign({}, state, {id: action.payload})
		case 'GAME_BEGIN':
			return Object.assign({}, state, {character: action.character, id:action.id})
		default:
			return state
	}
}

export default game