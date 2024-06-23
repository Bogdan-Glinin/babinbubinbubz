// 🛑 NOTICE: generated files should be added to .gitignore
/* eslint-disable */
import * as Types from '../../../Shared/api/models/graphql-models.gen';

import { Moment } from "moment"
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetUserRecomendationsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetUserRecomendationsQuery = { recomendations: Array<{ title: string | null, content: string | null } | null> | null };


export const GetUserRecomendationsDocument = gql`
    query GetUserRecomendations {
  recomendations {
    title
    content
  }
}
    `;

/**
 * __useGetUserRecomendationsQuery__
 *
 * To run a query within a React component, call `useGetUserRecomendationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserRecomendationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserRecomendationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserRecomendationsQuery(baseOptions?: Apollo.QueryHookOptions<GetUserRecomendationsQuery, GetUserRecomendationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserRecomendationsQuery, GetUserRecomendationsQueryVariables>(GetUserRecomendationsDocument, options);
      }
export function useGetUserRecomendationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserRecomendationsQuery, GetUserRecomendationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserRecomendationsQuery, GetUserRecomendationsQueryVariables>(GetUserRecomendationsDocument, options);
        }
export function useGetUserRecomendationsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUserRecomendationsQuery, GetUserRecomendationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserRecomendationsQuery, GetUserRecomendationsQueryVariables>(GetUserRecomendationsDocument, options);
        }
export type GetUserRecomendationsQueryHookResult = ReturnType<typeof useGetUserRecomendationsQuery>;
export type GetUserRecomendationsLazyQueryHookResult = ReturnType<typeof useGetUserRecomendationsLazyQuery>;
export type GetUserRecomendationsSuspenseQueryHookResult = ReturnType<typeof useGetUserRecomendationsSuspenseQuery>;
export type GetUserRecomendationsQueryResult = Apollo.QueryResult<GetUserRecomendationsQuery, GetUserRecomendationsQueryVariables>;