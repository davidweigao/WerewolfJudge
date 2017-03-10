import React from 'react'
import './CreateGame.css'

const CountableCharacter = ({count, onAddClicked, onRemoveClicked, character, name}) => (
	<div className='row'>
		<p>{name}X</p>
		<p>{count}</p>
		<button onClick={() => onAddClicked(character)}>+</button>
		<button onClick={() => onRemoveClicked(character)}>-</button>
	</div>
)

const BooleanCharacter = ({character, name, enabled, onToggled}) => (
	<div className='row'>
		<p>{name}</p>
		<input	onChange={e => onToggled(character, enabled)}
		 		checked={enabled}
		 		type="checkbox" />
	</div>
)

const CreateGameComponent = (
	{wolfCount, villagerCount,seerEnabled, witchEnabled,
	 hunterEnabled, idiotEnabled, onAddClicked, onRemoveClicked, onStartClicked,
	 onToggled}) => (
	<div className='container'>
		<CountableCharacter count={wolfCount} onAddClicked={onAddClicked} onRemoveClicked={onRemoveClicked} character='werewolf' name='狼人' />
		<CountableCharacter count={villagerCount} onAddClicked={onAddClicked} onRemoveClicked={onRemoveClicked} character='villager' name='村民' />
		<BooleanCharacter character='seer' name='预言家' enabled={seerEnabled} onToggled={onToggled} />
		<BooleanCharacter character='witch' name='女巫' enabled={witchEnabled} onToggled={onToggled} />
		<BooleanCharacter character='hunter' name='猎人' enabled={hunterEnabled} onToggled={onToggled} />
		<BooleanCharacter character='idiot' name='白痴' enabled={idiotEnabled} onToggled={onToggled} />
		<button onClick={ () => onStartClicked() } className='button'>开始游戏</button>
	</div>
)

export default CreateGameComponent