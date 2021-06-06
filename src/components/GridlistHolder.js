import React, {useState} from 'react'
import PICTURES from '../database/PICTURES.json'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import IconButton from '@material-ui/core/IconButton';
import StarIcon from '@material-ui/icons/Star';
import { useSelector } from 'react-redux';
import Addchip from './Addchip';
import store from '../store'

export default function GridlistHolder(props) {
    const page = (state => state.header)
    const globalChips = useSelector(state => state.chip)
    const [like, setLike] = useState(0);
    const [chipData, setChipData] = React.useState(globalChips);
    var cols = []; 

    const handleLike = picture => {
        if(picture.likes.includes(localStorage.getItem('user'))){
            for(let i = 0; i< picture.likes.length; i++){
                if(picture.likes[i] === localStorage.getItem('user')){
                    picture.likes[i] = picture.likes[picture.likes.length];
                    picture.likes.pop();
                }
            }
            setLike(like+1);
        }else{
            picture.likes.push(localStorage.getItem('user'))
            setLike(like+1);
        }
    }

    const colsHandler = param => {
       /* var i = 0;
        var sum = 0;
        cols = [];
        if(page[0] === "Home"){
            for(i = 0; i < PICTURES.length; i++){
                sum+= PICTURES.slice(0).reverse()[i].cols;
                if(sum === param + 1){
                    cols.push(true);
                    sum = 0;
                }else if(sum === param){
                    PICTURES.slice(0).reverse()[i].cols === 1 ? cols.push(true) : cols.push(false);   
                    sum = 0;
                }else{
                    PICTURES.slice(0).reverse()[i].cols === 1 ? cols.push(true) : cols.push(false);        
                }
            }
            console.log(cols);
        }else if(page[0] === "Collection"){
            for(i = 0; i < PICTURES.length; i++){
                if(PICTURES.slice(0).reverse()[i].author === localStorage.getItem('user')){
                    sum+= PICTURES.slice(0).reverse()[i].cols;
                    if(sum === param+1){
                        cols.push(true);
                        sum = 0;
                    }else if(sum === param){
                        PICTURES.slice(0).reverse()[i].cols === 1 ? cols.push(true) : cols.push(false);   
                        sum = 0;
                    }else{
                        PICTURES.slice(0).reverse()[i].cols === 1 ? cols.push(true) : cols.push(false);        
                    }
                }else{
                    cols.push('');
                }
            }
            console.log(cols);
        }*/
    }

    const handleFocus = param =>{
        store.dispatch({
            type: "pageChanged",
            payload: {
                page: param[0],
                focus: param[1]
            }
        });
        console.log("Page changed to: " + param[1].name)
    }

    const chipSelected = param =>{
        let selected = false;
        if(globalChips.length === 0){
            return true;
        }else{
            let i = 0;
            for(i=0; i< param.tags.length; i++){
                globalChips.map(chip => chip.label.toUpperCase() === param.tags[i].toUpperCase() ? selected = true : '');
            }
            return selected;
        }


    }

    if(globalChips !== chipData){
        setChipData(globalChips)
    }
    if(page[0] === "Home"){
            return (
                <div>
                HI
            </div>
            )
        }else{
            return (
                <div>
                    HELLO
                </div>
            )
        }

    





    /*if(page[0] === "Home"){
        return (
            colsHandler(window.innerWidth > 1200 ? 6 : (window.innerWidth > 700 ? 4 : 2)),
            <div >
                <Addchip />
                <GridList cellHeight={400} cols={window.innerWidth > 1200 ? 6 : (window.innerWidth > 700 ? 4 : 2)}>
                    {PICTURES.slice(0).reverse().map((picture) => chipSelected(picture) ? (
                        <GridListTile key={picture.src} cols={cols.slice(0).reverse()[picture.id] === true ? (window.innerWidth > 700 ? 1 : 2) : 2} >
                             ({cols.slice(0).reverse()[picture.id] === true ?
                             <div>
                                <img src={picture.src} alt={picture.author} onClick={() => handleFocus(["Home", picture])} className="clickAble zoom containVertical"></img>  
                            </div> :
                            <div>
                                <img src={picture.src} alt={picture.author} onClick={() => handleFocus(["Home", picture])} className="clickAble zoom containHorizontal"></img>  
                            </div>})
                            

                            <GridListTileBar
                                title={picture.name || "picture"}
                                actionIcon={
                                     picture.author === localStorage.getItem('user')  ? '' : 
                                    <IconButton style={{color: "white"}}>
                                         {picture.likes.includes(localStorage.getItem('user')) ? <StarIcon onClick={() => handleLike(picture)}/> : <StarBorderIcon onClick={() => handleLike(picture)}  />}
                                    </IconButton> }
                                subtitle={"by: " + picture.author + " likes: " + picture.likes.length}
                            ></GridListTileBar>
                        </GridListTile>
                    ) : '')}
                </GridList>
            </div>
        )
    }else if(page[0] === "Collection"){
        colsHandler(window.innerWidth > 1200 ? 6 : (window.innerWidth > 700 ? 4 : 2));
        return (
            <div >
                <GridList cellHeight={400} cols={window.innerWidth > 1200 ? 6 : (window.innerWidth > 700 ? 4 : 2)} >
                    {PICTURES.slice(0).reverse().map((pict) => (
                        pict.author === localStorage.getItem('user') ? 
                        (<GridListTile key= {pict.src} cols={cols.slice(0).reverse()[pict.id] === true ? (window.innerWidth > 700 ? 1 : 2) : 2} >
                            {console.log(cols[pict.id-1])}
                             ({cols.slice(0).reverse()[pict.id]  === true ? 
                             <div>
                                 <img src={pict.src} alt={pict.author} className="clickAble zoom containVertical" onClick={() => handleFocus(['Collection', pict])} ></img>
                            </div> : 
                            <div>
                                <img src={pict.src} alt={pict.author} className="clickAble zoom containHorizontal" onClick={() => handleFocus(['Collection', pict])} ></img>
                            </div>})
                            
                            <GridListTileBar
                                title={pict.name || "picture"}
                                subtitle={" on " + pict.createdAt + " with " + pict.likes.length + " likes and " + pict.comments.length + " comment"}
                            ></GridListTileBar>
                        </GridListTile>) 
                        : ''
                    ))}
                </GridList>
            </div>
        )
    }*/
       
   


}
