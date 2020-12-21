export const schema = gql`
    type Recipe {
        id: Int!
        createdAt: DateTime!
        updatedAt: DateTime!
        title: String!
        blocks: String!
    }

    type Query {
        recipes: [Recipe!]!
        recipe(id: Int!): Recipe
    }

    input CreateRecipeInput {
        title: String!
        blocks: String!
    }

    input UpdateRecipeInput {
        title: String
        blocks: String
    }

    type Mutation {
        createRecipe(input: CreateRecipeInput!): Recipe!
        updateRecipe(id: Int!, input: UpdateRecipeInput!): Recipe!
        deleteRecipe(id: Int!): Recipe!
    }
`;
