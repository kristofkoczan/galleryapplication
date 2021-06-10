export default function reducer(state = [], action) {
    switch(action.type){
        case "gridlistHelper":
            return action.payload.array;
        default :
            return state;
    }
}