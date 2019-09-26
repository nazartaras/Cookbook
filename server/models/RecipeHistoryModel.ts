import { Recipe } from "./RecipeModel";

export class RecipeHistory {
    id: string;
    title: string;
    description: string;
    image_url: string;
    recipe:Recipe;
    real_time:Date;
    created_at: Date;
    updated_at: Date;
}