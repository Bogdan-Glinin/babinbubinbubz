// 🛑 NOTICE: generated files should be added to .gitignore
/* eslint-disable */
import * as Types from '../../../Shared/api/models/graphql-models.gen';

import { Moment } from "moment"
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetIsUserCompleteOnboardingQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetIsUserCompleteOnboardingQuery = { user: { isonboardingcomplete: boolean | null } | null };


export const GetIsUserCompleteOnboardingDocument = gql`
    query GetIsUserCompleteOnboarding {
  user {
    isonboardingcomplete
  }
}
    `;

/**
 * __useGetIsUserCompleteOnboardingQuery__
 *
 * To run a query within a React component, call `useGetIsUserCompleteOnboardingQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetIsUserCompleteOnboardingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetIsUserCompleteOnboardingQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetIsUserCompleteOnboardingQuery(baseOptions?: Apollo.QueryHookOptions<GetIsUserCompleteOnboardingQuery, GetIsUserCompleteOnboardingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetIsUserCompleteOnboardingQuery, GetIsUserCompleteOnboardingQueryVariables>(GetIsUserCompleteOnboardingDocument, options);
      }
export function useGetIsUserCompleteOnboardingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetIsUserCompleteOnboardingQuery, GetIsUserCompleteOnboardingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetIsUserCompleteOnboardingQuery, GetIsUserCompleteOnboardingQueryVariables>(GetIsUserCompleteOnboardingDocument, options);
        }
export function useGetIsUserCompleteOnboardingSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetIsUserCompleteOnboardingQuery, GetIsUserCompleteOnboardingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetIsUserCompleteOnboardingQuery, GetIsUserCompleteOnboardingQueryVariables>(GetIsUserCompleteOnboardingDocument, options);
        }
export type GetIsUserCompleteOnboardingQueryHookResult = ReturnType<typeof useGetIsUserCompleteOnboardingQuery>;
export type GetIsUserCompleteOnboardingLazyQueryHookResult = ReturnType<typeof useGetIsUserCompleteOnboardingLazyQuery>;
export type GetIsUserCompleteOnboardingSuspenseQueryHookResult = ReturnType<typeof useGetIsUserCompleteOnboardingSuspenseQuery>;
export type GetIsUserCompleteOnboardingQueryResult = Apollo.QueryResult<GetIsUserCompleteOnboardingQuery, GetIsUserCompleteOnboardingQueryVariables>;