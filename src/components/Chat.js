import React, { Component } from 'react';
import socket from './Socket';
import Homepage from './Homepage';
import style from './Chat.module.css';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'matching',
            partnerName: '',
            partnerLanguage: '',
            message: '',
            messages: []
        };

        this.connectSocket = this.connectSocket.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.connectSocket(this.props.room);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.room !== this.props.room) {
            this.connectSocket(this.props.room);
        }
    }

    connectSocket(room_id) {
        socket.emit('join', room_id);

        socket.on('messages', msg => {
            var temp = this.state.messages;
            temp.push(msg);
            this.setState({
                messages: temp
            });
        });

        socket.on('status', status => {
            this.setState({
                status: status
            });

            if (this.state.status === 'chatting') {
                socket.emit('partner', {
                    name: this.props.name,
                    language: this.props.language
                });
            }
        });

        socket.on('newPartner', newPartner => {
            if (newPartner.id !== socket.id) {
                this.setState({
                    partnerName: newPartner.name,
                    partnerLanguage: newPartner.language
                });
            }
        });
    }

    handleClick(event) {
        event.preventDefault();
        socket.emit('leave');

        this.setState({
            status: 'leave',
            partnerName: '',
            partnerLanguage: '',
            message: '',
            messages: []
        });

        this.props.setPage('homepage');
        this.props.setRoom(0);
        this.props.setName('');
        this.props.setLanguage('en');
    }

    handleChange(event) {
        var msg = event.target.value;
        this.setState({
            message: msg
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        socket.emit('messages', {
            message: this.state.message,
            language: this.state.partnerLanguage
        });

        this.setState({
            message: ''
        });
    }

    render() {
        let renderPage;

        if (this.state.status === 'matching') {
            renderPage = <div className={style.searching}>
                <div>Searching for a Partner</div>
                <div className={style.dot_flashing} />
            </div>
        } 
        
        else if (this.state.status === 'chatting') {
            var displayMessages = this.state.messages.map(message => 
                <li>{message}</li>
            );

            renderPage = <div>
                <h1>Welcome, and thanks for joining the Chat room!</h1>
                <h2>You are talking to {this.state.partnerName} who speaks {this.state.partnerLanguage}</h2>
                <h2>You speak {this.props.language}</h2>
                <button onClick={this.handleClick}>Leave</button>
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
        } 
        
        else if (this.state.status === 'leave') {
            renderPage = <div>
                <p>Your Chat has Ended!</p>
                <Homepage />
            </div>
        }

        return (
            <div>
                {renderPage}
            </div>
        )
    }
}

export default Chat;