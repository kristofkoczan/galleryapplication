import React, {useState} from 'react';
import Loginform from './Loginform';
import Navbar from './shared/Navbar';
import { useSelector } from 'react-redux';
import Profile from './main/logedin/profile/Profile';
import Gridlist from './main/logedin/lists/Gridlist';
import Collection from './main/logedin/lists/Collection';
import PICTURES from './../database/PICTURES.json';
import ChipsHandler from './main/logedin/lists/ChipsHandler';

export default function Main() {
    const page = useSelector(state => state.page)
    const login = useSelector(state => state.login)
    const [pictures, setPictures] = useState(PICTURES)
    let collectionArray = [];
    pictures.map(pict => pict.author === localStorage.getItem('username') ? collectionArray.push(pict) : '');


    if(login !== ""){
        switch(page){
            case "home": 
                return (
                    <div>
                        <Navbar />
                        <ChipsHandler />
                        <Gridlist />
                    </div>
                )
            case "collection":  
                return (
                    <div>
                        <Navbar />
                        <Collection collectionArray={collectionArray} setPictures={setPictures} pictures={pictures}/>
                    </div>
                )
            case "profile" : 
                return (
                    <div>
                        <Navbar />
                        <Profile />
                    </div>
                )
            default:    
                return (
                    <div>
                        <Navbar />
                        404 page not found
                    </div>
                )
        }
    }else{
        return (
            <div>
                <Loginform/>
            </div>
        )
    }
}
