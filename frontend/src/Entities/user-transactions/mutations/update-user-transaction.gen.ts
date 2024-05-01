// 🛑 NOTICE: generated files should be added to .gitignore
/* eslint-disable */
import * as Types from '../../../Shared/api/models/graphql-models.gen';

import { Moment } from "moment"
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateUserTransactionMutationVariables = Types.Exact<{
  transactionData: Types.InputMaybe<Types.TransactionInput>;
}>;


export type UpdateUserTransactionMutation = { updateTransaction: string | null };


export const UpdateUserTransactionDocument = gql`
    mutation UpdateUserTransaction($transactionData: TransactionInput) {
  updateTransaction(transactionData: $transactionData)
}
    `;
export type UpdateUserTransactionMutationFn = Apollo.MutationFunction<UpdateUserTransactionMutation, UpdateUserTransactionMutationVariables>;

/**
 * __useUpdateUserTransactionMutation__
 *
 * To run a mutation, you first call `useUpdateUserTransactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserTransactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserTransactionMutation, { data, loading, error }] = useUpdateUserTransactionMutation({
 *   variables: {
 *      transactionData: // value for 'transactionData'
 *   },
 * });
 */
export function useUpdateUserTransactionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserTransactionMutation, UpdateUserTransactionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserTransactionMutation, UpdateUserTransactionMutationVariables>(UpdateUserTransactionDocument, options);
      }
export type UpdateUserTransactionMutationHookResult = ReturnType<typeof useUpdateUserTransactionMutation>;
export type UpdateUserTransactionMutationResult = Apollo.MutationResult<UpdateUserTransactionMutation>;
export type UpdateUserTransactionMutationOptions = Apollo.BaseMutationOptions<UpdateUserTransactionMutation, UpdateUserTransactionMutationVariables>;