// 🛑 NOTICE: generated files should be added to .gitignore
/* eslint-disable */
import * as Types from '../../../Shared/api/models/graphql-models.gen';

import { Moment } from "moment"
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetUserTokenQueryVariables = Types.Exact<{
  phoneNumber: Types.Scalars['String']['input'];
  password: Types.Scalars['String']['input'];
}>;


export type GetUserTokenQuery = { token: string | null };


export const GetUserTokenDocument = gql`
    query getUserToken($phoneNumber: String!, $password: String!) {
  token(phoneNumber: $phoneNumber, password: $password)
}
    `;

/**
 * __useGetUserTokenQuery__
 *
 * To run a query within a React component, call `useGetUserTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserTokenQuery({
 *   variables: {
 *      phoneNumber: // value for 'phoneNumber'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useGetUserTokenQuery(baseOptions: Apollo.QueryHookOptions<GetUserTokenQuery, GetUserTokenQueryVariables> & ({ variables: GetUserTokenQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserTokenQuery, GetUserTokenQueryVariables>(GetUserTokenDocument, options);
      }
export function useGetUserTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserTokenQuery, GetUserTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserTokenQuery, GetUserTokenQueryVariables>(GetUserTokenDocument, options);
        }
export function useGetUserTokenSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUserTokenQuery, GetUserTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserTokenQuery, GetUserTokenQueryVariables>(GetUserTokenDocument, options);
        }
export type GetUserTokenQueryHookResult = ReturnType<typeof useGetUserTokenQuery>;
export type GetUserTokenLazyQueryHookResult = ReturnType<typeof useGetUserTokenLazyQuery>;
export type GetUserTokenSuspenseQueryHookResult = ReturnType<typeof useGetUserTokenSuspenseQuery>;
export type GetUserTokenQueryResult = Apollo.QueryResult<GetUserTokenQuery, GetUserTokenQueryVariables>;