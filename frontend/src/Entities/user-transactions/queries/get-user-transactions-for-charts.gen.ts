// 🛑 NOTICE: generated files should be added to .gitignore
/* eslint-disable */
import * as Types from '../../../Shared/api/models/graphql-models.gen';

import { Moment } from "moment"
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetUserTransactionsForChartsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetUserTransactionsForChartsQuery = { transactionForChart: { income: Array<{ value: number | null, date: string | null } | null> | null, expense: Array<{ value: number | null, date: string | null } | null> | null } | null };


export const GetUserTransactionsForChartsDocument = gql`
    query GetUserTransactionsForCharts {
  transactionForChart {
    income {
      value
      date
    }
    expense {
      value
      date
    }
  }
}
    `;

/**
 * __useGetUserTransactionsForChartsQuery__
 *
 * To run a query within a React component, call `useGetUserTransactionsForChartsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserTransactionsForChartsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserTransactionsForChartsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserTransactionsForChartsQuery(baseOptions?: Apollo.QueryHookOptions<GetUserTransactionsForChartsQuery, GetUserTransactionsForChartsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserTransactionsForChartsQuery, GetUserTransactionsForChartsQueryVariables>(GetUserTransactionsForChartsDocument, options);
      }
export function useGetUserTransactionsForChartsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserTransactionsForChartsQuery, GetUserTransactionsForChartsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserTransactionsForChartsQuery, GetUserTransactionsForChartsQueryVariables>(GetUserTransactionsForChartsDocument, options);
        }
export function useGetUserTransactionsForChartsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUserTransactionsForChartsQuery, GetUserTransactionsForChartsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserTransactionsForChartsQuery, GetUserTransactionsForChartsQueryVariables>(GetUserTransactionsForChartsDocument, options);
        }
export type GetUserTransactionsForChartsQueryHookResult = ReturnType<typeof useGetUserTransactionsForChartsQuery>;
export type GetUserTransactionsForChartsLazyQueryHookResult = ReturnType<typeof useGetUserTransactionsForChartsLazyQuery>;
export type GetUserTransactionsForChartsSuspenseQueryHookResult = ReturnType<typeof useGetUserTransactionsForChartsSuspenseQuery>;
export type GetUserTransactionsForChartsQueryResult = Apollo.QueryResult<GetUserTransactionsForChartsQuery, GetUserTransactionsForChartsQueryVariables>;