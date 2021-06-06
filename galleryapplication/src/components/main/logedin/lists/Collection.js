import React from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import store from './../../../../store';
import { useSelector } from 'react-redux';
import StarBorderIcon from '@material-ui/icons/StarBorder';

export default function Gridlist(props) {
    const gridlistHelp = useSelector(state => state.collectionHelp)
    let sum = 0;
    let arrayOfPictures = [];
    for(let i = props.collectionArray.length-1; i>=0; i--){
        sum += (props.collectionArray[i].vertical ? 1 : 2);
        if(sum === 7){
            arrayOfPictures.unshift(true);
            sum = 0;
        }else if( sum === 6){
            (props.collectionArray[i].vertical ? arrayOfPictures.unshift(true) : arrayOfPictures.unshift(false));
            sum = 0;
        }else{
            (props.collectionArray[i].vertical ? arrayOfPictures.unshift(true) : arrayOfPictures.unshift(false));
        } 
    }
    arrayOfPictures.reverse();
    if(gridlistHelp.length !== props.collectionArray.length){
        store.dispatch({
            type: "collectionHelper",
            payload: {
                collectionArray: arrayOfPictures,
            }
        })
    }

    


    return (
        <div className="gridListHolder">
            <GridList cellHeight={375} cols={6} >
                {props.collectionArray.slice(0).reverse().map((pict) => (
                <GridListTile key={pict.src} cols={pict.vertical ? 1 : (gridlistHelp[pict.id] ? 1 : 2)}>
                    <div className="gridPictHolder">
                        <img src={pict.src} alt={pict.name} className={pict.vertical ? "horizontPict small-zoom" : (gridlistHelp[pict.id] ? "horizontPictChanged small-zoom" : "verticalPict small-zoom")}/>
                    </div>
                    <GridListTileBar
                    title={pict.name}
                    subtitle={<span>by: {pict.author}</span>}
                    actionIcon={
                        <IconButton>
                            <StarBorderIcon className="icon"/>
                        </IconButton>
                    }
                    />
                </GridListTile>
                ))}
            </GridList>
        </div>
    )
}
