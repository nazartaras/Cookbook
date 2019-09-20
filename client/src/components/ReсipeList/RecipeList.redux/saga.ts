import { all, call, put, takeEvery } from 'redux-saga/effects';
import { FETCH_RECIPE, SET_RECIPES } from './actionTypes'
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

function* watchSendRequest() {
    yield takeEvery(FETCH_RECIPE, sendRequest);
}

export default function* recipePage() {
    yield all([watchSendRequest()]);
}