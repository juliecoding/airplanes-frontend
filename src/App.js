import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      planes: [],
      planetype: '',
      passengercount: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3000/api/planes')
    .then(response => {
      this.setState({ planes: response.data })
    });
  }

  addPlane = () => {
    let {planetype, passengercount} = this.state;
    passengercount = Number(passengercount);

    axios.post('http://localhost:3000/api/planes', {
      planetype,
      passengercount
    }).then( response => {
      this.setState( {planes: response.data} )
    })
  }

  render() {
    return (
      <div className="App">
        <input onChange={e => console.log('fired') || this.setState({planetype: e.target.value})} placeholder="plane type"></input> {/* Ask Luke */}
        <input onChange={e => console.log('fired') || this.setState({passengercount: e.target.value})} placeholder="passenger count"></input>
        <button onClick={this.addPlane}>Add Plane!</button>
        {this.state.planes.map(plane => {
          return (
            <div key={plane.planeid}>
              Type: {plane.planetype}
              <br />
              Passenger Count: {plane.passengercount}
              <br />
              <br />
            </div>
          )
        })}
      </div>
    );
  }
}

export default App;
