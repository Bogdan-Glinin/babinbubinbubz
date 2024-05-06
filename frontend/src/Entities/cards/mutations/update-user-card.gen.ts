// 🛑 NOTICE: generated files should be added to .gitignore
/* eslint-disable */
import * as Types from '../../../Shared/api/models/graphql-models.gen';

import { Moment } from "moment"
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateUserCardMutationVariables = Types.Exact<{
  cardData: Types.InputMaybe<Types.CardInput>;
}>;


export type UpdateUserCardMutation = { updateCard: string | null };


export const UpdateUserCardDocument = gql`
    mutation UpdateUserCard($cardData: CardInput) {
  updateCard(cardData: $cardData)
}
    `;
export type UpdateUserCardMutationFn = Apollo.MutationFunction<UpdateUserCardMutation, UpdateUserCardMutationVariables>;

/**
 * __useUpdateUserCardMutation__
 *
 * To run a mutation, you first call `useUpdateUserCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserCardMutation, { data, loading, error }] = useUpdateUserCardMutation({
 *   variables: {
 *      cardData: // value for 'cardData'
 *   },
 * });
 */
export function useUpdateUserCardMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserCardMutation, UpdateUserCardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserCardMutation, UpdateUserCardMutationVariables>(UpdateUserCardDocument, options);
      }
export type UpdateUserCardMutationHookResult = ReturnType<typeof useUpdateUserCardMutation>;
export type UpdateUserCardMutationResult = Apollo.MutationResult<UpdateUserCardMutation>;
export type UpdateUserCardMutationOptions = Apollo.BaseMutationOptions<UpdateUserCardMutation, UpdateUserCardMutationVariables>;