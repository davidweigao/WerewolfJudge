export const addCharacter = (character) => {
  return {
    type: 'ADD_CHARACTER',
    character: character,
  }
}

export const removeCharacter = (character) => {
  return {
    type: 'REMOVE_CHARACTER',
    character: character,
  }
}

export const startGame = () => {
  return (dispatch, getState, {socket}) => {
    socket.emit('start_game', getState().game_builder, roomID => {
        let response = Object.assign({}, getState().game_builder, {roomID: roomID})
        dispatch({type: 'START_GAME', response})
    })
  }
}

export const joinGame = (id) => {
  return (dispatch, getState, {socket}) => {
    socket.emit('join_game', id, response => {
        if (response == 'ok') {
            dispatch({type: 'WAITING_GAME_TO_START'})
        } else if (response == 'error') {
            dispatch({type: 'JOIN_GAME_ERROR'})
        }
    })
  }
}

export const pingSocket = () => {
  return (dispatch, getState, {socket}) => {
    console.log('ping')
    socket.send('ping', response => {
      console.log('Response received: ' + response)
    })
  }
}