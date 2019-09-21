import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { RecipeHistory } from "./RecipeHistory";

@Entity()
export class Recipe {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    image_url: string;

    @OneToMany(type => RecipeHistory, recipeHistory => recipeHistory.recipe, {
        onDelete: "CASCADE"
    })
    recipe_history: RecipeHistory[];

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: Date;
}