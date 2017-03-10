import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import game from './reducers/game'
import game_builder from './reducers/game_builder'
import createLogger from 'redux-logger'
import GameInitPage from './containers/GameInitPageContainer'
import { Router, Route, browserHistory } from 'react-router'
import JoinGamePage from './containers/JoinGamePageContainer'
import CreateGamePage from './containers/CreateGameContainer'
import thunk from 'redux-thunk'
import io from 'socket.io-client'
import { init as websocketInit, emit, socket } from './actions/websocket'
import { reducer as formReducer } from 'redux-form'

function initReduxStore() {
	const werewolfApp = combineReducers({
	  game,
	  game_builder,
	  form: formReducer,
	})
	const middleware = [ thunk.withExtraArgument({ socket }) ]
	middleware.push(createLogger())

	const setup = applyMiddleware(...middleware)(createStore)
	const store = setup(werewolfApp)
	websocketInit(store, browserHistory)
	return store
}

function dispatchTestActions(store) {
	store.dispatch({type: 'REMOVE_CHARACTER', character:'werewolf'})
	store.dispatch({type:'ADD_CHARACTER', character:'werewolf'})
	store.dispatch({type:'ADD_CHARACTER', character:'werewolf'})
	store.dispatch({type:'ADD_CHARACTER', character:'werewolf'})
	store.dispatch({type:'ADD_CHARACTER', character:'werewolf'})
	store.dispatch({type:'ADD_CHARACTER', character:'werewolf'})
	store.dispatch({type: 'REMOVE_CHARACTER', character:'werewolf'})

	store.dispatch({type:'ADD_CHARACTER', character:'villager'})
	store.dispatch({type:'ADD_CHARACTER', character:'villager'})
	store.dispatch({type:'ADD_CHARACTER', character:'villager'})
	store.dispatch({type:'ADD_CHARACTER', character:'villager'})
	store.dispatch({type:'ADD_CHARACTER', character:'villager'})
	store.dispatch({type: 'REMOVE_CHARACTER', character:'villager'})

	store.dispatch({type:'ADD_CHARACTER', character:'seer'})
	store.dispatch({type:'ADD_CHARACTER', character:'witch'})
	store.dispatch({type:'ADD_CHARACTER', character:'hunter'})
	store.dispatch({type:'ADD_CHARACTER', character:'idiot'})
}

const reduxStore = initReduxStore()

render(
	<Provider store={reduxStore}>
		<Router history={browserHistory}>
			<Route path="/" component={GameInitPage} />
			<Route path="/join" component={JoinGamePage} />
			<Route path="/create" component={CreateGamePage} />
		</Router>
	</Provider>,
	document.getElementById('root')
)

dispatchTestActions(reduxStore)

