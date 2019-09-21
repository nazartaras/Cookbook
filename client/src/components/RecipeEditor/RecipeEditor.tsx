import React from 'react'
import ImageUploader from '../ImageUploader/ImageUploader'
import { addRecipe, updateRecipe, fetchRecipeForEdit } from '../ReсipeList/RecipeList.redux/actions'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { uploadFile } from '../../service/file.service'
import { Input, Button, Image, TextArea, Form } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import './RecipeEditor.scss'
import { NavLink } from 'react-router-dom';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import {
    faCheckCircle,
    faTimesCircle
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IRecipeEditorProps {
    addRecipe: (recipe: any) => void;
    updateRecipe: (recipe: any) => void;
    fetchRecipeForEdit:(id:string) => void;
    match:any;
    isEdit?: boolean;
    recipeInEdit:any;
}

interface IRecipeEditorState {
    recipe: {
        descriptionValue: string;
        titleValue: string;
        imageUrl: string;
    },
    croppedSaved: boolean
}



class RecipeEditor extends React.Component<IRecipeEditorProps, IRecipeEditorState>{
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
            recipe: {
                descriptionValue: this.props.recipeInEdit?this.props.recipeInEdit.description:'',
                titleValue: this.props.recipeInEdit?this.props.recipeInEdit.title:'',
                imageUrl: this.props.recipeInEdit?this.props.recipeInEdit.image_url:''
            },
            croppedSaved: this.props.recipeInEdit?true:false
        }
        this.saveImage = this.saveImage.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    private cropper = React.createRef<Cropper>();

    componentDidMount() {
        if (this.props.match.params.id) {
            this.props.fetchRecipeForEdit(this.props.match.params.id)
        }
    }

    saveImage = (url) => {
        this.setState({
            ...this.state,
            recipe: {
                ...this.state.recipe,
                imageUrl: url
            }
        })
    }

    onDescriptionChange = (e) => {
        this.setState({
            ...this.state,
            recipe: {
                ...this.state.recipe,
                descriptionValue: e.target.value
            }
        })
    }

    onCancel() {
        this.setState({
            ...this.state,
            recipe: {
                ...this.state.recipe,
                imageUrl: ''
            }
        })
    }

    onSave() {
        if (this.cropper.current) {
            this.cropper.current.getCroppedCanvas().toBlob(
                blob => {
                    const data = new FormData();
                    data.append('file', blob);
                    uploadFile(data)
                        .then(({ imageUrl }) => {
                            this.setState({
                                ...this.state,
                                recipe: {
                                    ...this.state.recipe,
                                    imageUrl: imageUrl
                                },
                                croppedSaved: true
                            })
                        })
                        .catch(error => {
                            console.log(error);
                        });
                },
                'image/jpeg'
            );
        }
    }

    onTitleChange = (e) => {
        this.setState({
            ...this.state,
            recipe: {
                ...this.state.recipe,
                titleValue: e.target.value
            }
        })
    }

    render() {
        const { descriptionValue, titleValue, imageUrl } = this.state.recipe;
        return <div className='recipe-creator'>
            {
                imageUrl && this.state.croppedSaved && <Image className='image-preview' src={imageUrl} />
            }
            {
                imageUrl && !this.state.croppedSaved && (<Cropper ref={this.cropper}
                    aspectRatio={1.77 / 1}
                    className="postconstr-img"
                    src={imageUrl} />)
            }
            {
                imageUrl && !this.state.croppedSaved && (<span onClick={this.onSave}>
                    <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="fontAwesomeIcon"
                    />
                </span>)
            }
            {
                imageUrl && !this.state.croppedSaved && (<span onClick={this.onCancel}>
                    <FontAwesomeIcon
                        icon={faTimesCircle}
                        className={'fontAwesomeIcon'}
                    />
                </span>)
            }

            <div className='image-upload'>
                <ImageUploader imageHandler={uploadFile} imageStateHandler={this.saveImage} isIcon={true} />
            </div>
            <Input value={titleValue} className='creator-input' onChange={this.onTitleChange} placeholder='Enter title' />
            <Form className='creator-textarea'>
                <TextArea value={descriptionValue} onChange={this.onDescriptionChange} placeholder='Enter description' />
            </Form>
            <div className='btn-block'>
                <NavLink to='/'> <Button primary content='Save' disabled={this.state.recipe.descriptionValue && this.state.recipe.titleValue ? false : true} onClick={() => {
                    if (!this.props.match.params.id) {
                        const newRecipe = RecipeEditor.convertToServer(this.state.recipe);
                        this.props.addRecipe(newRecipe);
                    }
                    if (this.props.match.params.id&&this.props.recipeInEdit) {
                        let newRecipe = this.props.recipeInEdit;
                        newRecipe.title = titleValue;
                        newRecipe.description = descriptionValue;
                        newRecipe.image_url = imageUrl;
                        this.props.updateRecipe(newRecipe);
                    }
                }} /></NavLink>
                <NavLink to='/'><Button content='Cancel' basic color='red' /></NavLink>
            </div>
        </div>
    }
}

const mapStateToProps = (rootState, props) => ({
    recipeInEdit: rootState.recipeList.recipeInEdit
});

const actions = {
    addRecipe,
    updateRecipe,
    fetchRecipeForEdit
}

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RecipeEditor);