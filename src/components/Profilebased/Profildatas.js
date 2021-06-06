import React, {useState} from 'react'
import USERS from '../../database/USERS.json'
import PICTURES from '../../database/PICTURES.json'

export default function Profildatas() {
    var currentUser = '';
    USERS.filter(u => u.user === localStorage.getItem('user') ? currentUser = u : '');
    var likes = 0;
    PICTURES.filter(p => p.author === localStorage.getItem('user') ? likes += p.likes.length : '');
    var pictures = 0;
    PICTURES.filter(p => p.author === localStorage.getItem('user') ? pictures += 1 : '');

    

    if(currentUser.sex === undefined){
        return (
            <div>
                <div className="loginPictHolder">
                    <img src="assets/images/user.png" alt="user" className="loginPict zoom"></img>
                </div>
                <div>
                    Likes: {likes}<br />
                    Pictures: {pictures}<br />
                </div>
            </div>
        )
    }else if(currentUser.sex === 'Male'){
        return (
            <div>
                <div className="loginPictHolder">
                    <img src="assets/images/user_male.jpg" alt="user" className="loginPict zoom"></img>
                </div>
                <div>
                    Likes: {likes}<br />
                    Pictures: {pictures}<br />
                </div>
            </div>
        )
    }else if(currentUser.sex === 'Female'){
        return (
            <div>
                <div className="loginPictHolder">
                    <img src="assets/images/user_female.jpg" alt="user" className="loginPict zoom"></img>
                </div>
                <div>
                    Likes: {likes}<br />
                    Pictures: {pictures}<br />
                </div>
            </div>

        )
    }
}
