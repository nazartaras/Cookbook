import React from 'react';
import { TRecipe } from '../Recipe'
import './RecipeListItem.scss'
import { Button } from 'semantic-ui-react'
import Moment from 'react-moment';
import { NavLink } from 'react-router-dom';
import {
    faCalendarAlt
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import config from '../../../config'

interface IRecipeListItemProps {
    recipe: TRecipe;
}

const RecipeListItem = ({ recipe }: IRecipeListItemProps) => {
    return <div className='recipe-list-item'>
        <img className='recipe-list-item-image' src={recipe.image_url?recipe.image_url:config.DEFAULT_RECIPE} />
        <div className='recipe-list-item-info'>
            <div className='recipe-list-item-title'>{recipe.title}</div>
            <div className='recipe-list-item-date'>
                <FontAwesomeIcon
                    icon={faCalendarAlt}
                    className="fontAwesomeIcon"
                />
                <Moment format=" D.MM.YYYY" local={true}>{recipe.updated_at}</Moment>
            </div>
            <div className='recipe-list-item-description'>{recipe.description}</div>

        </div>
        <NavLink className='edit-btn' to={{
            pathname: `/create/${recipe.id}`,
            state: {
                recipe: recipe,
                isEdit: true
            }
        }}>
            <Button secondary content='Edit' />
        </NavLink>
    </div>
}

export default RecipeListItem;