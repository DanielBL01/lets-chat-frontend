import React, { Component } from 'react';
import socket from './Socket';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            messages: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.connectSocket = this.connectSocket.bind(this);
    }

    componentDidMount() {
        this.connectSocket('single_test_room');
    }

    componentDidUpdate(prevProps) {
        if (prevProps.room !== this.props.room) {
            this.connectSocket('single_test_room');
        }
    }

    connectSocket(room) {
        socket.emit('join', room);
        socket.on('messages', msg => {
            var temp = this.state.messages;
            temp.push(msg);
            this.setState({
                messages: temp
            });
        });
    }

    handleChange(event) {
        var msg = event.target.value;
        this.setState({
            message: msg
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        socket.emit('messages', this.state.message);

        this.setState({
            message: ''
        });
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
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Enter something to the chat...
                        <input type='text' name='message' placeholder="Aa" value={this.state.message} onChange={this.handleChange} />
                    </label>
                    <input type='submit' value='Send' />
                </form>
            </div>
        )
    }
}

export default Chat;