import { SET_RECIPES } from './actionTypes'

const initialState = {
    recipes: null
}

export default function(state=initialState, action){
    switch(action.type){
        case SET_RECIPES : {
            return {
                ...state,
                recipes: action.payload
            }
        }
        default:
            return state
    }
}