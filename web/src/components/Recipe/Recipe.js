import EditorJs from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Link from '@editorjs/link';
import { useAuth } from '@redwoodjs/auth';
import { Link as RouteLink, navigate, routes } from '@redwoodjs/router';
import { useFlash, useMutation } from '@redwoodjs/web';
import { formatDate } from 'src/util/date';

const DELETE_RECIPE_MUTATION = gql`
    mutation DeleteRecipeMutation($id: Int!) {
        deleteRecipe(id: $id) {
            id
        }
    }
`;

const Recipe = ({ recipe }) => {
    const { isAuthenticated } = useAuth();
    const { addMessage } = useFlash();
    const [deleteRecipe] = useMutation(DELETE_RECIPE_MUTATION, {
        onCompleted: () => {
            navigate(routes.recipes());
            addMessage('Recipe deleted.', { classes: 'rw-flash-success' });
        },
    });

    const onDeleteClick = (id) => {
        if (confirm('Are you sure you want to delete recipe ' + id + '?')) {
            deleteRecipe({ variables: { id } });
        }
    };

    const blocks = JSON.parse(recipe.blocks);
    const editor = new EditorJs({
        readOnly: true,
        data: blocks,
        tools: {
            header: Header,
            list: List,
            link: Link,
        },
    });

    return (
        <>
            <div className="recipe">
                <div className="recipe-dates">
                    <span>Created: {formatDate(recipe.createdAt)}</span>
                    {recipe.updatedAt !== recipe.createdAt && (
                        <span> | Modified: {formatDate(recipe.updatedAt)}</span>
                    )}
                </div>
                <div>
                    <span className="recipe-id">#{recipe.id} </span>
                    <span className="recipe-title">{recipe.title}</span>
                </div>
                <div className="recipe-blocks" id="editorjs" />
            </div>
            {isAuthenticated && (
                <nav className="rw-button-group">
                    <RouteLink
                        to={routes.editRecipe({ id: recipe.id })}
                        className="rw-button rw-button-blue"
                    >
                        Edit
                    </RouteLink>
                    <a
                        href="#"
                        className="rw-button rw-button-red"
                        onClick={() => onDeleteClick(recipe.id)}
                    >
                        Delete
                    </a>
                </nav>
            )}
        </>
    );
};

export default Recipe;
