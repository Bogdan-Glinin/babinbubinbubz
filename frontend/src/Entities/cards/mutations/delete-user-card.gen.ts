// 🛑 NOTICE: generated files should be added to .gitignore
/* eslint-disable */
import * as Types from '../../../Shared/api/models/graphql-models.gen';

import { Moment } from "moment"
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteUserCardMutationVariables = Types.Exact<{
  cardId: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type DeleteUserCardMutation = { deleteCard: string | null };


export const DeleteUserCardDocument = gql`
    mutation DeleteUserCard($cardId: String) {
  deleteCard(cardId: $cardId)
}
    `;
export type DeleteUserCardMutationFn = Apollo.MutationFunction<DeleteUserCardMutation, DeleteUserCardMutationVariables>;

/**
 * __useDeleteUserCardMutation__
 *
 * To run a mutation, you first call `useDeleteUserCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserCardMutation, { data, loading, error }] = useDeleteUserCardMutation({
 *   variables: {
 *      cardId: // value for 'cardId'
 *   },
 * });
 */
export function useDeleteUserCardMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserCardMutation, DeleteUserCardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserCardMutation, DeleteUserCardMutationVariables>(DeleteUserCardDocument, options);
      }
export type DeleteUserCardMutationHookResult = ReturnType<typeof useDeleteUserCardMutation>;
export type DeleteUserCardMutationResult = Apollo.MutationResult<DeleteUserCardMutation>;
export type DeleteUserCardMutationOptions = Apollo.BaseMutationOptions<DeleteUserCardMutation, DeleteUserCardMutationVariables>;