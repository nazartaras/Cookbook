import React from 'react';
import { TRecipe } from '../Recipe'

interface IRecipeListItemProps {
    recipe:TRecipe;
}

const RecipeListItem = ({recipe}:IRecipeListItemProps) => {
    return <div>
        <img src={recipe.image_url}/>
        <div>{recipe.title}</div>
        <div>{recipe.description}</div>
        <div>{recipe.created_at}</div>
    </div>
}

export default RecipeListItem;