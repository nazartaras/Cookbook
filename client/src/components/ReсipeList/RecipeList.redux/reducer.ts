import { SET_RECIPES, SET_NEW_RECIPE } from './actionTypes'

const initialState:{
    recipes:any;
} = {
    recipes: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_RECIPES: {
            return {
                ...state,
                recipes: action.payload
            }
        }
        case SET_NEW_RECIPE: {
            const recipes = state.recipes;
            if (!recipes) {
                return state;
            } else {
                return {
                    ...state,
                    recipes: [...state.recipes, action.payload]
                }
            }
        }
        default:
            return state
    }
}