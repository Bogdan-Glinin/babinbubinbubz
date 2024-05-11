// 🛑 NOTICE: generated files should be added to .gitignore
/* eslint-disable */
import * as Types from '../../../Shared/api/models/graphql-models.gen';

import { Moment } from "moment"
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CompliteOnboadringUserMutationVariables = Types.Exact<{
  data: Types.InputMaybe<Types.OnboadringType>;
}>;


export type CompliteOnboadringUserMutation = { onboardingUser: string | null };


export const CompliteOnboadringUserDocument = gql`
    mutation CompliteOnboadringUser($data: onboadringType) {
  onboardingUser(data: $data)
}
    `;
export type CompliteOnboadringUserMutationFn = Apollo.MutationFunction<CompliteOnboadringUserMutation, CompliteOnboadringUserMutationVariables>;

/**
 * __useCompliteOnboadringUserMutation__
 *
 * To run a mutation, you first call `useCompliteOnboadringUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCompliteOnboadringUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [compliteOnboadringUserMutation, { data, loading, error }] = useCompliteOnboadringUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCompliteOnboadringUserMutation(baseOptions?: Apollo.MutationHookOptions<CompliteOnboadringUserMutation, CompliteOnboadringUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CompliteOnboadringUserMutation, CompliteOnboadringUserMutationVariables>(CompliteOnboadringUserDocument, options);
      }
export type CompliteOnboadringUserMutationHookResult = ReturnType<typeof useCompliteOnboadringUserMutation>;
export type CompliteOnboadringUserMutationResult = Apollo.MutationResult<CompliteOnboadringUserMutation>;
export type CompliteOnboadringUserMutationOptions = Apollo.BaseMutationOptions<CompliteOnboadringUserMutation, CompliteOnboadringUserMutationVariables>;