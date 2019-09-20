import React from 'react';
import RecipeList from './ReсipeList/RecipeList'
import RecipePage from './RecipePage/RecipePage'
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={RecipeList}/>
        <Route path='/list/:id' component={RecipePage}/>
      </Switch>
    </div>
  );
}

export default App;
