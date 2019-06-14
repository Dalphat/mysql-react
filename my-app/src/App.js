
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    data: [],
    name: ''
  }

  componentDidMount() {
    this.getData();
  }

  getData = _ => {
    fetch('http://localhost:4000/user')
      .then(response => response.json())
      .then(response => this.setState({
        data: response.data
      }))
      .catch(err => console.error(err));
  }

  addData = _ => {
    const { name } = this.state;
    console.log(name);
    fetch(`http://localhost:4000/user/add?name=${name}`)
    .then(this.getData)
    .catch(err => console.error(err))
  }

  renderUser = ({id, name}) => <div key={id}>{name}</div>

  render() {
    const { data, name } = this.state;
    return (
      <div className="App">
        {data.map(this.renderUser)}
        <input value={name} 
          onChange={e => this.setState({name: e.target.value})}/>
        <button onClick={this.addData}>Add Name</button>
      </div>
    );
  }
}

export default App;