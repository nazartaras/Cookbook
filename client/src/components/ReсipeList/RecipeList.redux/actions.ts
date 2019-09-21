import { FETCH_RECIPE, ADD_NEW_RECIPE } from './actionTypes'


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