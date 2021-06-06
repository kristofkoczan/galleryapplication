import React from 'react';
import PICTURES from './../../../../database/PICTURES.json'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import store from './../../../../store';
import { useSelector } from 'react-redux';
import StarBorderIcon from '@material-ui/icons/StarBorder';

export default function Gridlist() {
    const gridlistHelp = useSelector(state => state.listHelp)
    let sum = 0;
    let arrayOfPictures = [];
    let widthHelp = (window.innerWidth >= 1000 ? 6 : (window.innerWidth >= 720 ? 4 : 2));

    for(let i = PICTURES.length-1; i>=0; i--){
        sum += (PICTURES[i].vertical ? 1 : 2);
        if(sum === (widthHelp+1)){
            arrayOfPictures.unshift(true);
            sum = 0;
        }else if( sum === widthHelp){
            (PICTURES[i].vertical ? arrayOfPictures.unshift(true) : arrayOfPictures.unshift(false));
            sum = 0;
        }else{
            (PICTURES[i].vertical ? arrayOfPictures.unshift(true) : arrayOfPictures.unshift(false));
        } 
    }
    if(gridlistHelp.length !== PICTURES.length){
        store.dispatch({
            type: "gridlistHelper",
            payload: {
                array: arrayOfPictures,
            }
        })
    }



    return (
        <div className="gridListHolder">
            <GridList cellHeight={widthHelp === 6 ? 375 : (widthHelp === 4 ? 300 : 250)} cols={widthHelp} >
                {PICTURES.slice(0).reverse().map((pict) => (
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
