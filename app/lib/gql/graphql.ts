/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Time: { input: any; output: any; }
};

export type Category = {
  __typename?: 'Category';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lifetime: Scalars['String']['output'];
  name: Scalars['String']['output'];
  roadmap: Roadmap;
  tasks: Array<Task>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createCategory: Category;
  createRoadmap: Roadmap;
  createTask: Task;
  deleteCategory: Scalars['Boolean']['output'];
  deleteRoadmap: Scalars['Boolean']['output'];
  deleteTask: Scalars['Boolean']['output'];
  toggleTaskDone: Task;
  updateCategory: Category;
  updateRoadmap: Roadmap;
  updateTask: Task;
};


export type MutationCreateCategoryArgs = {
  input: NewCategory;
};


export type MutationCreateRoadmapArgs = {
  input: NewRoadmap;
};


export type MutationCreateTaskArgs = {
  input: NewTask;
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteRoadmapArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteTaskArgs = {
  id: Scalars['ID']['input'];
};


export type MutationToggleTaskDoneArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateCategoryArgs = {
  id: Scalars['ID']['input'];
  input: NewCategory;
};


export type MutationUpdateRoadmapArgs = {
  id: Scalars['ID']['input'];
  input: NewRoadmap;
};


export type MutationUpdateTaskArgs = {
  id: Scalars['ID']['input'];
  input: NewTask;
};

export type NewCategory = {
  description?: InputMaybe<Scalars['String']['input']>;
  lifetime: Scalars['String']['input'];
  name: Scalars['String']['input'];
  roadmapId: Scalars['ID']['input'];
};

export type NewRoadmap = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type NewTask = {
  categoryId: Scalars['ID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  isDaily: Scalars['Boolean']['input'];
  lifetime?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  categories: Array<Category>;
  dailyTasks: Array<Task>;
  expiredTasks: Array<Task>;
  pendingTasks: Array<Task>;
  roadmaps: Array<Roadmap>;
  tasks: Array<Task>;
};


export type QueryCategoriesArgs = {
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
};


export type QueryDailyTasksArgs = {
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
};


export type QueryExpiredTasksArgs = {
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
};


export type QueryPendingTasksArgs = {
  categoryId: Scalars['ID']['input'];
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
};


export type QueryRoadmapsArgs = {
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
};


export type QueryTasksArgs = {
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
};

export type Roadmap = {
  __typename?: 'Roadmap';
  categories: Array<Category>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Task = {
  __typename?: 'Task';
  category: Category;
  description?: Maybe<Scalars['String']['output']>;
  done: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  isDaily: Scalars['Boolean']['output'];
  isExpired: Scalars['Boolean']['output'];
  lifetime?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

export type GetRoadmapsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
}>;


export type GetRoadmapsQuery = { __typename?: 'Query', roadmaps: Array<{ __typename?: 'Roadmap', id: string, name: string, description?: string | null, categories: Array<{ __typename?: 'Category', id: string, name: string }> }> };


export const GetRoadmapsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRoadmaps"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roadmaps"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetRoadmapsQuery, GetRoadmapsQueryVariables>;