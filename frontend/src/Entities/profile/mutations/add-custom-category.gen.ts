// 🛑 NOTICE: generated files should be added to .gitignore
/* eslint-disable */
import * as Types from '../../../Shared/api/models/graphql-models.gen';

import { Moment } from "moment"
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AddCustomCategoryMutationVariables = Types.Exact<{
  categoryData: Types.InputMaybe<Types.CustomCategoryInput>;
}>;


export type AddCustomCategoryMutation = { createCustomCategory: string | null };


export const AddCustomCategoryDocument = gql`
    mutation AddCustomCategory($categoryData: customCategoryInput) {
  createCustomCategory(categoryData: $categoryData)
}
    `;
export type AddCustomCategoryMutationFn = Apollo.MutationFunction<AddCustomCategoryMutation, AddCustomCategoryMutationVariables>;

/**
 * __useAddCustomCategoryMutation__
 *
 * To run a mutation, you first call `useAddCustomCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCustomCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCustomCategoryMutation, { data, loading, error }] = useAddCustomCategoryMutation({
 *   variables: {
 *      categoryData: // value for 'categoryData'
 *   },
 * });
 */
export function useAddCustomCategoryMutation(baseOptions?: Apollo.MutationHookOptions<AddCustomCategoryMutation, AddCustomCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddCustomCategoryMutation, AddCustomCategoryMutationVariables>(AddCustomCategoryDocument, options);
      }
export type AddCustomCategoryMutationHookResult = ReturnType<typeof useAddCustomCategoryMutation>;
export type AddCustomCategoryMutationResult = Apollo.MutationResult<AddCustomCategoryMutation>;
export type AddCustomCategoryMutationOptions = Apollo.BaseMutationOptions<AddCustomCategoryMutation, AddCustomCategoryMutationVariables>;