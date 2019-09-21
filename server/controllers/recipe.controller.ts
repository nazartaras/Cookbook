import { Request, Router } from "express";
import * as recipeService from '../services/recipe.service'

const router = Router();

router
    .get('/', (req, res, next) =>
        recipeService
            .getRecipes()
            .then(recipes => res.send(recipes))
            .catch(next))
    .post('/create', (req, res, next) =>
    recipeService
        .createRecipe(req.body)
        .then(recipes => res.send(recipes))
        .catch(next))

export default router;