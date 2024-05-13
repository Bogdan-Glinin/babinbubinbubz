// 🛑 NOTICE: generated files should be added to .gitignore
/* eslint-disable */
import * as Types from '../../../Shared/api/models/graphql-models.gen';

import { Moment } from "moment"
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetUserCustomCategoriesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetUserCustomCategoriesQuery = { userCustomCategories: Array<{ name: string | null, type: string | null, icon: string | null } | null> | null };


export const GetUserCustomCategoriesDocument = gql`
    query GetUserCustomCategories {
  userCustomCategories {
    name
    type
    icon
  }
}
    `;

/**
 * __useGetUserCustomCategoriesQuery__
 *
 * To run a query within a React component, call `useGetUserCustomCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserCustomCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserCustomCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserCustomCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetUserCustomCategoriesQuery, GetUserCustomCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserCustomCategoriesQuery, GetUserCustomCategoriesQueryVariables>(GetUserCustomCategoriesDocument, options);
      }
export function useGetUserCustomCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserCustomCategoriesQuery, GetUserCustomCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserCustomCategoriesQuery, GetUserCustomCategoriesQueryVariables>(GetUserCustomCategoriesDocument, options);
        }
export function useGetUserCustomCategoriesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUserCustomCategoriesQuery, GetUserCustomCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserCustomCategoriesQuery, GetUserCustomCategoriesQueryVariables>(GetUserCustomCategoriesDocument, options);
        }
export type GetUserCustomCategoriesQueryHookResult = ReturnType<typeof useGetUserCustomCategoriesQuery>;
export type GetUserCustomCategoriesLazyQueryHookResult = ReturnType<typeof useGetUserCustomCategoriesLazyQuery>;
export type GetUserCustomCategoriesSuspenseQueryHookResult = ReturnType<typeof useGetUserCustomCategoriesSuspenseQuery>;
export type GetUserCustomCategoriesQueryResult = Apollo.QueryResult<GetUserCustomCategoriesQuery, GetUserCustomCategoriesQueryVariables>;