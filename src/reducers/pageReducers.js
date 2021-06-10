export default function reducer(state = "home", action) {
    switch(action.type){
        case "pageChange":
            return action.payload.page;
        default :
            return state;
    }
}