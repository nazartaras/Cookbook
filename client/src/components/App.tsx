import React from 'react';
import RecipeList from './ReсipeList/RecipeList'
import RecipePage from './RecipePage/RecipePage'
import { Switch, Route } from 'react-router-dom';
import RecipeEditor from './RecipeEditor/RecipeEditor';

function App() {
  return (
    <div className="root">
      <Switch>
        <Route exact path='/' component={RecipeList}/>
        <Route path='/list/:id' component={RecipePage}/>
        <Route exact path='/create' component={RecipeEditor}/>
      </Switch>
    </div>
  );
}

export default App;
