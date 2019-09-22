import { MigrationInterface, QueryRunner, getCustomRepository } from "typeorm";
import { Recipe } from "../models/RecipeModel";
import RecipeRepository from "../repository/recipe.repository";

export class RecipeSeed1568930724105 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const recipeSeed = [
            {
                title: 'Panko Parmesan Salmon',
                image_url: 'https://images.media-allrecipes.com/userphotos/560x315/7052071.jpg',
                description: `Of all the recipes I make, this one is my husband's favorite for salmon. It's made with panko, or Japanese bread crumbs, which are very light and crunchy, mixed with Parmesan cheese. It's baked in the oven until the panko is nice and toasted`
            },
            {
                title: 'Cinnamon Bread I',
                image_url: 'https://images.media-allrecipes.com/userphotos/560x315/4548967.jpg',
                description: `This is a lovely way to start off your morning when you want a little something different than your usual. Note: If you don't have buttermilk you may substitute milk with 1 tablespoon vinegar to measure 1 cup`
            },
            {
                title: 'Million-Dollar Spaghetti',
                image_url: 'https://images.media-allrecipes.com/userphotos/560x315/1004408.jpg',
                description: `The perfect combination of pasta, ground beef, and cream cheese mixture. Unbelievably good! Serve with garlic bread and salad. Enjoy!`
            },
            {
                title: 'Tuna Noodle Casserole from Scratch',
                image_url: 'https://images.media-allrecipes.com/userphotos/720x405/2612540.jpg',
                description: `No canned soup mix in this recipe! Mushrooms, onions, celery, and peas all go into this comfort casserole.`
            },
            {
                title: 'Stuffed Green Peppers I',
                image_url: 'https://images.media-allrecipes.com/userphotos/720x405/452169.jpg',
                description: `Here's a delicious stuffed pepper recipe that's easy to make. Each green bell pepper contains ground beef, onion, tomatoes, rice and cheese, and is cooked in tomato soup.`
            },
            {
                title: 'Brown Sugar Bacon Waffles',
                image_url: 'https://images.media-allrecipes.com/userphotos/560x315/3598082.jpg',
                description: `These are perfect for those lazy weekend mornings when you have time to wake up late and still have time to cook breakfast! They are deliciously irresistible.`
            },
            {
                title: 'Simple Macaroni and Cheese',
                image_url: 'https://images.media-allrecipes.com/userphotos/720x405/5445825.jpg',
                description: `A very quick and easy fix to a tasty side-dish. Fancy, designer mac and cheese often costs forty or fifty dollars to prepare when you have so many exotic and expensive cheeses, but they aren't always the best tasting. This recipe is cheap and tasty.`
            },
            {
                title: 'Slow Cooker Salisbury Steak',
                image_url: 'https://images.media-allrecipes.com/userphotos/720x405/4036171.jpg',
                description: `This recipe goes together quickly and does not need a lot of time in the slow cooker. It's a delicious way to add flavor to ground beef and the children love it! The gravy is delightful served over mashed potatoes.`
            },
            {
                title: 'Ground Beef and Chopped Cabbage',
                image_url: 'https://images.media-allrecipes.com/userphotos/560x315/1958297.jpg',
                description: `This is a hearty meal that's easy to make and keeps well. I use a slotted spoon to serve it with rice and sweet cornbread.`
            },
            {
                title: 'Stuffed Eggplant Parmesan',
                image_url: 'https://images.media-allrecipes.com/userphotos/720x405/5073149.jpg',
                description: `A twist on the old standby! I like to use my homemade tomato sauce for this recipe, as well as using crushed croutons as the bread crumbs. A hint for shelling the eggplants - use a grapefruit spoon to start!`
            },
            {
                title: 'Mexican Casserole',
                image_url: 'https://images.media-allrecipes.com/userphotos/720x405/2147627.jpg',
                description: `Small dinner pie made with salsa, tortillas, refried beans, cheese, and onions.`
            },
        ];

        recipeSeed.map(async recipeInfo => {
            const recipe = new Recipe();
            recipe.title = recipeInfo.title;
            recipe.image_url = recipeInfo.image_url;
            recipe.description = recipeInfo.description;
            await getCustomRepository(RecipeRepository).save(recipe);
        })
    }

    public async down(queryRunner: QueryRunner): Promise<any> {

    }

}
