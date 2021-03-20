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
        if (event.target.name === 'username') {
            this.props.setName(event.target.value);
        } else if (event.target.name === 'language') {
            this.props.setLanguage(event.target.value);
        }    
    }

    /**
     * handleSubmit is called for onSubmit in the form tag. This means that when the form is submitted, this function is called which finds 
     * a new room for the user and changes the page to homepage -> chat
     * 
     * We use the async and await keywords since we're makinga request to an API
     */
    async handleSubmit(event) {
        event.preventDefault();

        if (this.props.name.length > 0) {
            try {
                await axios.get('/findOrCreateRoom').then(res => {
                    console.log(res.data);
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
                        <input type='text' name='username' placeholder='Enter your username' value={this.props.name} onChange={this.handleChange} />
                    </label>
                    <label>
                        What language do you speak?
                        <select name='language' value={this.props.language} onChange={this.handleChange}>
                            <option value="english">English</option>
                            <option value="french">French</option>
                        </select>
                    </label>
                    <input type='submit' value='Find a Chat Room' />
                </form>
            </div>
        )
    }
}

export default Homepage;

/*

The Homepage component will display a form to save the username and language and on submit, set the page from homepage to chat so that the App component can render 
the Chat component

*/