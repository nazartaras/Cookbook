import React from 'react';
import {
    sendRequest
} from './actions'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

interface IRecipePageProps {
    sendRequest: ()=>void;
}

class RecipePage extends React.Component<IRecipePageProps, {}> {
    componentDidMount(){
        this.props.sendRequest();
    }

    render(){
        return <div>
            HELLO
        </div>
    }
}

const mapStateToProps = () => ({
});

const actions = {
    sendRequest
}

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
) (RecipePage);