import React from 'react'
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import AppsIcon from '@material-ui/icons/Apps';
import QueueIcon from '@material-ui/icons/Queue';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import store from './../../store';


export default function Navbar() {
    const onClick = param => {
        store.dispatch({
            type: "pageChange",
            payload: {
                page: param,
            }
        })
    }


    return (
        <Card className="header">
            <IconButton color="primary" className="zoom" onClick={() => onClick("home")}>
                <AppsIcon />
            </IconButton>
            <IconButton color="primary" className="zoom" onClick={() => onClick("collection")}>
                <QueueIcon />
            </IconButton>
            <IconButton color="primary" className="zoom" onClick={() => onClick("profile")}>
                <AccountCircleIcon />
            </IconButton>
        </Card>
    )
}
