import React, { Component } from 'react';
import axios from 'axios';
import style from './Homepage.module.css';

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            languages: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        document.title = 'Lets Chat - Homepage'
        document.body.style.backgroundImage = 'linear-gradient(to right, #bdffce, #fcd4f0)'
        try {
            await axios.get('https://lets-chat-server1.herokuapp.com/listAllLanguages').then(res => {
                this.setState({
                    languages: res.data
                });
            });
        } catch(err) {
            console.log(err);
        }
    };
    
    handleChange(event) {
        if (event.target.name === 'username') {
            this.props.setName(event.target.value);
        } else if (event.target.name === 'language') {
            this.props.setLanguage(event.target.value);
        }    
    }

    async handleSubmit(event) {
        event.preventDefault();

        if (this.props.name.length > 0) {
            try {
                await axios.get('https://lets-chat-server1.herokuapp.com/findOrCreateRoom').then(res => {
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
            <div className={style.homepage}>
                Seeminglessly chat with people speaking different languages
                <form onSubmit={this.handleSubmit}>
                    <select className={style.homepage_form} name='language' value={this.props.language} onChange={this.handleChange}>
                        {this.state.languages.map((language, i) => {
                            return <option value={language.code}>{language.name}</option>
                        })}
                    </select>
                    <input className={style.homepage_form} type='text' name='username' placeholder='Enter your username...' value={this.props.name} onChange={this.handleChange} />
                    <input className={`${style.homepage_form} ${style.submit_button}`} type='submit' value='Find a Chat Room' />
                </form>
            </div>
        )
    }
}

export default Homepage;