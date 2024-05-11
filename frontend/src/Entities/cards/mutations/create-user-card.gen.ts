// 🛑 NOTICE: generated files should be added to .gitignore
/* eslint-disable */
import * as Types from '../../../Shared/api/models/graphql-models.gen';

import { Moment } from "moment"
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateUserCardMutationVariables = Types.Exact<{
  cardData: Types.InputMaybe<Types.CardInput>;
}>;


export type CreateUserCardMutation = { createCard: string | null };


export const CreateUserCardDocument = gql`
    mutation CreateUserCard($cardData: CardInput) {
  createCard(cardData: $cardData)
}
    `;
export type CreateUserCardMutationFn = Apollo.MutationFunction<CreateUserCardMutation, CreateUserCardMutationVariables>;

/**
 * __useCreateUserCardMutation__
 *
 * To run a mutation, you first call `useCreateUserCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserCardMutation, { data, loading, error }] = useCreateUserCardMutation({
 *   variables: {
 *      cardData: // value for 'cardData'
 *   },
 * });
 */
export function useCreateUserCardMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserCardMutation, CreateUserCardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserCardMutation, CreateUserCardMutationVariables>(CreateUserCardDocument, options);
      }
export type CreateUserCardMutationHookResult = ReturnType<typeof useCreateUserCardMutation>;
export type CreateUserCardMutationResult = Apollo.MutationResult<CreateUserCardMutation>;
export type CreateUserCardMutationOptions = Apollo.BaseMutationOptions<CreateUserCardMutation, CreateUserCardMutationVariables>;