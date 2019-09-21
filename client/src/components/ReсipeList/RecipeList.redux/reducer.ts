import { SET_RECIPES, SET_NEW_RECIPE, SET_RECIPE_FOR_EDIT } from './actionTypes'

const initialState:{
    recipes:any;
    recipeInEdit:any
} = {
    recipes: null,
    recipeInEdit:null
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
                    recipes: [action.payload,...state.recipes]
                }
            }
        }
        case SET_RECIPE_FOR_EDIT:{
            return{
                ...state,
                recipeInEdit:action.payload
            }
        }
        default:
            return state
    }
}