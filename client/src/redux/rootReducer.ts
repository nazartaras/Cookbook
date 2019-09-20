import { combineReducers } from 'redux';
import recipeListReducer from '../components/ReсipeList/RecipeList.redux/reducer'

const reducers ={};

const rootReducer = combineReducers({
    ...reducers,
    recipeList: recipeListReducer
});

export default rootReducer;