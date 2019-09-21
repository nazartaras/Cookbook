import { FETCH_RECIPE_BY_ID } from './actionTypes'

export const fetchRecipeById = (id) => {
    return {
        type:FETCH_RECIPE_BY_ID,
        payload: id
    }
}