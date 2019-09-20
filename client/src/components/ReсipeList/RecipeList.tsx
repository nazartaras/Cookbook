import React from 'react';
import { NavLink } from 'react-router-dom'
import {
    sendRequest
} from './RecipeList.redux/actions'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Spinner from '../Spinner/Spinner'
import { TRecipe } from './Recipe'
import RecipeListItem from './RecipeListItem/RecipeListItem'

interface IRecipeListProps {
    recipes: TRecipe[];
    sendRequest: () => void;
}

const RecipeList = ({ recipes, sendRequest }: IRecipeListProps) => {
    if (!recipes) {
        sendRequest();
    }
    return (recipes ? <div>
        <button>Create Recipe</button>
        {recipes.map(item=><RecipeListItem recipe={item} key={item.id}/>)}
    </div> : <Spinner />)
}

const mapStateToProps = (rootState, props) => ({
    recipes: rootState.recipeList.recipes
});

const actions = {
    sendRequest
}

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RecipeList);