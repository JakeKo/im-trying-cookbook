import { useMutation, useFlash } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import RecipeForm from 'src/components/RecipeForm'

import { QUERY } from 'src/components/RecipesCell'

const CREATE_RECIPE_MUTATION = gql`
  mutation CreateRecipeMutation($input: CreateRecipeInput!) {
    createRecipe(input: $input) {
      id
    }
  }
`

const NewRecipe = () => {
  const { addMessage } = useFlash()
  const [createRecipe, { loading, error }] = useMutation(
    CREATE_RECIPE_MUTATION,
    {
      onCompleted: () => {
        navigate(routes.recipes())
        addMessage('Recipe created.', { classes: 'rw-flash-success' })
      },
    }
  )

  const onSave = (input) => {
    createRecipe({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Recipe</h2>
      </header>
      <div className="rw-segment-main">
        <RecipeForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewRecipe
