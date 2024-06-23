// 🛑 NOTICE: generated files should be added to .gitignore
/* eslint-disable */
import * as Types from '../../../Shared/api/models/graphql-models.gen';

import { Moment } from "moment"
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeteleUserCategeryMutationVariables = Types.Exact<{
  categoryId: Types.InputMaybe<Types.Scalars['String']['input']>;
  categoryName: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type DeteleUserCategeryMutation = { deleteCustomCategory: string | null };


export const DeteleUserCategeryDocument = gql`
    mutation DeteleUserCategery($categoryId: String, $categoryName: String) {
  deleteCustomCategory(categoryId: $categoryId, categoryName: $categoryName)
}
    `;
export type DeteleUserCategeryMutationFn = Apollo.MutationFunction<DeteleUserCategeryMutation, DeteleUserCategeryMutationVariables>;

/**
 * __useDeteleUserCategeryMutation__
 *
 * To run a mutation, you first call `useDeteleUserCategeryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeteleUserCategeryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deteleUserCategeryMutation, { data, loading, error }] = useDeteleUserCategeryMutation({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *      categoryName: // value for 'categoryName'
 *   },
 * });
 */
export function useDeteleUserCategeryMutation(baseOptions?: Apollo.MutationHookOptions<DeteleUserCategeryMutation, DeteleUserCategeryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeteleUserCategeryMutation, DeteleUserCategeryMutationVariables>(DeteleUserCategeryDocument, options);
      }
export type DeteleUserCategeryMutationHookResult = ReturnType<typeof useDeteleUserCategeryMutation>;
export type DeteleUserCategeryMutationResult = Apollo.MutationResult<DeteleUserCategeryMutation>;
export type DeteleUserCategeryMutationOptions = Apollo.BaseMutationOptions<DeteleUserCategeryMutation, DeteleUserCategeryMutationVariables>;