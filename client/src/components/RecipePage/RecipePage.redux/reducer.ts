import { SET_SELECTED_RECIPE } from './actionTypes'
import { any } from 'prop-types'

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
        default:{
            return state;
        }
    }
}