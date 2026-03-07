import { graphql } from "../gql";

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

export const CREATE_ROADMAP = graphql(`
  mutation CreateRoadmap($input: NewRoadmap!) {
    createRoadmap(input: $input) {
      id
      name
      description
    }
  }
`);

export const UPDATE_ROADMAP = graphql(`
  mutation UpdateRoadmap($id: ID!, $input: NewRoadmap!) {
    updateRoadmap(id: $id, input: $input) {
      id
      name
      description
    }
  }
`);

export const DELETE_ROADMAP = graphql(`
  mutation DeleteRoadmap($id: ID!) {
    deleteRoadmap(id: $id)
  }
`);
