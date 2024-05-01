// 🛑 NOTICE: generated files should be added to .gitignore
/* eslint-disable */
import * as Types from '../../../Shared/api/models/graphql-models.gen';

import { Moment } from "moment"
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteUserTransactionMutationVariables = Types.Exact<{
  transactionId: Types.InputMaybe<Types.Scalars['ID']['input']>;
}>;


export type DeleteUserTransactionMutation = { deleteTransaction: string | null };


export const DeleteUserTransactionDocument = gql`
    mutation DeleteUserTransaction($transactionId: ID) {
  deleteTransaction(transactionId: $transactionId)
}
    `;
export type DeleteUserTransactionMutationFn = Apollo.MutationFunction<DeleteUserTransactionMutation, DeleteUserTransactionMutationVariables>;

/**
 * __useDeleteUserTransactionMutation__
 *
 * To run a mutation, you first call `useDeleteUserTransactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserTransactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserTransactionMutation, { data, loading, error }] = useDeleteUserTransactionMutation({
 *   variables: {
 *      transactionId: // value for 'transactionId'
 *   },
 * });
 */
export function useDeleteUserTransactionMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserTransactionMutation, DeleteUserTransactionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserTransactionMutation, DeleteUserTransactionMutationVariables>(DeleteUserTransactionDocument, options);
      }
export type DeleteUserTransactionMutationHookResult = ReturnType<typeof useDeleteUserTransactionMutation>;
export type DeleteUserTransactionMutationResult = Apollo.MutationResult<DeleteUserTransactionMutation>;
export type DeleteUserTransactionMutationOptions = Apollo.BaseMutationOptions<DeleteUserTransactionMutation, DeleteUserTransactionMutationVariables>;