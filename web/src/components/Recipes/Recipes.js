import { useMutation, useFlash } from '@redwoodjs/web';
import { Link, routes } from '@redwoodjs/router';

import { QUERY } from 'src/components/RecipesCell';
import { useAuth } from '@redwoodjs/auth';

const DELETE_RECIPE_MUTATION = gql`
    mutation DeleteRecipeMutation($id: Int!) {
        deleteRecipe(id: $id) {
            id
        }
    }
`;

const MAX_STRING_LENGTH = 150;

const truncate = (text) => {
    let output = text;
    if (text && text.length > MAX_STRING_LENGTH) {
        output = output.substring(0, MAX_STRING_LENGTH) + '...';
    }
    return output;
};

const timeTag = (datetime) => {
    return (
        <time dateTime={datetime} title={datetime}>
            {new Date(datetime).toUTCString()}
        </time>
    );
};

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
        <div className="rw-segment rw-table-wrapper-responsive">
            <table className="rw-table">
                <thead>
                    <tr>
                        <th>Created at</th>
                        <th>Updated at</th>
                        <th>Title</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {recipes.map((recipe) => (
                        <tr key={recipe.id}>
                            <td>{timeTag(recipe.createdAt)}</td>
                            <td>{timeTag(recipe.updatedAt)}</td>
                            <td>{truncate(recipe.title)}</td>
                            <td>
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
                                            onClick={() =>
                                                onDeleteClick(recipe.id)
                                            }
                                        >
                                            Delete
                                        </a>
                                    )}
                                </nav>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RecipesList;
