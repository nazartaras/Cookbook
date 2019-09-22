import {EntityRepository, Repository} from "typeorm";
import {Recipe} from "../entities/Recipe";

@EntityRepository(Recipe)
class RecipeRepository extends Repository<Recipe> {
}


export default RecipeRepository;