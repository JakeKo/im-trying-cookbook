import { requireAuth } from 'src/lib/auth';
import { db } from 'src/lib/db';

export const recipes = () => {
    return db.recipe.findMany();
};

export const recipe = ({ id }) => {
    return db.recipe.findOne({
        where: { id },
    });
};

export const createRecipe = ({ input }) => {
    requireAuth();
    return db.recipe.create({
        data: input,
    });
};

export const updateRecipe = ({ id, input }) => {
    requireAuth();
    return db.recipe.update({
        data: input,
        where: { id },
    });
};

export const deleteRecipe = ({ id }) => {
    requireAuth();
    return db.recipe.delete({
        where: { id },
    });
};
