import { all } from 'redux-saga/effects';
import recipeList from '../components/ReсipeList/RecipeList.redux/saga'
import recipePage from '../components/RecipePage/RecipePage.redux/saga'
    
export default function* rootSaga() {
    yield all([
        recipeList(),
        recipePage()
    ])
};