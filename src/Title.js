import React, { Component } from 'react';
import axios from 'axios';

class Title extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Title Not Defined'
        }
    };

    componentDidMount() {
        axios.get('/title').then(res => {
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