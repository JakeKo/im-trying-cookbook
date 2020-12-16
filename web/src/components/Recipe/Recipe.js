import { useMutation, useFlash } from '@redwoodjs/web'
import { Link, routes, navigate } from '@redwoodjs/router'
import EditorJs from '@editorjs/editorjs'

// import { QUERY } from 'src/components/RecipesCell'

const DELETE_RECIPE_MUTATION = gql`
  mutation DeleteRecipeMutation($id: Int!) {
    deleteRecipe(id: $id) {
      id
    }
  }
`

// const jsonDisplay = (obj) => {
//   return (
//     <pre>
//       <code>{JSON.stringify(obj, null, 2)}</code>
//     </pre>
//   )
// }

const timeTag = (datetime) => {
  return (
    <time dateTime={datetime} title={datetime}>
      {new Date(datetime).toUTCString()}
    </time>
  )
}

// const checkboxInputTag = (checked) => {
//   return <input type="checkbox" checked={checked} disabled />
// }

const Recipe = ({ recipe }) => {
  const { addMessage } = useFlash()
  const [deleteRecipe] = useMutation(DELETE_RECIPE_MUTATION, {
    onCompleted: () => {
      navigate(routes.recipes())
      addMessage('Recipe deleted.', { classes: 'rw-flash-success' })
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete recipe ' + id + '?')) {
      deleteRecipe({ variables: { id } })
    }
  }

  const blocks = JSON.parse(recipe.blocks)
  console.log(blocks)
  const editor = new EditorJs({
    readOnly: true,
    data: blocks,
  })

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Recipe {recipe.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{recipe.id}</td>
            </tr>
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
      <nav className="rw-button-group">
        <Link
          to={routes.editRecipe({ id: recipe.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <a
          href="#"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(recipe.id)}
        >
          Delete
        </a>
      </nav>
    </>
  )
}

export default Recipe
