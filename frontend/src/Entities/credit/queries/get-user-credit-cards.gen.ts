// 🛑 NOTICE: generated files should be added to .gitignore
/* eslint-disable */
import * as Types from '../../../Shared/api/models/graphql-models.gen';

import { Moment } from "moment"
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetUerCreditCardsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetUerCreditCardsQuery = { userCreditCards: Array<{ id: string | null, userid: string | null, name: string | null, balance: number | null, interestrate: number | null, limit: number | null, dischargedate: string | null, minpayment: number | null } | null> | null, user: { subscriptiontype: string | null } | null };


export const GetUerCreditCardsDocument = gql`
    query GetUerCreditCards {
  userCreditCards {
    id
    userid
    name
    balance
    interestrate
    limit
    dischargedate
    minpayment
  }
  user {
    subscriptiontype
  }
}
    `;

/**
 * __useGetUerCreditCardsQuery__
 *
 * To run a query within a React component, call `useGetUerCreditCardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUerCreditCardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUerCreditCardsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUerCreditCardsQuery(baseOptions?: Apollo.QueryHookOptions<GetUerCreditCardsQuery, GetUerCreditCardsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUerCreditCardsQuery, GetUerCreditCardsQueryVariables>(GetUerCreditCardsDocument, options);
      }
export function useGetUerCreditCardsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUerCreditCardsQuery, GetUerCreditCardsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUerCreditCardsQuery, GetUerCreditCardsQueryVariables>(GetUerCreditCardsDocument, options);
        }
export function useGetUerCreditCardsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUerCreditCardsQuery, GetUerCreditCardsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUerCreditCardsQuery, GetUerCreditCardsQueryVariables>(GetUerCreditCardsDocument, options);
        }
export type GetUerCreditCardsQueryHookResult = ReturnType<typeof useGetUerCreditCardsQuery>;
export type GetUerCreditCardsLazyQueryHookResult = ReturnType<typeof useGetUerCreditCardsLazyQuery>;
export type GetUerCreditCardsSuspenseQueryHookResult = ReturnType<typeof useGetUerCreditCardsSuspenseQuery>;
export type GetUerCreditCardsQueryResult = Apollo.QueryResult<GetUerCreditCardsQuery, GetUerCreditCardsQueryVariables>;