import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      bgColor: "#00ffff"
    };
    this.handleClick = this.handleClick.bind(this);
    this.getRandomColor = this.getRandomColor.bind(this);
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  getRandomColor() {
    return "#"+((1<<24)*Math.random()|0).toString(16)
}

  handleClick() {
    console.log("clicked");
    const color = this.getRandomColor();
    this.setState({bgColor:color})
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div onClick={this.handleClick} style={{backgroundColor: this.state.bgColor}}>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}