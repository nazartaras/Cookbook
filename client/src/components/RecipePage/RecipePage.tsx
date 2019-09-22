import React from 'react';
import { fetchRecipeById } from './RecipePage.redux/actions'
import { bindActionCreators } from 'redux';
import Spinner from '../Spinner/Spinner';
import { connect } from 'react-redux';
import './RecipePage.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Moment from 'react-moment'
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import RecipeHistoryList from './RecipeHistoryList/RecipeHistoryList';
import config from '../../config'

interface IRecipePageProps {
    recipe: any;
    fetchRecipeById: (id: string) => void;
    match: any;
}

const RecipePage = (props: IRecipePageProps) => {
    const { recipe, fetchRecipeById } = props;
    const currentRecipeId = props.match.params.id;
    if (!recipe || recipe.id !== currentRecipeId) {
        fetchRecipeById(currentRecipeId);
        return <Spinner />
    }

    return <div className='recipe-page'>
        <div className='recipe-page-current'>
            <img className='recipe-page-image' src={recipe.image_url ? recipe.image_url : config.DEFAULT_RECIPE} />
            <div className='recipe-page-info'>
                <div className='recipe-page-title'>{recipe.title}</div>
                <div className='recipe-page-date'>
                    <FontAwesomeIcon
                        icon={faCalendarAlt}
                        className="fontAwesomeIcon"
                    />
                    <Moment format=" D.MM.YYYY" local={true}>{recipe.updated_at}</Moment>
                </div>
                <div className='recipe-page-description'>{recipe.description}</div>
            </div>
        </div>
        <RecipeHistoryList history={recipe.recipe_history} />
    </div>
}

const mapStateToProps = (rootState, props) => ({
    recipe: rootState.recipePage.recipe
});

const actions = {
    fetchRecipeById
}

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RecipePage);