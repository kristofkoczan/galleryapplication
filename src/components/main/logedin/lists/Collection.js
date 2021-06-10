import React, {useState} from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import store from './../../../../store';
import { useSelector } from 'react-redux';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Focus from './Focus';
import Uploadpicture from './Uploadpicture';
import PICTURES from './../../../../database/PICTURES.json'

export default function Gridlist(props) {
    const [focus, setFocus] = useState(false)
    props.collectionArray.map(pict => PICTURES.includes(pict) ? '' :  props.collectionArray.splice(props.collectionArray.indexOf(pict), 1));
    const gridlistHelp = useSelector(state => state.collectionHelp)
    let sum = 0;
    let arrayOfPictures = [];
    let widthHelp = (window.innerWidth >= 1100 ? 6 : (window.innerWidth >= 720 ? 4 : 2));

    for(let i = props.collectionArray.length-1; i>=0; i--){
        sum += (props.collectionArray[i].vertical ? 1 : 2);
        if( sum === widthHelp){
            (props.collectionArray[i].vertical ? arrayOfPictures.unshift(true) : arrayOfPictures.unshift(false));
            sum = 0;
        }else if(sum === (widthHelp+1)){
            arrayOfPictures.unshift(true);
            sum = 0;
        }else{
            (props.collectionArray[i].vertical ? arrayOfPictures.unshift(true) : arrayOfPictures.unshift(false));
        } 
    }
    console.log(gridlistHelp)

    arrayOfPictures.reverse();
    if(gridlistHelp.length !== props.collectionArray.length){
        store.dispatch({
            type: "collectionHelper",
            payload: {
                collectionArray: arrayOfPictures,
            }
        })
    }


    const handleSetFocus = param => {
        setFocus(param)
    }
    

    if(!focus){
        return (
            <div>
                <Uploadpicture setPictures={props.setPictures} pictures={props.pictures}/><br/>
                <div className="gridListHolder">
                    <GridList cellHeight={widthHelp === 2 ? 200 : ( widthHelp === 4 ? 300 : (widthHelp === 6 ? 375 : (widthHelp === 4 ? 300 : 250)))} cols={widthHelp} >
                        {props.collectionArray.slice(0).reverse().map((pict) => (
                        <GridListTile key={pict.src} cols={pict.vertical ? 1 : (gridlistHelp[props.collectionArray.length - props.collectionArray.indexOf(pict)-1] ? 1 : 2)}>
                            <div className="gridPictHolder">
                                <img src={pict.src} alt={pict.name} className={pict.vertical ? "horizontPict small-zoom clickable" : (gridlistHelp[props.collectionArray.length - props.collectionArray.indexOf(pict)-1] ? "horizontPictChanged small-zoom clickable" : "verticalPict small-zoom clickable")} onClick={() => handleSetFocus(pict)}/>
                            </div>
                            <GridListTileBar
                            title={pict.name}
                            subtitle={<span>by: {pict.author}</span>}
                            />
                        </GridListTile>
                        ))}
                    </GridList>
                </div>
            </div>
        )
    }else{
        return (
            <Focus picture={focus} list={props.collectionArray} setFocus={setFocus}/>
        )
    }
    
}
