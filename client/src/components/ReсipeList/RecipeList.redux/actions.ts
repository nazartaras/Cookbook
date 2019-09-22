import { FETCH_RECIPE, ADD_NEW_RECIPE, UPDATE_RECIPE, FETCH_RECIPE_FOR_EDIT, SHOW_CROPPER, SAVE_CROPPED } from './actionTypes'


export const sendRequest = () => {
    return {
        type: FETCH_RECIPE
    }
}

export const addRecipe = (recipe) => {
    return {
        type: ADD_NEW_RECIPE,
        payload: recipe
    }
}

export const updateRecipe = (recipe) => {
    return {
        type: UPDATE_RECIPE,
        payload: recipe
    }
}

export const fetchRecipeForEdit = (id) => {
    return {
        type: FETCH_RECIPE_FOR_EDIT,
        payload: id
    }
}

export const showCropper = () => {
    return {
        type: SHOW_CROPPER
    }
}

export const saveCropped = () => {
    return {
        type:SAVE_CROPPED
    }
}