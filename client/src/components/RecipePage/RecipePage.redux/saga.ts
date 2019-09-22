import { all, call, put, takeEvery } from 'redux-saga/effects';
import { FETCH_RECIPE_BY_ID, SET_SELECTED_RECIPE, FETCH_HISTORY_RECIPE_BY_ID } from './actionTypes'
import axios from 'axios'

export function* fetchRecipeById(action) {
    try {
        const recipe = yield call(axios.get, `/api/recipe/${action.payload}`)
        yield put({
            type: SET_SELECTED_RECIPE,
            payload: recipe.data
        })
    } catch (e) {
        console.log(e);
    }
}

export function* fetchHistoryRecipeById(action) {
    try {
        const recipe = yield call(axios.get, `/api/recipe/history/${action.payload}`)
        yield put({
            type: SET_SELECTED_RECIPE,
            payload: recipe.data
        })
    } catch (e) {
        console.log(e);
    }
}

function* watchFetchRecipeById() {
    yield takeEvery(FETCH_RECIPE_BY_ID, fetchRecipeById);
}

function* watchFetchHistoryRecipeById() {
    yield takeEvery(FETCH_HISTORY_RECIPE_BY_ID, fetchHistoryRecipeById);
}

export default function* recipePage() {
    yield all([
        watchFetchRecipeById(),
        watchFetchHistoryRecipeById()
    ])
}