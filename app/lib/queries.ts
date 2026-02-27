import { graphql } from "./gql";

export const GET_ROADMAPS = graphql(`
  query GetRoadmaps($limit: Int!, $offset: Int!) {
    roadmaps(limit: $limit, offset: $offset) {
      id
      name
      description
      categories {
        id
        name
      }
    }
  }
`);
