import React, {useState} from 'react';
import PICTURES from './../../../../database/PICTURES.json'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import store from './../../../../store';
import { useSelector } from 'react-redux';
import Focus from './Focus';
import Rating from './Rating';
import ChipsHandler from './ChipsHandler';

export default function Gridlist(props) {
    const [focus, setFocus] = useState(false)
    const gridlistHelp = useSelector(state => state.listHelp)
    let sum = 0;
    let arrayOfPictures = [];
    let widthHelp = (window.innerWidth >= 1100 ? 6 : (window.innerWidth >= 720 ? 4 : 2));
    const chips = useSelector(state => state.chips)
    let pictureArray = PICTURES;
    if(chips.length > 0){
        pictureArray = [];
        for(let i = 0; i < chips.length; i++){
            PICTURES.map(pict => pict.tags.map(tag => tag === chips[i] && !pictureArray.includes(pict) ? pictureArray.push(pict) : ''));
        }
    }

    console.log("start")
    for(let i = pictureArray.length-1; i>=0; i--){
        sum += (pictureArray[i].vertical ? 1 : 2);
        if(sum === widthHelp){
            (pictureArray[i].vertical ? arrayOfPictures.unshift(true) : arrayOfPictures.unshift(false));
            console.log(sum, arrayOfPictures[0])
            sum = 0;
        }else if(sum === (widthHelp+1)){
            arrayOfPictures.unshift(true);
            console.log(sum, arrayOfPictures[0])
            sum = 0;
        }else{
            (pictureArray[i].vertical ? arrayOfPictures.unshift(true) : arrayOfPictures.unshift(false));
            console.log(sum, arrayOfPictures[0])
        } 
    }
    if(gridlistHelp.length !== arrayOfPictures.length){
        store.dispatch({
            type: "gridlistHelper",
            payload: {
                array: arrayOfPictures,
            }
        })
    }


    const handleSetFocus = param => {
        setFocus(param)
    }


    if(!focus){
        return (
            <div className="gridListHolder">
                <div className="center"> 
                    <ChipsHandler />
                </div>     
                <br/>
                <GridList cellHeight={widthHelp === 2 ? 200 : ( widthHelp === 4 ? 300 : (widthHelp === 6 ? 375 : (widthHelp === 4 ? 300 : 250)))} cols={widthHelp} >
                    {pictureArray.slice(0).reverse().map((pict) => (
                    <GridListTile key={pict.src} cols={pict.vertical ? 1 : (gridlistHelp[pictureArray.indexOf(pict)] ? 1 : 2)}>
                        <div className="gridPictHolder">
                            <img src={pict.src} alt={pict.name} className={pict.vertical ? "horizontPict small-zoom clickable" : (gridlistHelp[pictureArray.indexOf(pict)] ? "horizontPictChanged small-zoom clickable" : "verticalPict small-zoom clickable")} onClick={() => handleSetFocus(pict)}/>
                        </div>
                        <GridListTileBar
                        title={pict.name}
                        subtitle={<span>by: {pict.author}</span>}
                        actionIcon={
                            <Rating picture={pict}/>
                        }
                        />
                    </GridListTile>
                    ))}
                </GridList>
            </div>
        )
    }else{
        return (
            <Focus picture={focus} list={pictureArray} setFocus={setFocus}/>
        )
    }
}
