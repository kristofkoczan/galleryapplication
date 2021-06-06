import React, { useState } from 'react'
import Card from '@material-ui/core/Card';
import USERS from './../../../../database/USERS.json'
import Button from '@material-ui/core/Button';
import store from './../../../../store'
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import PICTURES from './../../../../database/PICTURES.json'


function EditDialog(props) {
  const { open, onClose, user } = props;
  const [newSex, setNewsex] = useState(user.sex || "other");

  const handleClose = () => {
    onClose();
  };
  const handleChange = (event) => {
    setNewsex(event.target.value);
  }

  const handleChangeSex = param => {
    if(param === "other"){
        param = undefined;
    } 
    user.sex = param;
    USERS.map(u => u.user === user.user ? u.sex = param : '');
    handleClose();
}

  return (
    <Dialog onClose={handleClose} open={open}>
        <div className="small-form">
            <IconButton>
                        <CloseIcon onClick={() => handleClose()}/>
            </IconButton>
            <div>

            <FormControl>
                <InputLabel>Your sex</InputLabel>
                <Select
                        value={newSex}
                        onChange={handleChange}
                    >
                    <MenuItem value={"male"}>Male</MenuItem>
                    <MenuItem value={"female"}>Female</MenuItem>
                    <MenuItem value={"other"}>Other</MenuItem>
                </Select><br/>
                <Button variant="contained" color="primary" onClick={() => handleChangeSex(newSex)}>Save</Button><br/>
            </FormControl>
            </div>
        </div>   
    </Dialog>
  );
}
EditDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
};




export default function Profile() {
    let user = {};
    let userLikes = 0;
    const [open, setOpen] = React.useState(false);

    const handleLogOut = () => {
        console.log("Oh... " + localStorage.getItem('username') + "... I thought we were friends!");
        localStorage.removeItem('username');
        store.dispatch({
            type: "logedOut",
        })
        store.dispatch({
            type: "pageChange",
            payload: {
                page: "home",
            }
        })
    }
    const handleEdit = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Card className="big-form center">
            {USERS.map(u => u.user === localStorage.getItem('username') ? (user = u, console.log("found you " + user.user)) : '')}
            <div className="title-size">Name: {user.user}</div>
            <div className="pictureHolder">
               {user.sex === undefined ? 
                    <img src="assets/images/serverImages/undefined.png" alt="profile" className="innerPicture small-zoom"/>
                    :
                    (user.sex === "male" ? <img src="assets/images/serverImages/male.png" alt="profile" className="innerPicture small-zoom"/> : 
                    <img src="assets/images/serverImages/female.png" alt="profile" className="innerPicture small-zoom"/>)
                }
            </div>
            <div className="mid-size">Sex: {user.sex === undefined ? "Unknown" : user.sex} 
                <IconButton>
                    <EditIcon onClick={() => handleEdit()}/>
                </IconButton>
                <EditDialog open={open} onClose={handleClose} user={user}/>
            </div>
            <div className="mid-size">First loged in {user.firstLogedIn}</div>
            <div className="mid-size">Pictures - {PICTURES.map(pict => pict.author === user.user ? userLikes+=1 : ''), userLikes}</div>
            <div className="mid-size">Likes - undefined</div>
            <Button variant="contained" color="primary" onClick={() => handleLogOut()}>Log out</Button><br/><br/>
        </Card>

    )
}


