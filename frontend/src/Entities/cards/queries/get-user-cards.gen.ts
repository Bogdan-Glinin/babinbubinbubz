// 🛑 NOTICE: generated files should be added to .gitignore
/* eslint-disable */
import * as Types from '../../../Shared/api/models/graphql-models.gen';

import { Moment } from "moment"
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetUserCardsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetUserCardsQuery = { userCards: Array<{ id: string | null, userid: string | null, name: string | null, balance: number | null, iscredit: boolean | null, interesrate: number | null, limit: number | null, dischargedate: string | null } | null> | null };


export const GetUserCardsDocument = gql`
    query GetUserCards {
  userCards {
    id
    userid
    name
    balance
    iscredit
    interesrate
    limit
    dischargedate
  }
}
    `;

/**
 * __useGetUserCardsQuery__
 *
 * To run a query within a React component, call `useGetUserCardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserCardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserCardsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserCardsQuery(baseOptions?: Apollo.QueryHookOptions<GetUserCardsQuery, GetUserCardsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserCardsQuery, GetUserCardsQueryVariables>(GetUserCardsDocument, options);
      }
export function useGetUserCardsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserCardsQuery, GetUserCardsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserCardsQuery, GetUserCardsQueryVariables>(GetUserCardsDocument, options);
        }
export function useGetUserCardsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUserCardsQuery, GetUserCardsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserCardsQuery, GetUserCardsQueryVariables>(GetUserCardsDocument, options);
        }
export type GetUserCardsQueryHookResult = ReturnType<typeof useGetUserCardsQuery>;
export type GetUserCardsLazyQueryHookResult = ReturnType<typeof useGetUserCardsLazyQuery>;
export type GetUserCardsSuspenseQueryHookResult = ReturnType<typeof useGetUserCardsSuspenseQuery>;
export type GetUserCardsQueryResult = Apollo.QueryResult<GetUserCardsQuery, GetUserCardsQueryVariables>;