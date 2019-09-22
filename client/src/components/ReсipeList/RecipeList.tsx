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
import './RecipeList.scss'
import { Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

interface IRecipeListProps {
    recipes: TRecipe[];
    sendRequest: () => void;
}

const RecipeList = ({ recipes, sendRequest }: IRecipeListProps) => {
    if (!recipes) {
        sendRequest();
    }

    return (recipes ? <div className='main'>
        <NavLink to='/create'><Button className='create-btn'>Create recipe</Button></NavLink>
        <div className='recipe-list'>
        {recipes.map(item => <NavLink to={`/list/${item.id}`} key={item.id}><RecipeListItem recipe={item} /></NavLink>)}
        </div>
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