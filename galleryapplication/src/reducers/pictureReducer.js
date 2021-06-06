import PICTURES from './../database/PICTURES.json'

export default function reducer(state = PICTURES, action) {
    switch(action.type){
        case "addPicture":
            return [...state, action.payload.newPicture];
        default :
            return state;
    }
}