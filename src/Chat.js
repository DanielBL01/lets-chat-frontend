import React, { Component } from 'react';
import socket from './Socket';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        };
    }

    componentDidMount() {
        this.connectSocket();
    }

    connectSocket() {
        socket.emit('join', 'single_test_room');

        var temp = this.state.messages;
        temp.push(this.props.name);
        this.setState({
            messages: temp
        });

        console.log(this.state.messages);
    }

    render() {
        var displayMessages = this.state.messages.map(message => 
            <li>{message}</li>
        );

        return (
            <div>
                <h1>Welcome, and thanks for joining the Chat room!</h1>
                <ul>    
                    {displayMessages}
                </ul>
            </div>
        )
    }
}

export default Chat;