import React, {useState} from 'react'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import PICTURES from './../../../../database/PICTURES.json';


function DeleteDialog(props) {
    const { onClose, open, picture, setFocus } = props;
    const handleClose = () => {
      onClose();
    };
    const handleDelete = () => {
        let index = PICTURES.indexOf(picture);
        PICTURES.splice(index, 1);
        onClose();
        setFocus(false);
    }
    return (
        <Dialog onClose={handleClose} open={open} className="small-dialog center">
            <div>
                <div className="mid-size title">Are you sure you want to delete this photo forever?</div><br/>
                <Button color="primary" variant="contained" onClick={handleDelete} className="button">Delete it!</Button><br/><br/>
                <Button color="secondary" variant="contained" onClick={handleClose} className="button">Back</Button><br/><br/>
            </div>
        </Dialog>
    );
}
DeleteDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};






function EditDialog(props) {
    const { onClose, open, picture, setFocus } = props;
    const [tags, setTags] = useState('');
    const [name, setName] = useState('');
    const handleClose = () => {
      onClose();
    };
    const handleTagsChange = event => {
        setTags(event.target.value);
    }
    const handleNameChange = event => {
        setName(event.target.value);
    }
    const handleSubmit = event => {
        event.preventDefault();
        if(name !== ''){
            PICTURES.map((pict) => pict === picture ? pict.name = name : '');
        }
        onClose();
    }
    return (
        <Dialog onClose={handleClose} open={open} className="small-dialog center">
            <form onSubmit={handleSubmit}>
                <div className="mid-size title">Write in the details you want to edit:</div><br/>
                <TextField id="standard-basic" label="Name" value={name} onChange={handleNameChange}/><br/><br/>
                <TextField id="standard-basic" label="Tags" value={tags} onChange={handleTagsChange}/><br/><br/>
                <Button color="primary" variant="contained" onClick={handleSubmit} type="submit" className="button">Submit changes!</Button><br/><br/>
                <Button color="secondary" variant="contained" onClick={handleClose} className="button">Back</Button><br/><br/>
            </form>
        </Dialog>
    );
}
EditDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};





function EditDialogComment(props) {
    const { onClose, open, picture, commentChosed } = props;
    const [newComment, setNewcomment] = useState('');
    const handleClose = () => {
      onClose();
    };
    const handleChange = event => {
        setNewcomment(event.target.value);
    }
    const handleSubmit = event => {
        event.preventDefault();
        if(newComment !== ''){
            PICTURES.map((pict) => pict === picture ? (pict.comments.map(com => com === commentChosed ? com.comment = newComment : '')) : '');
        }
        onClose();
    }
    return (
        <Dialog onClose={handleClose} open={open} className="small-dialog center">
            <form onSubmit={handleSubmit}>
                <div className="mid-size title">What's the new comment?</div><br/>
                <TextField id="standard-basic" label="new comment" value={newComment} onChange={handleChange}/><br/><br/>
                <Button color="primary" variant="contained" onClick={handleSubmit} type="submit" className="button">Submit changes!</Button><br/><br/>
                <Button color="secondary" variant="contained" onClick={handleClose} className="button">Back</Button><br/><br/>
            </form>
        </Dialog>
    );
}
EditDialogComment.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};





export default function Focus(props) {
    const [picture, setPicture] = useState(props.picture);
    const [newComment, setNewcomment] = useState('');
    const list = props.list;
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenedit] = useState(false);
    const [openEditComment, setOpeneditcomment] = useState(false);
    const [commentChosed, setCommentchosed] = useState('');
  
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClickOpenEdit = () => {
        setOpenedit(true);
    };
    const handleClickOpenEditComment = param => {
        setOpeneditcomment(true);
        setCommentchosed(param);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    const handleCloseEdit = () => {
        setOpenedit(false);
    };
    const handleCloseEditComment = () => {
        setOpeneditcomment(false);
    };
    const handleBack = () => {
        props.setFocus(false)
    }
    const handleLeft = () => {
        let index = list.indexOf(picture);
        if(index+1 !== list.length){
            setPicture(list[index+1]);  
        } 
    }
    const handleRight = () => {
        let index = list.indexOf(picture);
        if(index-1 >= 0){
            setPicture(list[index-1]);  
        } 
    }
    const handleNewCommentChange = event => {
        setNewcomment(event.target.value)
    }
    const handleCommentSubmit = event => {
        event.preventDefault();
        let date = new Date();
        picture.comments.push({
            author: localStorage.getItem('username'),
            comment: newComment,
            createdAt: JSON.stringify(date).slice(1, 11)
        })
        setNewcomment('')
    }

    return (
        <Card className="focusCard">
            <br/>
            <Button variant="contained" color="secondary" onClick={handleBack}>Back</Button><br/>

            <div className="focusDiv"> 
                    <div className="icondiv zoom">
                        <IconButton  color="primary" onClick={handleLeft} disabled={list.indexOf(picture)+1 < list.length ? false : true}>
                            <ChevronLeftIcon/>
                        </IconButton>
                    </div>

                    <div className={picture.vertical ? "focusVerticalHolder" : "focusHorizontalHolder"}>
                        <img src={picture.src} alt={picture.name} className={picture.vertical ? "focusVertical focusImg small-zoom" : "focusHorizontal focusImg small-zoom"}/>
                    </div>
                   
                    <div className="icondiv zoom">
                        <IconButton color="primary" onClick={handleRight} disabled={list.indexOf(picture)-1 >= 0 ? false : true} >
                            <ChevronRightIcon/>
                        </IconButton>
                    </div>
            </div><br/>
            <div>
                <b>{picture.name}</b> by: {picture.author} <br/>uploaded on {picture.createdAt}
                <IconButton color="primary" disabled={localStorage.getItem('username') === picture.author ? false : true} onClick={handleClickOpenEdit} >
                    <EditIcon/>
                </IconButton>
                <IconButton color="secondary" disabled={localStorage.getItem('username') === picture.author ? false : true} onClick={handleClickOpen}>
                    <DeleteForeverIcon/>
                </IconButton>
            </div><br/>
            {picture.comments.map(comment => 
            (<Card className="commentCard">
                <CardContent className="commentCardContent">
                    <Typography>{comment.author} {comment.author === localStorage.getItem('username') ? 
                    (<IconButton onClick={() => handleClickOpenEditComment(comment)} >
                    <EditIcon/>
                </IconButton>) : ''}</Typography>
                    {comment.comment}
                </CardContent> 
            </Card>)
            )}<br/>

            <form onSubmit={handleCommentSubmit}>
                <TextField  label="new comment" variant="outlined" value={newComment} className="newComment" onChange={handleNewCommentChange}/><br/><br/>
                <Button variant="contained" color="primary" type="submit">Submit</Button>
            </form><br/>
            <DeleteDialog open={open} onClose={handleClose} picture={picture} setFocus={props.setFocus}/>
            <EditDialog open={openEdit} onClose={handleCloseEdit} picture={picture}/>
            <EditDialogComment open={openEditComment} onClose={handleCloseEditComment} picture={picture} commentChosed={commentChosed}/>
        </Card>
    )
}
