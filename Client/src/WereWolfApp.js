import React, { Component } from 'react';
import './WereWolfApp.css'

const witch = require('../res/witch.jpg');
const seer = require('../res/seer.jpg');
const villager = require('../res/villager.png');
const hunter = require('../res/hunter.png');
const werewolf = require('../res/werewolf.png');
const idiot = require('../res/idiot.jpg');
const CARD_TYPE = {
	WITCH: 1,
	SEER: 2,
	VILLAGER: 3,
	HUNTER: 4,
	WEREWOLF: 5,
	IDIOT: 6
}
export default class WereWolfApp extends React.Component {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);

		this.state = { 
			villagerAmount: 0,
			wereWolfAmount: 0,
			seerAmount: 0,
			witchAmount: 0,
			hunterAmount: 0,
			idiotAmount: 0
		};
	}

	handleClick(type) {
		console.log(type + " clicked");
		this.setState((provState, props) => {
			switch(type) {
				case CARD_TYPE.VILLAGER: return {villagerAmount: provState.villagerAmount + 1};
				case CARD_TYPE.WEREWOLF: return {wereWolfAmount: provState.wereWolfAmount + 1};
				case CARD_TYPE.SEER: return {seerAmount: provState.seerAmount + 1};
				case CARD_TYPE.WITCH: return {witchAmount: provState.witchAmount + 1};
				case CARD_TYPE.HUNTER: return {hunterAmount: provState.hunterAmount + 1};
				case CARD_TYPE.IDIOT: return {idiotAmount: provState.idiotAmount + 1};
				default: return {}
			}
		})
	}

	render() {
		return (
			<div>
			<div>
				<Card image={villager} type={CARD_TYPE.VILLAGER} onClick={this.handleClick} amount={this.state.villagerAmount} />
				<Card image={werewolf} type={CARD_TYPE.WEREWOLF} onClick={this.handleClick} amount={this.state.wereWolfAmount}/>
			</div>
			<div>
				<Card image={seer} type={CARD_TYPE.SEER} onClick={this.handleClick} amount={this.state.seerAmount}/>
				<Card image={witch} type={CARD_TYPE.WITCH} onClick={this.handleClick} amount={this.state.witchAmount}/>
				<Card image={hunter} type={CARD_TYPE.HUNTER} onClick={this.handleClick} amount={this.state.hunterAmount}/>
				<Card image={idiot} type={CARD_TYPE.IDIOT} onClick={this.handleClick} amount={this.state.idiotAmount}/>
			</div>
			</div>
		)
	}
}

class Card extends React.Component {

	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.props.onClick(this.props.type)
	}

	render() {
		return (
			<div className='card' onClick={this.handleClick}>
			<p>X {this.props.amount}</p>
			<img className='card' src={this.props.image} />
			</div>
		)
	}
}