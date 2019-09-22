import { Recipe } from '../models/RecipeModel';
import RecipeRepository from '../repository/recipe.repository';
import { getCustomRepository } from "typeorm";
import RecipeHistoryRepository from '../repository/recipeHistory.repository';
import { RecipeHistory } from '../models/RecipeHistoryModel';

export const createRecipe = async (recipe: Recipe): Promise<Recipe> => {
    return await getCustomRepository(RecipeRepository).save(recipe);
}

export const getHistoryRecipeById = async (id: string): Promise<RecipeHistory> => {
    return await getCustomRepository(RecipeHistoryRepository).findOne({ where: { id: id } })
}

export const getRecipeById = async (id: string): Promise<Recipe> => {
    return await getCustomRepository(RecipeRepository).findOne({
        where: { id: id },
        relations: ["recipe_history"]
    })
}

export const getRecipes = async (): Promise<Recipe[]> => {
    return await getCustomRepository(RecipeRepository).find({
        order: {
            updated_at: "DESC"
        }
    });
}

export const updateRecipe = async (recipe: Recipe): Promise<Recipe> => {
    const oldRecipe = await getCustomRepository(RecipeRepository).find({ where: { id: recipe.id } });
    await getCustomRepository(RecipeRepository).save(recipe);
    const saveToHistory = new RecipeHistory();
    saveToHistory.title = oldRecipe[0].title,
        saveToHistory.description = oldRecipe[0].description,
        saveToHistory.created_at = oldRecipe[0].created_at,
        saveToHistory.image_url = oldRecipe[0].image_url,
        saveToHistory.updated_at = oldRecipe[0].updated_at,
        saveToHistory.recipe = await getCustomRepository(RecipeRepository).findOne({ id: recipe.id })
    await getCustomRepository(RecipeHistoryRepository).save(saveToHistory);
    return
}   