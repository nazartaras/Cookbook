import React from 'react';
import { TRecipe } from '../Recipe'
import './RecipeListItem.scss'

interface IRecipeListItemProps {
    recipe:TRecipe;
}

const RecipeListItem = ({recipe}:IRecipeListItemProps) => {
    return <div className='recipe-list-item'>
        <img className='recipe-list-item-image' src={recipe.image_url}/>
        <div>{recipe.title}</div>
        <div>{recipe.description}</div>
        <div>{recipe.created_at}</div>
    </div>
}

export default RecipeListItem;