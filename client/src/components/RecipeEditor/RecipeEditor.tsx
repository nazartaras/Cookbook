import React from 'react'
import ImageUploader from '../ImageUploader/ImageUploader'
import { addRecipe } from '../ReсipeList/RecipeList.redux/actions'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { uploadFile } from '../../service/file.service'

interface IRecipeEditorProps {
    addRecipe: (recipe: any) => void;
}



class RecipeEditor extends React.Component<IRecipeEditorProps, {}>{
    private static convertToServer = (recipe) => {
        const convertedRecipe = {
            title: recipe.titleValue,
            description: recipe.descriptionValue,
            image_url: recipe.imageUrl
        }
        return convertedRecipe;
    }
    constructor(props) {
        super(props);
        this.state = {
            descriptionValue: '',
            titleValue: '',
            imageUrl: ''
        }
        this.saveImage = this.saveImage.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onTitleChange = this.onTitleChange.bind(this);
    }

    saveImage = (url) => {
        this.setState({
            ...this.state,
            imageUrl: url
        })
    }

    onDescriptionChange = (e) => {
        this.setState({
            ...this.state,
            descriptionValue: e.target.value
        })
    }

    onTitleChange = (e) => {
        this.setState({
            ...this.state,
            titleValue: e.target.value
        })
    }

    render() {
        return <div>
            <ImageUploader imageHandler={uploadFile} imageStateHandler={this.saveImage} isIcon={true} />
            <input onChange={this.onTitleChange} placeholder='title' />
            <input onChange={this.onDescriptionChange} placeholder='description' />
            <button onClick={() => {
                const recipe = RecipeEditor.convertToServer(this.state);
                this.props.addRecipe(recipe);
            }} >Save</button>
        </div>
    }
}

const mapStateToProps = (rootState, props) => ({
});

const actions = {
    addRecipe
}

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RecipeEditor);