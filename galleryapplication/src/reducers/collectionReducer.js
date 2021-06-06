export default function reducer(state = [], action) {
    switch(action.type){
        case "collectionHelper":
            return action.payload.collectionArray;
        default :
            return state;
    }
}