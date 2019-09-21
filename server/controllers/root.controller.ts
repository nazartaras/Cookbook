import recipeRoutes from './recipe.controller'
import imageRoutes from './image.controller'

export default app => {
    app.use('/api/recipe', recipeRoutes);
    app.use('/api/image', imageRoutes)
};