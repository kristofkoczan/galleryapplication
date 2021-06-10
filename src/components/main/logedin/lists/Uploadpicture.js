import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import PICTURES from './../../../../database/PICTURES.json';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';


function SimpleDialog(props) {
  const { onClose, open } = props;
  let newPicture = '';
  const [raduiValue, setRaduivalue] = React.useState('vertical');
  const [newName, setNewname] = React.useState('picture name');
  const [newTags, setNewtags] = React.useState('');
  const [url, setUrl] = React.useState('');
  const [date, setDate  ] = React.useState('');
  const [filename, setFilename  ] = React.useState('');

  const readURL = file => {
      return new Promise((res, rej) => {
          const reader = new FileReader();
          reader.onload = e => {res(e.target.result)};
          reader.onerror = e => rej(e);
          reader.readAsDataURL(file);
      });
  };
  const preview = async event => {
      const url = readURL(event.target.files[event.target.files.length-1]);
      return await url;

  };
  //add picture
  const uploadPicture = async event => {
      setFilename(event.target.files[0].name)
      let url = await preview(event);
      let date = new Date();
      setUrl(url);
      setDate(date);
  }

  const handleRadioChange = (event) => {
    setRaduivalue(event.target.value);
  }
  const handleNameChange = event => {
    setNewname(event.target.value);
  }
  const handleNewTag = event => {
    setNewtags(event.target.value)
  }

  const handleClose = () => {
    onClose();
  };
  const handleSubmit = event => {
      event.preventDefault();
      let tags = newTags.split(/,| /);
      tags = tags.filter(tag => tag !== "");
      newPicture = {
        id: props.pictures.length+1,
        src: url,
        createdAt: JSON.stringify(date).slice(1, 11),
        author: localStorage.getItem('username'),
        name: newName,
        comments: [],
        rating: [],
        tags: tags,
        vertical: raduiValue === 'vertical' ? true : false
    }
      props.setPictures([...props.pictures, newPicture]);
      PICTURES.push(newPicture);
      onClose();
  }


  return (
    <Dialog onClose={handleClose} open={open}>
        <form onSubmit={handleSubmit} className="small-form">
            <IconButton onClick={handleClose}>
                <CancelPresentationIcon color="primary"/>
            </IconButton><br/>
            



              <label htmlFor="icon-button-file">
                <IconButton color="primary" aria-label="upload picture" component="span">
                  <AddAPhotoIcon/>
                </IconButton>
              </label><br/>

              <input accept="image/*" className="hidden" id="icon-button-file" type="file" onChange={uploadPicture} required/>{Array.from(filename).length >= 15 ? filename.substr(0, 14) + "..." : filename}<br/><br/>
            <TextField label="name" value={newName} onChange={handleNameChange}/><br/><br/>

            <FormControl>
              <FormLabel>Ratio</FormLabel>
              <RadioGroup aria-label="Ratio" name="Ratio" value={raduiValue} onChange={handleRadioChange} required>
                <FormControlLabel value="vertical" control={<Radio />} label="vertical" />
                <FormControlLabel value="horizontal" control={<Radio />} label="horizontal" />
              </RadioGroup>
            </FormControl><br/>

            <TextField label="new tag" value={newTags} onChange={handleNewTag}/>
            <br/><br/>

            <Button variant="contained" color="primary" type="submit">
                Submit
            </Button><br/><br/>
        </form>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default function Uploadpicture(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
        <br/>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Upload a new picture
      </Button>
      <SimpleDialog open={open} onClose={handleClose} pictures={props.pictures} setPictures={props.setPictures}/>
    </div>
  );
}