import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import { useSelector } from 'react-redux';
import store from './../../../../store';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

export default function ChipsHandler() {
    const [newTag, setNewtag] = useState('');
    const chips = useSelector(state => state.chips)

    const handleChange = event => {
        setNewtag(event.target.value)
        let array = newTag.split('');
        if((array[array.length-1] === ',' && array.length > 0 )){
            let newTagAdd = newTag.substring(0, array.length-1);
            if(newTagAdd.split('').length > 0){
                if(!chips.includes(newTagAdd)){
                    store.dispatch({
                        type: "addNewTag",
                        payload: {
                            newTag: newTagAdd = newTag.substring(0, array.length-1),
                        }
                    })
                }
            }
            setNewtag('')
        }
    }

    const handleAdd = event => {
        event.preventDefault();
        let array = newTag.split('');
        if((array[array.length-1] === ',' || array[array.length-1] === ' ' || array[array.length-1] === '.') && array.length > 0){
            let newTagAdd = newTag.substring(0, array.length-1);
            if(newTagAdd.split('').length > 0){
                if(!chips.includes(newTagAdd)){
                    store.dispatch({
                        type: "addNewTag",
                        payload: {
                            newTag: newTagAdd,
                        }
                    })
                }
            }
        }else{
            if(!chips.includes(newTag)){
                store.dispatch({
                    type: "addNewTag",
                    payload: {
                        newTag: newTag,
                    }
                })
            }
        }
        setNewtag('')
    }

    const handleDelete = (chipToDelete) => () => {
        let newArray = chips.filter((chip) => chip !== chipToDelete);
        store.dispatch({
            type: "deletedChip",
            payload: {
                newArray: newArray,
            }
        })
    };

    return (
        <div>
            <br/>
            <Paper>
                {chips.map((data) => {
                    return (
                        <Chip
                        label={data}
                        onDelete={handleDelete(data)}
                        className="chips"
                        />
                    );
                })}
            </Paper><br/>
            <form onSubmit={handleAdd}>
                <TextField id="outlined-basic" label="new tag" variant="outlined" value={newTag} onChange={handleChange}/>
                <div className="hidden">
                    <Button type="submit" onClick={handleAdd} className="hidden">Submit</Button>
                </div>
            </form>
            
        </div>
    )
}
