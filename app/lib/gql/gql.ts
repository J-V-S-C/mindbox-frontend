/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query GetCategories($limit: Int!, $offset: Int!) {\n    categories(limit: $limit, offset: $offset) {\n      id\n      name\n      description\n      lifetime\n      roadmap {\n        id\n        name\n      }\n      tasks {\n        id\n        name\n        done\n      }\n    }\n  }\n": typeof types.GetCategoriesDocument,
    "\n  mutation CreateCategory($input: NewCategory!) {\n    createCategory(input: $input) {\n      id\n      name\n      description\n      lifetime\n    }\n  }\n": typeof types.CreateCategoryDocument,
    "\n  mutation UpdateCategory($id: ID!, $input: NewCategory!) {\n    updateCategory(id: $id, input: $input) {\n      id\n      name\n      description\n      lifetime\n    }\n  }\n": typeof types.UpdateCategoryDocument,
    "\n  mutation DeleteCategory($id: ID!) {\n    deleteCategory(id: $id)\n  }\n": typeof types.DeleteCategoryDocument,
    "\n  query GetRoadmaps($limit: Int!, $offset: Int!) {\n    roadmaps(limit: $limit, offset: $offset) {\n      id\n      name\n      description\n      categories {\n        id\n        name\n      }\n    }\n  }\n": typeof types.GetRoadmapsDocument,
    "\n  mutation CreateRoadmap($input: NewRoadmap!) {\n    createRoadmap(input: $input) {\n      id\n      name\n      description\n    }\n  }\n": typeof types.CreateRoadmapDocument,
    "\n  mutation UpdateRoadmap($id: ID!, $input: NewRoadmap!) {\n    updateRoadmap(id: $id, input: $input) {\n      id\n      name\n      description\n    }\n  }\n": typeof types.UpdateRoadmapDocument,
    "\n  mutation DeleteRoadmap($id: ID!) {\n    deleteRoadmap(id: $id)\n  }\n": typeof types.DeleteRoadmapDocument,
    "\n  query GetTasks($limit: Int!, $offset: Int!) {\n    tasks(limit: $limit, offset: $offset) {\n      id\n      name\n      description\n      done\n      isDaily\n      isExpired\n      lifetime\n      category {\n        id\n        name\n      }\n    }\n  }\n": typeof types.GetTasksDocument,
    "\n  query GetDailyTasks($limit: Int!, $offset: Int!) {\n    dailyTasks(limit: $limit, offset: $offset) {\n      id\n      name\n      description\n      done\n      isExpired\n      category {\n        id\n        name\n      }\n    }\n  }\n": typeof types.GetDailyTasksDocument,
    "\n  query GetPendingTasks($categoryId: ID!, $limit: Int!, $offset: Int!) {\n    pendingTasks(categoryId: $categoryId, limit: $limit, offset: $offset) {\n      id\n      name\n      description\n      done\n      isDaily\n      lifetime\n      category {\n        id\n        name\n      }\n    }\n  }\n": typeof types.GetPendingTasksDocument,
    "\n  query GetExpiredTasks($limit: Int!, $offset: Int!) {\n    expiredTasks(limit: $limit, offset: $offset) {\n      id\n      name\n      description\n      done\n      lifetime\n      category {\n        id\n        name\n      }\n    }\n  }\n": typeof types.GetExpiredTasksDocument,
    "\n  mutation CreateTask($input: NewTask!) {\n    createTask(input: $input) {\n      id\n      name\n      description\n      done\n      isDaily\n      lifetime\n    }\n  }\n": typeof types.CreateTaskDocument,
    "\n  mutation UpdateTask($id: ID!, $input: NewTask!) {\n    updateTask(id: $id, input: $input) {\n      id\n      name\n      description\n      done\n      isDaily\n      lifetime\n    }\n  }\n": typeof types.UpdateTaskDocument,
    "\n  mutation ToggleTaskDone($id: ID!) {\n    toggleTaskDone(id: $id) {\n      id\n      done\n    }\n  }\n": typeof types.ToggleTaskDoneDocument,
    "\n  mutation DeleteTask($id: ID!) {\n    deleteTask(id: $id)\n  }\n": typeof types.DeleteTaskDocument,
};
const documents: Documents = {
    "\n  query GetCategories($limit: Int!, $offset: Int!) {\n    categories(limit: $limit, offset: $offset) {\n      id\n      name\n      description\n      lifetime\n      roadmap {\n        id\n        name\n      }\n      tasks {\n        id\n        name\n        done\n      }\n    }\n  }\n": types.GetCategoriesDocument,
    "\n  mutation CreateCategory($input: NewCategory!) {\n    createCategory(input: $input) {\n      id\n      name\n      description\n      lifetime\n    }\n  }\n": types.CreateCategoryDocument,
    "\n  mutation UpdateCategory($id: ID!, $input: NewCategory!) {\n    updateCategory(id: $id, input: $input) {\n      id\n      name\n      description\n      lifetime\n    }\n  }\n": types.UpdateCategoryDocument,
    "\n  mutation DeleteCategory($id: ID!) {\n    deleteCategory(id: $id)\n  }\n": types.DeleteCategoryDocument,
    "\n  query GetRoadmaps($limit: Int!, $offset: Int!) {\n    roadmaps(limit: $limit, offset: $offset) {\n      id\n      name\n      description\n      categories {\n        id\n        name\n      }\n    }\n  }\n": types.GetRoadmapsDocument,
    "\n  mutation CreateRoadmap($input: NewRoadmap!) {\n    createRoadmap(input: $input) {\n      id\n      name\n      description\n    }\n  }\n": types.CreateRoadmapDocument,
    "\n  mutation UpdateRoadmap($id: ID!, $input: NewRoadmap!) {\n    updateRoadmap(id: $id, input: $input) {\n      id\n      name\n      description\n    }\n  }\n": types.UpdateRoadmapDocument,
    "\n  mutation DeleteRoadmap($id: ID!) {\n    deleteRoadmap(id: $id)\n  }\n": types.DeleteRoadmapDocument,
    "\n  query GetTasks($limit: Int!, $offset: Int!) {\n    tasks(limit: $limit, offset: $offset) {\n      id\n      name\n      description\n      done\n      isDaily\n      isExpired\n      lifetime\n      category {\n        id\n        name\n      }\n    }\n  }\n": types.GetTasksDocument,
    "\n  query GetDailyTasks($limit: Int!, $offset: Int!) {\n    dailyTasks(limit: $limit, offset: $offset) {\n      id\n      name\n      description\n      done\n      isExpired\n      category {\n        id\n        name\n      }\n    }\n  }\n": types.GetDailyTasksDocument,
    "\n  query GetPendingTasks($categoryId: ID!, $limit: Int!, $offset: Int!) {\n    pendingTasks(categoryId: $categoryId, limit: $limit, offset: $offset) {\n      id\n      name\n      description\n      done\n      isDaily\n      lifetime\n      category {\n        id\n        name\n      }\n    }\n  }\n": types.GetPendingTasksDocument,
    "\n  query GetExpiredTasks($limit: Int!, $offset: Int!) {\n    expiredTasks(limit: $limit, offset: $offset) {\n      id\n      name\n      description\n      done\n      lifetime\n      category {\n        id\n        name\n      }\n    }\n  }\n": types.GetExpiredTasksDocument,
    "\n  mutation CreateTask($input: NewTask!) {\n    createTask(input: $input) {\n      id\n      name\n      description\n      done\n      isDaily\n      lifetime\n    }\n  }\n": types.CreateTaskDocument,
    "\n  mutation UpdateTask($id: ID!, $input: NewTask!) {\n    updateTask(id: $id, input: $input) {\n      id\n      name\n      description\n      done\n      isDaily\n      lifetime\n    }\n  }\n": types.UpdateTaskDocument,
    "\n  mutation ToggleTaskDone($id: ID!) {\n    toggleTaskDone(id: $id) {\n      id\n      done\n    }\n  }\n": types.ToggleTaskDoneDocument,
    "\n  mutation DeleteTask($id: ID!) {\n    deleteTask(id: $id)\n  }\n": types.DeleteTaskDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCategories($limit: Int!, $offset: Int!) {\n    categories(limit: $limit, offset: $offset) {\n      id\n      name\n      description\n      lifetime\n      roadmap {\n        id\n        name\n      }\n      tasks {\n        id\n        name\n        done\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCategories($limit: Int!, $offset: Int!) {\n    categories(limit: $limit, offset: $offset) {\n      id\n      name\n      description\n      lifetime\n      roadmap {\n        id\n        name\n      }\n      tasks {\n        id\n        name\n        done\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateCategory($input: NewCategory!) {\n    createCategory(input: $input) {\n      id\n      name\n      description\n      lifetime\n    }\n  }\n"): (typeof documents)["\n  mutation CreateCategory($input: NewCategory!) {\n    createCategory(input: $input) {\n      id\n      name\n      description\n      lifetime\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateCategory($id: ID!, $input: NewCategory!) {\n    updateCategory(id: $id, input: $input) {\n      id\n      name\n      description\n      lifetime\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateCategory($id: ID!, $input: NewCategory!) {\n    updateCategory(id: $id, input: $input) {\n      id\n      name\n      description\n      lifetime\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteCategory($id: ID!) {\n    deleteCategory(id: $id)\n  }\n"): (typeof documents)["\n  mutation DeleteCategory($id: ID!) {\n    deleteCategory(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetRoadmaps($limit: Int!, $offset: Int!) {\n    roadmaps(limit: $limit, offset: $offset) {\n      id\n      name\n      description\n      categories {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetRoadmaps($limit: Int!, $offset: Int!) {\n    roadmaps(limit: $limit, offset: $offset) {\n      id\n      name\n      description\n      categories {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateRoadmap($input: NewRoadmap!) {\n    createRoadmap(input: $input) {\n      id\n      name\n      description\n    }\n  }\n"): (typeof documents)["\n  mutation CreateRoadmap($input: NewRoadmap!) {\n    createRoadmap(input: $input) {\n      id\n      name\n      description\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateRoadmap($id: ID!, $input: NewRoadmap!) {\n    updateRoadmap(id: $id, input: $input) {\n      id\n      name\n      description\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateRoadmap($id: ID!, $input: NewRoadmap!) {\n    updateRoadmap(id: $id, input: $input) {\n      id\n      name\n      description\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteRoadmap($id: ID!) {\n    deleteRoadmap(id: $id)\n  }\n"): (typeof documents)["\n  mutation DeleteRoadmap($id: ID!) {\n    deleteRoadmap(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetTasks($limit: Int!, $offset: Int!) {\n    tasks(limit: $limit, offset: $offset) {\n      id\n      name\n      description\n      done\n      isDaily\n      isExpired\n      lifetime\n      category {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetTasks($limit: Int!, $offset: Int!) {\n    tasks(limit: $limit, offset: $offset) {\n      id\n      name\n      description\n      done\n      isDaily\n      isExpired\n      lifetime\n      category {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetDailyTasks($limit: Int!, $offset: Int!) {\n    dailyTasks(limit: $limit, offset: $offset) {\n      id\n      name\n      description\n      done\n      isExpired\n      category {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetDailyTasks($limit: Int!, $offset: Int!) {\n    dailyTasks(limit: $limit, offset: $offset) {\n      id\n      name\n      description\n      done\n      isExpired\n      category {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPendingTasks($categoryId: ID!, $limit: Int!, $offset: Int!) {\n    pendingTasks(categoryId: $categoryId, limit: $limit, offset: $offset) {\n      id\n      name\n      description\n      done\n      isDaily\n      lifetime\n      category {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetPendingTasks($categoryId: ID!, $limit: Int!, $offset: Int!) {\n    pendingTasks(categoryId: $categoryId, limit: $limit, offset: $offset) {\n      id\n      name\n      description\n      done\n      isDaily\n      lifetime\n      category {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetExpiredTasks($limit: Int!, $offset: Int!) {\n    expiredTasks(limit: $limit, offset: $offset) {\n      id\n      name\n      description\n      done\n      lifetime\n      category {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetExpiredTasks($limit: Int!, $offset: Int!) {\n    expiredTasks(limit: $limit, offset: $offset) {\n      id\n      name\n      description\n      done\n      lifetime\n      category {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateTask($input: NewTask!) {\n    createTask(input: $input) {\n      id\n      name\n      description\n      done\n      isDaily\n      lifetime\n    }\n  }\n"): (typeof documents)["\n  mutation CreateTask($input: NewTask!) {\n    createTask(input: $input) {\n      id\n      name\n      description\n      done\n      isDaily\n      lifetime\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateTask($id: ID!, $input: NewTask!) {\n    updateTask(id: $id, input: $input) {\n      id\n      name\n      description\n      done\n      isDaily\n      lifetime\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateTask($id: ID!, $input: NewTask!) {\n    updateTask(id: $id, input: $input) {\n      id\n      name\n      description\n      done\n      isDaily\n      lifetime\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ToggleTaskDone($id: ID!) {\n    toggleTaskDone(id: $id) {\n      id\n      done\n    }\n  }\n"): (typeof documents)["\n  mutation ToggleTaskDone($id: ID!) {\n    toggleTaskDone(id: $id) {\n      id\n      done\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteTask($id: ID!) {\n    deleteTask(id: $id)\n  }\n"): (typeof documents)["\n  mutation DeleteTask($id: ID!) {\n    deleteTask(id: $id)\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;