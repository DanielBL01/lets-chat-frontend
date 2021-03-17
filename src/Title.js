import React, { Component } from 'react';
import axios from 'axios';

class Title extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Title Not Defined'
        }
    };

    async componentDidMount() {
        await axios.get('/title').then(res => {
            this.setState({
                title: res.data
            });
        });
    };

    render() {
        return (
            <div>
                {this.state.title}
            </div>
        );
    }
}

export default Title;

/*

This is just for testing the REST API for React and Node JS
We will also test the async function for componentDidMount and it seems to have worked

*/