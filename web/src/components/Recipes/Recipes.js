import { useAuth } from '@redwoodjs/auth';
import { Link, routes } from '@redwoodjs/router';
import { useFlash, useMutation } from '@redwoodjs/web';
import { QUERY } from 'src/components/RecipesCell';

const DELETE_RECIPE_MUTATION = gql`
    mutation DeleteRecipeMutation($id: Int!) {
        deleteRecipe(id: $id) {
            id
        }
    }
`;

const RecipesList = ({ recipes }) => {
    const { isAuthenticated } = useAuth();
    const { addMessage } = useFlash();
    const [deleteRecipe] = useMutation(DELETE_RECIPE_MUTATION, {
        onCompleted: () => {
            addMessage('Recipe deleted.', { classes: 'rw-flash-success' });
        },
        refetchQueries: [{ query: QUERY }],
        awaitRefetchQueries: true,
    });

    const onDeleteClick = (id) => {
        if (confirm('Are you sure you want to delete recipe ' + id + '?')) {
            deleteRecipe({ variables: { id } });
        }
    };

    return (
        <div className="recipes-container">
            <div className="recipes-title">Welcome to I'm Trying</div>
            <div className="recipes-subtitle">
                A cookbook for those of us trying our darnedest
            </div>
            <div className="recipes-list">
                {recipes.map((recipe) => (
                    <div key={recipe.id} className="recipes-row">
                        <div>{recipe.title}</div>
                        <nav className="rw-table-actions">
                            <Link
                                to={routes.recipe({ id: recipe.id })}
                                title={`Show recipe ${recipe.id} detail`}
                                className="rw-button rw-button-small"
                            >
                                Show
                            </Link>
                            {isAuthenticated && (
                                <Link
                                    to={routes.editRecipe({
                                        id: recipe.id,
                                    })}
                                    title={`Edit recipe ${recipe.id}`}
                                    className="rw-button rw-button-small rw-button-blue"
                                >
                                    Edit
                                </Link>
                            )}
                            {isAuthenticated && (
                                <a
                                    href="#"
                                    title={`Delete recipe ${recipe.id}`}
                                    className="rw-button rw-button-small rw-button-red"
                                    onClick={() => onDeleteClick(recipe.id)}
                                >
                                    Delete
                                </a>
                            )}
                        </nav>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecipesList;
