function reducer(state = [], action) {
    switch(action.type){
        case "logedIn":
            return [
                ...state,{
                    user: action.payload.user,
                }
            ];
        case "logedOut":
            return state;
        default :
            return state;
    }
}