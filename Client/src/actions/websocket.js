import io from 'socket.io-client'

const socket = io('http://127.0.0.1:5000')

const init = (store, browserHistory) => {
	socket.on('connect', () => {
		console.log('socket connected')
	})

	socket.on('disconnect', () => {
		console.log('socket disconnected')
	})

	socket.on('message', message => {
		console.log('message from socket: ' + message)
		if(message === 'ping') {
			console.log('pong')
			socket.send('pong')
		}
	})

	socket.on('game_begin', (character, id) => {
		store.dispatch({type:'GAME_BEGIN', character:character, id:id})
		browserHistory.push('/gaming')
	})

}

const emit = (type, payload) => socket.emit(type, payload)

export {init, emit, socket}