// 🛑 NOTICE: generated files should be added to .gitignore
/* eslint-disable */
import * as Types from '../../../Shared/api/models/graphql-models.gen';

import { Moment } from "moment"
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetCreditCardIncomesQueryVariables = Types.Exact<{
  cardIds: Types.InputMaybe<Array<Types.InputMaybe<Types.Scalars['String']['input']>> | Types.InputMaybe<Types.Scalars['String']['input']>>;
}>;


export type GetCreditCardIncomesQuery = { allCreditCardIncome: Array<{ cardId: string | null, cardIncomes: Array<{ amount: number | null, date: string | null } | null> | null } | null> | null };


export const GetCreditCardIncomesDocument = gql`
    query GetCreditCardIncomes($cardIds: [String]) {
  allCreditCardIncome(cardIds: $cardIds) {
    cardId
    cardIncomes {
      amount
      date
    }
  }
}
    `;

/**
 * __useGetCreditCardIncomesQuery__
 *
 * To run a query within a React component, call `useGetCreditCardIncomesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCreditCardIncomesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCreditCardIncomesQuery({
 *   variables: {
 *      cardIds: // value for 'cardIds'
 *   },
 * });
 */
export function useGetCreditCardIncomesQuery(baseOptions?: Apollo.QueryHookOptions<GetCreditCardIncomesQuery, GetCreditCardIncomesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCreditCardIncomesQuery, GetCreditCardIncomesQueryVariables>(GetCreditCardIncomesDocument, options);
      }
export function useGetCreditCardIncomesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCreditCardIncomesQuery, GetCreditCardIncomesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCreditCardIncomesQuery, GetCreditCardIncomesQueryVariables>(GetCreditCardIncomesDocument, options);
        }
export function useGetCreditCardIncomesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCreditCardIncomesQuery, GetCreditCardIncomesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCreditCardIncomesQuery, GetCreditCardIncomesQueryVariables>(GetCreditCardIncomesDocument, options);
        }
export type GetCreditCardIncomesQueryHookResult = ReturnType<typeof useGetCreditCardIncomesQuery>;
export type GetCreditCardIncomesLazyQueryHookResult = ReturnType<typeof useGetCreditCardIncomesLazyQuery>;
export type GetCreditCardIncomesSuspenseQueryHookResult = ReturnType<typeof useGetCreditCardIncomesSuspenseQuery>;
export type GetCreditCardIncomesQueryResult = Apollo.QueryResult<GetCreditCardIncomesQuery, GetCreditCardIncomesQueryVariables>;