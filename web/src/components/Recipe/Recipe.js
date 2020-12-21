import EditorJs from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Link from '@editorjs/link';
import { useAuth } from '@redwoodjs/auth';
import { Link as RouteLink, navigate, routes } from '@redwoodjs/router';
import { useFlash, useMutation } from '@redwoodjs/web';

const DELETE_RECIPE_MUTATION = gql`
    mutation DeleteRecipeMutation($id: Int!) {
        deleteRecipe(id: $id) {
            id
        }
    }
`;

const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];

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

    const createdDate = new Date(recipe.createdAt);
    const updatedDate = new Date(recipe.updatedAt);

    const createdDateString = `${createdDate.getDate()} ${
        months[createdDate.getMonth()]
    } ${createdDate.getFullYear()}`;
    const updatedDateString = `${updatedDate.getDate()} ${
        months[updatedDate.getMonth()]
    } ${updatedDate.getFullYear()}`;

    return (
        <>
            <div className="rw-segment">
                <div>
                    <div>#{recipe.id}</div>
                    <div>{recipe.title}</div>
                    <div>
                        <span>Created on {createdDateString}</span>
                        {recipe.updatedAt !== recipe.createdAt && (
                            <span>, last modified on {updatedDateString}</span>
                        )}
                    </div>
                    <div id="editorjs" />
                </div>
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
