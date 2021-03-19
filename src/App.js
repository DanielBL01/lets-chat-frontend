import React, { Component } from 'react';
import Header from './Header';
import Homepage from './Homepage';
import Chat from './Chat';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'homepage',
      room: 0,
      name: ''
    };

    this.setName = this.setName.bind(this);
    this.setPage = this.setPage.bind(this);
    this.setRoom = this.setRoom.bind(this);
  }

  setName(name) {
    this.setState({name: name})
  }

  setPage(page) {
    this.setState({page: page});
  }

  setRoom(room) {
    this.setState({room: room});
  }

  render() {
    let renderPage;

    if (this.state.page === 'homepage') {
      renderPage = <Homepage page='homepage' name={this.state.name} setName={this.setName} setPage={this.setPage} setRoom={this.setRoom} />;
    } else if (this.state.page === 'chat') {
      renderPage = <Chat page='chat' name={this.state.name} room={this.state.room} setName={this.setName} setPage={this.setPage} setRoom={this.setRoom} />;
    }

    return (
      <div className='App'>
        <Header />
        {renderPage}
      </div>
    )
  }
}

export default App;

/*

There are two main pages for this application. A page where a user enters a username and chooses a language of preference
and a chat room page where two users chat using different languages

This App component shall handle whether we render the homepage or chat page, store the room, and the username and language
*/
