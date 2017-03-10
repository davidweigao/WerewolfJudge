import React from 'react'
import { Link } from 'react-router'

const GameInitPageComponent = ({onCreateClicked, onJoinClicked}) => (
	<div>
	<button onClick={e => {
		e.preventDefault()
		onCreateClicked()
	}}>
	<Link to="/create">
	创建游戏
	</Link>
	</button>
	<button onClick={e => {
		e.preventDefault()
		onJoinClicked()
	}}>
	<Link to="/join">
	加入游戏
	</Link>
	</button>
	</div>
)

export default GameInitPageComponent