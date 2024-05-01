// 🛑 NOTICE: generated files should be added to .gitignore
/* eslint-disable */
import * as Types from '../../../Shared/api/models/graphql-models.gen';

import { Moment } from "moment"
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateUserTransactionMutationVariables = Types.Exact<{
  transactionData: Types.InputMaybe<Types.TransactionInput>;
}>;


export type CreateUserTransactionMutation = { createTransaction: string | null };


export const CreateUserTransactionDocument = gql`
    mutation CreateUserTransaction($transactionData: TransactionInput) {
  createTransaction(transactionData: $transactionData)
}
    `;
export type CreateUserTransactionMutationFn = Apollo.MutationFunction<CreateUserTransactionMutation, CreateUserTransactionMutationVariables>;

/**
 * __useCreateUserTransactionMutation__
 *
 * To run a mutation, you first call `useCreateUserTransactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserTransactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserTransactionMutation, { data, loading, error }] = useCreateUserTransactionMutation({
 *   variables: {
 *      transactionData: // value for 'transactionData'
 *   },
 * });
 */
export function useCreateUserTransactionMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserTransactionMutation, CreateUserTransactionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserTransactionMutation, CreateUserTransactionMutationVariables>(CreateUserTransactionDocument, options);
      }
export type CreateUserTransactionMutationHookResult = ReturnType<typeof useCreateUserTransactionMutation>;
export type CreateUserTransactionMutationResult = Apollo.MutationResult<CreateUserTransactionMutation>;
export type CreateUserTransactionMutationOptions = Apollo.BaseMutationOptions<CreateUserTransactionMutation, CreateUserTransactionMutationVariables>;