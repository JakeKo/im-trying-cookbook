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

const timeTag = (datetime) => {
    return (
        <time dateTime={datetime} title={datetime}>
            {new Date(datetime).toUTCString()}
        </time>
    );
};

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
            <div className="rw-segment">
                <header className="rw-segment-header">
                    <h2 className="rw-heading rw-heading-secondary">
                        Recipe Detail
                    </h2>
                </header>
                <table className="rw-table">
                    <tbody>
                        {isAuthenticated && (
                            <tr>
                                <th>Id</th>
                                <td>{recipe.id}</td>
                            </tr>
                        )}
                        <tr>
                            <th>Created at</th>
                            <td>{timeTag(recipe.createdAt)}</td>
                        </tr>
                        <tr>
                            <th>Updated at</th>
                            <td>{timeTag(recipe.updatedAt)}</td>
                        </tr>
                        <tr>
                            <th>Title</th>
                            <td>{recipe.title}</td>
                        </tr>
                        <tr>
                            <th>Blocks</th>
                            <td>
                                <div id="editorjs" />
                            </td>
                        </tr>
                    </tbody>
                </table>
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
