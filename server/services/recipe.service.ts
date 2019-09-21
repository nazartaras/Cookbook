import {Recipe} from '../models/RecipeModel';
import RecipeRepository from '../repository/recipe.repository';
import {getCustomRepository} from "typeorm";

export const createRecipe = async (recipe: Recipe): Promise<Recipe> =>{
    console.log(recipe);
    return await getCustomRepository(RecipeRepository).save(recipe);
}

export const getRecipes = async (): Promise<Recipe[]> =>{
    return await getCustomRepository(RecipeRepository).find();
}

export const updateRecipe = async (recipe: Recipe): Promise<Recipe> =>{
    return await getCustomRepository(RecipeRepository).save(recipe);
}   