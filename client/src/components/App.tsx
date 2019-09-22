import React from 'react';
import RecipeList from './ReсipeList/RecipeList'
import RecipePage from './RecipePage/RecipePage'
import { Switch, Route } from 'react-router-dom';
import RecipeEditor from './RecipeEditor/RecipeEditor';
import Header from './Header/Header'
import './App.scss'

function App() {
  return (
    <div className="root">
      <Header />
      <Switch>
        <Route exact path='/' component={RecipeList} />
        <Route path='/list/:id' component={RecipePage} />
        <Route path='/history/:id' component={RecipePage}/>
        <Route exact path='/create' component={RecipeEditor} />
        <Route path='/create/:id' component={RecipeEditor} />
      </Switch>
    </div>
  );
}

export default App;
