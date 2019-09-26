import React from 'react'
import ImageUploader from '../ImageUploader/ImageUploader'
import { addRecipe, updateRecipe, fetchRecipeForEdit, showCropper, saveCropped } from '../ReсipeList/RecipeList.redux/actions'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { uploadFile } from '../../service/file.service'
import { Input, Button, Image, TextArea, Form, Label } from 'semantic-ui-react'
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
import Spinner from '../Spinner/Spinner';
import uuid from 'uuid';

interface IRecipeEditorProps {
    addRecipe: (recipe: any) => void;
    updateRecipe: (recipe: any) => void;
    fetchRecipeForEdit: (id: string) => void;
    saveCropped: () => void;
    showCropper: () => void;
    match: any;
    recipeInEdit: any;
    isSpinner: boolean;
    croppedSaved: boolean;
    redirectUrl: string;
    history: any;
}

interface IRecipeEditorState {
    recipe: {
        id?: string;
        descriptionValue: string;
        titleValue: string;
        imageUrl: string;
    }
}



class RecipeEditor extends React.Component<IRecipeEditorProps, IRecipeEditorState>{
    private static convertToServer = (recipe) => {
        const convertedRecipe = {
            id: uuid.v4(),
            title: recipe.titleValue.trim(),
            description: recipe.descriptionValue.trim(),
            image_url: recipe.imageUrl
        }
        return convertedRecipe;
    }

    private cropper = React.createRef<Cropper>();

    constructor(props) {
        super(props);
        this.state = {
            recipe: {
                descriptionValue: '',
                titleValue: '',
                imageUrl: ''
            }
        }
        this.saveImage = this.saveImage.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onSaveRecipe = this.onSaveRecipe.bind(this);
    }



    componentDidMount() {
        if (this.props.match.params.id) {
            this.props.fetchRecipeForEdit(this.props.match.params.id)
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.recipeInEdit && nextProps.recipeInEdit.id !== prevState.recipe.id && nextProps.match.params.id) {
            return {
                recipe: {
                    id: nextProps.recipeInEdit.id,
                    descriptionValue: nextProps.recipeInEdit.description,
                    titleValue: nextProps.recipeInEdit.title,
                    imageUrl: nextProps.recipeInEdit.image_url
                },
                croppedSaved: true
            };
        } else {
            return null;
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
                                    imageUrl
                                }
                            });
                            this.props.saveCropped();
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

    onSaveRecipe = () => {
        if (!this.props.match.params.id) {
            const newRecipe = RecipeEditor.convertToServer(this.state.recipe);
            this.props.addRecipe(newRecipe);
        }
        if (this.props.match.params.id && this.props.recipeInEdit) {
            const newRecipe = this.props.recipeInEdit;
            newRecipe.title = this.state.recipe.titleValue.trim();
            newRecipe.description = this.state.recipe.descriptionValue.trim();
            newRecipe.image_url = this.state.recipe.imageUrl;
            this.props.updateRecipe(newRecipe);
        }
        this.props.history.goBack();
    }

    render() {
        const { descriptionValue, titleValue, imageUrl } = this.state.recipe;
        return (this.props.isSpinner ? <Spinner /> : (<div className='recipe-creator'>
            {
                imageUrl && this.props.croppedSaved && <Image className='image-preview' src={imageUrl} />
            }
            {
                imageUrl && !this.props.croppedSaved && (<Cropper ref={this.cropper}
                    aspectRatio={1.77 / 1}
                    className="postconstr-img"
                    src={imageUrl} />)
            }
            {
                imageUrl && !this.props.croppedSaved && (
                    <div className='cropper-btn'><span onClick={this.onSave}>
                        <FontAwesomeIcon
                            icon={faCheckCircle}
                            className="fontAwesomeIcon"
                        />
                    </span>
                        <span onClick={this.onCancel}>
                            <FontAwesomeIcon
                                icon={faTimesCircle}
                                className={'fontAwesomeIcon'}
                            />
                        </span>
                    </div>)
            }

            <div className='image-upload'>
                <ImageUploader showCropper={this.props.showCropper} imageHandler={uploadFile}
                    imageStateHandler={this.saveImage} isIcon={true} />
            </div>
            <Form>
                <Form.Field>
                    {this.props.match.params.id && this.props.recipeInEdit ?
                        <Label className="label" pointing='below'>Update title</Label> :
                        null}
                    <Input value={titleValue} maxLength='32' className='creator-input' onChange={this.onTitleChange} placeholder='Enter title' />
                </Form.Field>
                <Form.Field>
                    {this.props.match.params.id && this.props.recipeInEdit ?
                        <Label className="label" pointing='below'>Update description</Label> :
                        null}
                    <TextArea value={descriptionValue} onChange={this.onDescriptionChange} placeholder='Enter description' />
                </Form.Field>
            </Form>
            <div className='btn-block'>
                <Button primary content='Save'
                    disabled={this.state.recipe.descriptionValue.trim() && this.state.recipe.titleValue.trim() ? false : true}
                    onClick={this.onSaveRecipe} />
                <Button content='Cancel' basic color='red' onClick={this.props.history.goBack} />
            </div>
        </div>))
    }
}

const mapStateToProps = (rootState, props) => ({
    recipeInEdit: rootState.recipeList.recipeInEdit,
    isSpinner: rootState.recipeList.isSpinner,
    croppedSaved: rootState.recipeList.croppedSaved
});

const actions = {
    addRecipe,
    updateRecipe,
    fetchRecipeForEdit,
    saveCropped,
    showCropper
}

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RecipeEditor);