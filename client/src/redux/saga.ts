import { all } from 'redux-saga/effects';
import recipePage from '../components/RecipePage/saga'


export default function* rootSaga() {
    yield all([recipePage()])
};