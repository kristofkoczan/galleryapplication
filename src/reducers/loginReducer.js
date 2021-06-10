export default function reducer(state = "", action) {
    switch(action.type){
        case "logedIn":
            return action.payload.user;
        case "logedOut":
            return "";
        default :
            return state;
    }
}