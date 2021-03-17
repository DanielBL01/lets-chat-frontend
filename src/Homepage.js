import React, { Component } from 'react';
import axios from 'axios';

class Homepage extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Set the new name
    handleChange(event) {
        var name = event.target.value;
        this.props.setName(name);
    }

    // Find a new room
    async handleSubmit(event) {
        event.preventDefault();

        if (this.props.name.length > 0) {
            try {
                var room = await axios.get('/findNewRoom');
                this.props.setRoom(room);
            } catch(err) {
                console.log(err);
            }

            if (this.props.page === 'homepage') {
                this.props.setPage('chat');
            }
        }
    }

    render() {
        return (
            <div>Homepage
                <form onSubmit={this.handleSubmit}>
                    <label>
                        What is your Name?
                        <input type='text' name='username' placeholder="Enter your username" value={this.props.name} onChange={this.handleChange} />
                    </label>
                    <input type='submit' value='Find a Chat Room' />
                </form>
            </div>
        )
    }
}

export default Homepage;

/*

The homepage displays a form which a user must enter a username and a language of preference. 

*/