import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';

import Profildatas from './Profildatas';
import Edituser from './Edituser';



export default function ProfilePage(props) {

    const [edit, setEdit] = React.useState(0);


    const handleLogout = () => {
        props.setUser('');
        console.log(localStorage.getItem('user') + ' is going to leave now. I thought we were friends...');
        localStorage.removeItem('user');
    }

    
    
        return (
            <div>
                <Card className="form">
                    <h2>{props.user}'s page</h2><br />
                    <Profildatas/>
                    <Edituser edit={edit} setEdit={setEdit}/>
                    <Button onClick={handleLogout}>Log Out</Button>
                </Card>
            </div>
        )

}
