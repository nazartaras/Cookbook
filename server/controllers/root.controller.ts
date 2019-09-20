import recipeRoutes from './recipe.controller'

export default app => {
    app.use('/api/recipe', recipeRoutes);
};