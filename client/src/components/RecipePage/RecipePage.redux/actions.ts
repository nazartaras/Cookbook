import { FETCH_RECIPE_BY_ID, FETCH_HISTORY_RECIPE_BY_ID } from './actionTypes'

export const fetchRecipeById = (id) => {
    return {
        type:FETCH_RECIPE_BY_ID,
        payload: id
    }
}

export const fetchHistoryRecipe = (id) =>{
    return {
        type:FETCH_HISTORY_RECIPE_BY_ID,
        payload: id
    }
}