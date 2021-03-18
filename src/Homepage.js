import React, { Component } from 'react';
import axios from 'axios';

class Homepage extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     * handleChange is called for onChange in the input tag. onChange reacts to a change in the input field box and NOT when the form is submitted.
     * This means that the var name is constantly changing i.e name = d -> da -> dan -> dani -> danie -> daniel (FINAL)
     */
    handleChange(event) {
        var name = event.target.value;
        this.props.setName(name);
    }

    /**
     * handleSubmit is called for onSubmit in the form tag. This means that when the form is submitted, this function is called which finds 
     * a new room for the user and changes the page to homepage -> chat
     */
    async handleSubmit(event) {
        event.preventDefault();

        if (this.props.name.length > 0) {
            try {
                await axios.get('/findNewRoom').then(res => {
                    this.props.setRoom(res.data)
                });
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