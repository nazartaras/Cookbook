import { all } from 'redux-saga/effects';
import recipeList from '../components/ReсipeList/RecipeList.redux/saga'


export default function* rootSaga() {
    yield all([recipeList()])
};