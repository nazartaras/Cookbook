import { Recipe } from "./RecipeModel";

export class RecipeHistory {
    id: string;
    title: string;
    description: string;
    image_url: string;
    recipe:Recipe;
    created_at: Date;
    updated_at: Date;
}