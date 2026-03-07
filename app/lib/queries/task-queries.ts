import { graphql } from "../gql";

export const GET_TASKS = graphql(`
  query GetTasks($limit: Int!, $offset: Int!) {
    tasks(limit: $limit, offset: $offset) {
      id
      name
      description
      done
      isDaily
      isExpired
      lifetime
      category {
        id
        name
      }
    }
  }
`);

export const GET_DAILY_TASKS = graphql(`
  query GetDailyTasks($limit: Int!, $offset: Int!) {
    dailyTasks(limit: $limit, offset: $offset) {
      id
      name
      description
      done
      isExpired
      category {
        id
        name
      }
    }
  }
`);

export const GET_PENDING_TASKS = graphql(`
  query GetPendingTasks($categoryId: ID!, $limit: Int!, $offset: Int!) {
    pendingTasks(categoryId: $categoryId, limit: $limit, offset: $offset) {
      id
      name
      description
      done
      isDaily
      lifetime
      category {
        id
        name
      }
    }
  }
`);

export const GET_EXPIRED_TASKS = graphql(`
  query GetExpiredTasks($limit: Int!, $offset: Int!) {
    expiredTasks(limit: $limit, offset: $offset) {
      id
      name
      description
      done
      lifetime
      category {
        id
        name
      }
    }
  }
`);

export const CREATE_TASK = graphql(`
  mutation CreateTask($input: NewTask!) {
    createTask(input: $input) {
      id
      name
      description
      done
      isDaily
      lifetime
    }
  }
`);

export const UPDATE_TASK = graphql(`
  mutation UpdateTask($id: ID!, $input: NewTask!) {
    updateTask(id: $id, input: $input) {
      id
      name
      description
      done
      isDaily
      lifetime
    }
  }
`);

export const TOGGLE_TASK_DONE = graphql(`
  mutation ToggleTaskDone($id: ID!) {
    toggleTaskDone(id: $id) {
      id
      done
    }
  }
`);

export const DELETE_TASK = graphql(`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id)
  }
`);
