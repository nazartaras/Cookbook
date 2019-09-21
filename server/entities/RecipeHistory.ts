import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Recipe } from './Recipe'

@Entity()
export class RecipeHistory {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    image_url: string;
    
    @ManyToOne(type=>Recipe, recipe=>recipe.recipe_history, { onDelete:"CASCADE" })
    @JoinColumn()
    recipe:Recipe;

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: Date; 


}