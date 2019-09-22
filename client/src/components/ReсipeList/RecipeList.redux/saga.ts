import { all, call, put, takeEvery } from 'redux-saga/effects';
import { FETCH_RECIPE, SET_RECIPES, ADD_NEW_RECIPE, SET_NEW_RECIPE, UPDATE_RECIPE, FETCH_RECIPE_FOR_EDIT, SET_RECIPE_FOR_EDIT, SHOW_SPINNER, HIDE_SPINNER, SAVE_CROPPED } from './actionTypes'
import axios from 'axios'

export function* sendRequest() {
    try {
        const recipes = yield call(axios.get, '/api/recipe')
        yield put({
            type: SET_RECIPES,
            payload: recipes.data
        })
    } catch (e) {
        console.log(e);
    }
}

export function* createRecipe(action) {
    try {
        yield call(axios.post, '/api/recipe/create', action.payload);
        yield put({
            type: SET_NEW_RECIPE,
            payload: action.payload
        })
    } catch (e) {
        console.log(e);
    }
}

export function* updateRecipe(action) {
    try {
        yield call(axios.put, '/api/recipe/update', action.payload);
        yield put({ type: FETCH_RECIPE })
    } catch (e) {
        console.log(e);
    }
}

export function* fetchRecipeForEdit(action) {
    try {
        yield put({
            type:SHOW_SPINNER
        })
        const recipe = yield call(axios.get, `/api/recipe/${action.payload}`)
        yield put({
            type:SET_RECIPE_FOR_EDIT,
            payload:recipe.data
        })
        yield put({
            type: SAVE_CROPPED
        })
        yield put({
            type:HIDE_SPINNER
        })
    } catch (e) {
        console.log(e);
    }
}

function* watchSendRequest() {
    yield takeEvery(FETCH_RECIPE, sendRequest);
}

function* watchCreateRecipe() {
    yield takeEvery(ADD_NEW_RECIPE, createRecipe);
}

function* watchUpdateRecipe() {
    yield takeEvery(UPDATE_RECIPE, updateRecipe);
}

function* watchFetchRecipeForEdit() {
    yield takeEvery(FETCH_RECIPE_FOR_EDIT, fetchRecipeForEdit);
}

export default function* recipeListPage() {
    yield all([
        watchSendRequest(),
        watchCreateRecipe(),
        watchUpdateRecipe(),
        watchFetchRecipeForEdit()
    ]);
}