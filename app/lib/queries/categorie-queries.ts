import { graphql } from "../gql";

export const GET_CATEGORIES = graphql(`
  query GetCategories($limit: Int!, $offset: Int!) {
    categories(limit: $limit, offset: $offset) {
      id
      name
      description
      lifetime
      roadmap {
        id
        name
      }
      tasks {
        id
        name
        done
      }
    }
  }
`);

export const CREATE_CATEGORY = graphql(`
  mutation CreateCategory($input: NewCategory!) {
    createCategory(input: $input) {
      id
      name
      description
      lifetime
    }
  }
`);

export const UPDATE_CATEGORY = graphql(`
  mutation UpdateCategory($id: ID!, $input: NewCategory!) {
    updateCategory(id: $id, input: $input) {
      id
      name
      description
      lifetime
    }
  }
`);

export const DELETE_CATEGORY = graphql(`
  mutation DeleteCategory($id: ID!) {
    deleteCategory(id: $id)
  }
`);
