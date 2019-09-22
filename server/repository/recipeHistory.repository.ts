import {EntityRepository, Repository} from "typeorm";
import {RecipeHistory} from "../entities/RecipeHistory";

@EntityRepository(RecipeHistory)
class RecipeHistoryRepository extends Repository<RecipeHistory> {
}


export default RecipeHistoryRepository;