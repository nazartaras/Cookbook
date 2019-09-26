import { Recipe } from '../models/RecipeModel';
import RecipeRepository from '../repository/recipe.repository';
import { getCustomRepository } from "typeorm";
import RecipeHistoryRepository from '../repository/recipeHistory.repository';
import { RecipeHistory } from '../models/RecipeHistoryModel';

export const createRecipe = async (recipe: Recipe): Promise<Recipe> => {
    return await getCustomRepository(RecipeRepository).save(recipe);
}

export const getHistoryRecipeById = async (id: string): Promise<RecipeHistory> => {
    return await getCustomRepository(RecipeHistoryRepository).findOne({ where: { id } })
}

export const getRecipeById = async (id: string): Promise<Recipe> => {
    return await getCustomRepository(RecipeRepository).findOne({
        where: { id },
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
    await saveRecipeToHistory(oldRecipe[0], recipe);
    return
}

const saveRecipeToHistory = async (oldRecipe: Recipe, newRecipe:Recipe): Promise<RecipeHistory> => {
    const saveToHistory = new RecipeHistory();
    saveToHistory.title = oldRecipe.title;
    saveToHistory.description = oldRecipe.description;
    saveToHistory.image_url = oldRecipe.image_url;
    saveToHistory.real_time = oldRecipe.updated_at;
    saveToHistory.recipe = await getCustomRepository(RecipeRepository).findOne({ id: newRecipe.id });
    return await getCustomRepository(RecipeHistoryRepository).save(saveToHistory);
}