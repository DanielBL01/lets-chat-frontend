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
        document.title = 'Lets Chat - Chat Room'
        document.body.style.backgroundImage = ''
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
            message: '(' + this.props.name + ') ' + this.state.message,
            language: this.state.partnerLanguage
        });

        this.setState({
            message: ''
        });
    }

    render() {
        let renderPage;

        if (this.state.status === 'matching') {
            renderPage = <div>
                <div className={style.searching}>
                    <div>Searching for a Partner</div>
                    <div className={style.dot_flashing} />
                </div>
                <div>
                    <button className={style.leave} onClick={this.handleClick}>Leave</button>
                </div> 
            </div>
        } 
        
        else if (this.state.status === 'chatting') {
            var displayMessages = this.state.messages.map(message => 
                <li>{message}</li>
            );

            renderPage = <div>
                <h3>You have been matched with {this.state.partnerName} who speaks {this.state.partnerLanguage}. You have declared that you speak {this.props.language}.</h3>
                <div className='messages'>
                    <ul className={style.message_format}>    
                        {displayMessages}
                    </ul>
                </div>

                <form className={style.message_form} onSubmit={this.handleSubmit}>
                    <input className={style.message_enter} type='text' name='message' placeholder="Aa" value={this.state.message} onChange={this.handleChange} />
                    <input className={style.message_submit} type='submit' value='Send' />
                </form>
                <button className={style.leave} onClick={this.handleClick}>Leave</button>
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