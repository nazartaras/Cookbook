import { SET_SELECTED_RECIPE, NULL_SELECTED } from './actionTypes'

const initialState = {
    recipe:null
}

export default function (state = initialState, action) {
    switch(action.type){
        case SET_SELECTED_RECIPE:{
            return{
                recipe:action.payload
            }
        }
        case NULL_SELECTED:{
            return{
                recipe:null
            }
        }
        default:{
            return state;
        }
    }
}