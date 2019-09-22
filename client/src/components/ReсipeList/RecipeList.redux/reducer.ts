import { SET_RECIPES, SET_NEW_RECIPE, SET_RECIPE_FOR_EDIT, SHOW_SPINNER, HIDE_SPINNER, SHOW_CROPPER, SAVE_CROPPED } from './actionTypes'

const initialState: {
    recipes: any;
    recipeInEdit: any;
    isSpinner: boolean;
    croppedSaved:boolean;
} = {
    recipes: null,
    recipeInEdit: null,
    isSpinner: false,
    croppedSaved:false
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
                    recipes: [action.payload, ...state.recipes]
                }
            }
        }
        case SET_RECIPE_FOR_EDIT: {
            return {
                ...state,
                recipeInEdit: action.payload
            }
        }
        case SHOW_SPINNER: {
            return {
                ...state,
                isSpinner: true
            }
        }
        case HIDE_SPINNER: {
            return {
                ...state,
                isSpinner: false
            }
        }
        case SHOW_CROPPER:{
            return{
                ...state,
                croppedSaved:false
            }
        }
        case SAVE_CROPPED:{
            return {
                ...state,
                croppedSaved:true
            }
        }
        default:
            return state
    }
}