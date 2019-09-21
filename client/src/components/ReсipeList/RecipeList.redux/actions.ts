import { FETCH_RECIPE, ADD_NEW_RECIPE, UPDATE_RECIPE, FETCH_RECIPE_FOR_EDIT } from './actionTypes'


export const sendRequest = () => {
    return {
        type: FETCH_RECIPE
    }
}

export const addRecipe = (recipe)=>{
    return {
        type: ADD_NEW_RECIPE,
        payload: recipe
    }
}

export const updateRecipe = (recipe)=>{
    return {
        type: UPDATE_RECIPE,
        payload: recipe
    }
}

export const fetchRecipeForEdit = (id)=>{
    return {
        type:FETCH_RECIPE_FOR_EDIT,
        payload: id
    }
}