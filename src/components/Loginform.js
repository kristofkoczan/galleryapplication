import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import store from '../store';
import USERS from './../database/USERS.json'

export default class Loginform extends Component {
    constructor(props){
        super(props)

        this.state = {
            username: ''
        }
    }
    handleChange = event => {
        this.setState({
            username: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault();
        if(this.state.username === ''){
            alert("Write in your username")
        }else{
            localStorage.setItem("username", this.state.username);
            console.log("Wellcome " + localStorage.getItem('username') + ", we missed you!");
            store.dispatch({
                type: "logedIn",
                payload: {
                    user: this.state.username,
                }
            })

            let alreadyRegitrated = false;
            USERS.map(user => user.user === this.state.username ? alreadyRegitrated = true : '');
            if(!alreadyRegitrated){
                const dateObj = new Date();
                const year = dateObj.getFullYear();
                const month = dateObj.getMonth();
                const day = String(dateObj.getDate()).padStart(2, '0');
                USERS.push({user: this.state.username, "firstLogedIn": year + "-" + month + "-" + day})
            }
        }
    }


    render() {
        return (
            <Card className="big-form">
                <form onSubmit={this.handleSubmit}>
                    <TextField label="Username" value={this.state.username} onChange={this.handleChange}/><br/><br/>
                    <Button variant="contained" color="primary" type="submit">Log in</Button>
                </form>
            </Card>
        )
    }
}
