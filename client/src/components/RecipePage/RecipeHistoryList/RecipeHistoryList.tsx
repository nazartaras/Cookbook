import React from 'react';
import RecipeHistoryListItem from './RecipeHistoryListItem/RecipeHistoryListItem';
import './RecipeHistoryList.scss'

interface RecipeHistoryListProps {
    history: any;
}

const RecipeHistoryList = (props: RecipeHistoryListProps) => {
    return <div className='recipe-history'>
        <div className='recipe-history-header'>{props.history.length>0?"Previous recipe versions":"No previous recipe versions"}</div>
        {props.history.length>0?
        <div className='recipe-history-list'>  
        {props.history.map(item => <RecipeHistoryListItem recipe_history={item} key={item.id} />)}
        </div>:null
    }
    </div>
}

export default RecipeHistoryList;