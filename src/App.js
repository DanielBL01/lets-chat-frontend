import React, { Component } from 'react';
import Header from './components/Header';
import Homepage from './components/Homepage';
import Chat from './components/Chat';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'homepage',
      room: 0,
      name: '',
      language: 'en'
    };

    this.setPage = this.setPage.bind(this);
    this.setRoom = this.setRoom.bind(this);
    this.setName = this.setName.bind(this);
    this.setLanguage = this.setLanguage.bind(this);
  }

  setPage(page) {
    this.setState({page: page});
  }

  setRoom(room) {
    this.setState({room: room});
  }

  setName(name) {
    this.setState({name: name})
  }

  setLanguage(language) {
    this.setState({language: language})
  }

  render() {
    let renderPage;

    if (this.state.page === 'homepage') {
      renderPage = <Homepage page='homepage' name={this.state.name} language={this.state.language} setName={this.setName} setPage={this.setPage} setRoom={this.setRoom} setLanguage={this.setLanguage} />;
    } else if (this.state.page === 'chat') {
      console.log(this.state);
      renderPage = <Chat page='chat' name={this.state.name} language={this.state.language} room={this.state.room} setName={this.setName} setPage={this.setPage} setRoom={this.setRoom} setLanguage={this.setLanguage} />;
    }

    return (
      <div className='container'>
        <div className='card'>
          <Header />
        </div>
        <div className='card'>
          {renderPage}          
        </div>
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
