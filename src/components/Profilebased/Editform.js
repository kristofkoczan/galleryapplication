import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import USERS from '../../database/USERS.json'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


export default class Uploaderform extends Component {

    constructor(props){
        super(props)

        this.state = {
            newSex: '',
            user: '',
        }
        USERS.map(u => u.user === localStorage.getItem('user') ? this.setState({user: u}) : '');
    }


    handleSexChange = event => {
        if(event.target.value==="Other"){
            this.setState({
                newSex : undefined
            })
        }else{
            this.setState({
                newSex : event.target.value
            })
        }

    }



    handleSubmit = event => {
        event.preventDefault();
        USERS.map(user => user.user === localStorage.getItem('user') ? user.sex = this.state.newSex : '');
        this.props.onClose();
    }

    render() {

        return (
            <form onSubmit={this.handleSubmit} className="uploaderForm">
                <label >
                    <FormControl className="input">
                        <InputLabel className="input">Sex</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={this.state.newSex}
                            onChange={this.handleSexChange}
                            defaultValue={this.state.user.sex}
                        >
                                <MenuItem value={"Male"}>Male</MenuItem>
                                <MenuItem value={"Female"}>Female</MenuItem>
                                <MenuItem value={"Other"}>Other</MenuItem>
                        </Select>
                    </FormControl><br/><br/>
                    <Button type="submit" style={{color: "white", backgroundColor: "green"}}>Save changews</Button>
                </label> 
            </form>
        )
    }
}
