import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {cities: []}
  async componentDidMount() {
    const response = await fetch('/cities')
    const cities = await response.json()
    this.setState({ cities: cities})
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <ul>
          {this.state.cities.map(city => (
            <li key={city.name}>{city.name}: {city.population}</li>
          )
          )}
        </ul>
      </div>
    );
  }
}

export default App;
