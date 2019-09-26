import React from 'react'
import './RecipeHistoryListItem.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Moment from 'react-moment'
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import config from '../../../../config'

interface IRecipeHistoryListItemProps {
    recipe_history: any;
}

const RecipeHistoryListItem = ({ recipe_history }: IRecipeHistoryListItemProps) => {
    return <div className='recipe-list-history-item'>
        <img className='recipe-list-history-item-image' src={recipe_history.image_url?recipe_history.image_url:config.DEFAULT_RECIPE} alt='recipe'/>
        <div className='recipe-list-history-item-info'>
            <div className='recipe-list-history-item-title'>{recipe_history.title}</div>
            <div className='recipe-list-history-item-description'>{recipe_history.description}</div>
            <div className='recipe-list-history-item-date'>
                <FontAwesomeIcon
                    icon={faCalendarAlt}
                    className="fontAwesomeIcon"
                />
                <Moment format=" D.MM.YYYY HH:mm" local={true}>{recipe_history.real_time}</Moment>
            </div>
        </div>
    </div>
}

export default RecipeHistoryListItem;