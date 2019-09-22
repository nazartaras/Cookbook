import React from 'react';
import { fetchRecipeById, fetchHistoryRecipe } from './RecipePage.redux/actions'
import { bindActionCreators } from 'redux';
import Spinner from '../Spinner/Spinner';
import { connect } from 'react-redux';
import './RecipePage.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Moment from 'react-moment'
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import RecipeHistoryList from './RecipeHistoryList/RecipeHistoryList';
import config from '../../config'
import { NavLink } from 'react-router-dom';
import { Button } from 'semantic-ui-react';


interface IRecipePageProps {
    recipe: any;
    fetchRecipeById: (id: string) => void;
    fetchHistoryRecipe: (id: string) => void;
    match: any;
    location: any;
}

const RecipePage = (props: IRecipePageProps) => {
    const { recipe, fetchRecipeById, location, fetchHistoryRecipe } = props;
    const isHistory = location.pathname.split('/')[1] === 'history' ? true : false;
    const currentRecipeId = props.match.params.id;
    
    if (!recipe && !isHistory || !isHistory && recipe.id !== currentRecipeId) {
        fetchRecipeById(currentRecipeId);
        return <Spinner />
    }

    if (!recipe && isHistory || recipe.id !== currentRecipeId && isHistory) {
        fetchHistoryRecipe(currentRecipeId);
        return <Spinner />
    }

    return <div className='recipe-page'>
        <div className='recipe-page-current'>
            <img className='recipe-page-image' src={recipe.image_url ? recipe.image_url : config.DEFAULT_RECIPE} alt='recipe' />
            <div className='recipe-page-info'>
                <div className='recipe-page-title'>{recipe.title}</div>
                <div className='recipe-page-secondary'>
                    <div className='recipe-page-date'>
                        <FontAwesomeIcon
                            icon={faCalendarAlt}
                            className="fontAwesomeIcon"
                        />
                        <Moment format=" D.MM.YYYY" local={true}>{recipe.updated_at}</Moment>
                    </div>
                    {!isHistory ?
                        <NavLink className='edit-btn' to={{
                            pathname: `/create/${recipe.id}`,
                            state: {
                                recipe: recipe,
                                isEdit: true
                            }
                        }}>
                            <Button basic color='violet' content='Edit' />
                        </NavLink> : null
                    }
                </div>
                <div className='recipe-page-description'>{recipe.description}</div>
            </div>
        </div>
        {!isHistory ?
            <RecipeHistoryList history={recipe.recipe_history} /> : null
        }
    </div>
}

const mapStateToProps = (rootState, props) => ({
    recipe: rootState.recipePage.recipe
});

const actions = {
    fetchRecipeById,
    fetchHistoryRecipe
}

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RecipePage);