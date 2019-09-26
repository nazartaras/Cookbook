import React from 'react';
import RecipeHistoryListItem from './RecipeHistoryListItem/RecipeHistoryListItem';
import './RecipeHistoryList.scss'
import { NavLink } from 'react-router-dom';

interface IRecipeHistoryListProps {
    history: any;
}   

const RecipeHistoryList = (props: IRecipeHistoryListProps) => {
    return <div className='recipe-history'>
        <div className='recipe-history-header'>{props.history.length > 0 ? "Previous recipe versions" : "No previous recipe versions"}</div>
        {props.history.length > 0 ?
            <div className='recipe-history-list'>
                {props.history.sort((a,b)=>{
                    return new Date(b.updated_at).valueOf()-new Date(a.updated_at).valueOf();
                }).map(item => <NavLink to={`/history/${item.id}`} key={item.id}>
                    <RecipeHistoryListItem recipe_history={item} />
                </NavLink>)}
            </div> : null
        }
    </div>
}

export default RecipeHistoryList;