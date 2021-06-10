export default function reducer(state = [], action) {
    switch(action.type){
        case "addNewTag":
            return [...state, action.payload.newTag];
        case "deletedChip":
            return action.payload.newArray;
        default :
            return state;
    }
}