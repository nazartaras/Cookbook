import { Router } from "express";
import * as recipeService from '../services/recipe.service'

const router = Router();

router
    .get('/', (req, res, next) =>
        recipeService
            .getRecipes()
            .then(recipes => res.send(recipes))
            .catch(next))
    .get('/:id', (req, res, next) =>
        recipeService
            .getRecipeById(req.params.id)
            .then(recipes => res.send(recipes))
            .catch(next))
    .get('/history/:id', (req, res, next) =>
        recipeService
            .getHistoryRecipeById(req.params.id)
            .then(recipes => res.send(recipes))
            .catch(next))
    .post('/create', (req, res, next) =>
        recipeService
            .createRecipe(req.body)
            .then(recipes => res.send(recipes))
            .catch(next))
    .put('/update', (req, res, next) =>
        recipeService
            .updateRecipe(req.body)
            .then(recipes => res.send(recipes))
            .catch(next))

export default router;