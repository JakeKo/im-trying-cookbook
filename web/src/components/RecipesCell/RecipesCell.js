import { Link, routes } from '@redwoodjs/router'

import Recipes from 'src/components/Recipes'

export const QUERY = gql`
  query RECIPES {
    recipes {
      id
      createdAt
      updatedAt
      title
      blocks
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No recipes yet. '}
      <Link to={routes.newRecipe()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Success = ({ recipes }) => {
  return <Recipes recipes={recipes} />
}
