const game_builder = (state = {characters:{}}, action) => {
	switch (action.type) {
		case 'ADD_CHARACTER':
			let character = {}
			let character_count = state.characters[action.character] || 0
			character[action.character] = character_count + 1
			let characters = Object.assign({}, state.characters, character)
			return Object.assign({}, state, {characters:characters})
		case 'REMOVE_CHARACTER':
			let character2 = {}
			let character_count2 = state.characters[action.character]
			if (character_count2 > 0) {
				character2[action.character] = character_count2 - 1
			} else {
				character2[action.character] = 0
			}
			let characters2 = Object.assign({}, state.characters, character2)
			return Object.assign({}, state, {characters: characters2})
		case 'CREATE':
			return state // TODO send the data to server
		default:
			return state
	}
}

export default game_builder