import { RecipeHistory } from "./RecipeHistoryModel";

export class Recipe {
    id: string;
    title: string;
    description: string;
    image_url: string;
    recipe_history:RecipeHistory[];
}