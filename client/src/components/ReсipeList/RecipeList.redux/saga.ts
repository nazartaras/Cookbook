import { all, call, put, takeEvery } from 'redux-saga/effects';
import { FETCH_RECIPE, SET_RECIPES, ADD_NEW_RECIPE, SET_NEW_RECIPE } from './actionTypes'
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
            type:SET_NEW_RECIPE,
            payload: action.payload
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

export default function* recipePage() {
    yield all([
        watchSendRequest(),
        watchCreateRecipe()
    ]);
}