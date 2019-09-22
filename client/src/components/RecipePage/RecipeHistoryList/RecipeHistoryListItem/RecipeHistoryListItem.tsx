import React from 'react'
import './RecipeHistoryListItem.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Moment from 'react-moment'
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import config from '../../../../config'

interface RecipeHistoryListItemProps {
    recipe_history: any;
}

const RecipeHistoryListItem = ({ recipe_history }: RecipeHistoryListItemProps) => {
    return <div className='recipe-list-history-item'>
        <img className='recipe-list-history-item-image' src={recipe_history.image_url?recipe_history.image_url:config.DEFAULT_RECIPE} />
        <div className='recipe-list-history-item-info'>
            <div className='recipe-list-history-item-title'>{recipe_history.title}</div>
            <div className='recipe-list-history-item-description'>{recipe_history.description}</div>
            <div>
                <FontAwesomeIcon
                    icon={faCalendarAlt}
                    className="fontAwesomeIcon"
                />
                <Moment format=" D.MM.YYYY HH:mm" local={true}>{recipe_history.updated_at}</Moment>
            </div>
        </div>
    </div>
}

export default RecipeHistoryListItem;