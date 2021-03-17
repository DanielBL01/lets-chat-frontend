import React, { Component } from 'react';
import axios from 'axios';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            header: 'Header Not Defined'
        };
    };

    async componentDidMount() {
        await axios.get('/header').then(res => {
            this.setState({
                header: res.data
            });
        });
    };

    render() {
        return (
            <div>
                {this.state.header}
            </div>
        );
    }
}

export default Header;

/*

This is just for testing the REST API for React and Node JS
We will also test the async function for componentDidMount and it seems to have worked

*/