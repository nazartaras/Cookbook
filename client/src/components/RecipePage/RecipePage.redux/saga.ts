import { all, call, put, takeEvery } from 'redux-saga/effects';
import { FETCH_RECIPE_BY_ID, SET_SELECTED_RECIPE } from './actionTypes'
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

function* watchFetchRecipeById(){
    yield takeEvery(FETCH_RECIPE_BY_ID, fetchRecipeById);
}

export default function* recipePage(){
    yield all([watchFetchRecipeById()])
}