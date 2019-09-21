import { combineReducers } from 'redux';
import recipeListReducer from '../components/ReсipeList/RecipeList.redux/reducer'
import recipePageReducer from '../components/RecipePage/RecipePage.redux/reducer'

const reducers ={};

const rootReducer = combineReducers({
    ...reducers,
    recipeList: recipeListReducer,
    recipePage: recipePageReducer
});

export default rootReducer;