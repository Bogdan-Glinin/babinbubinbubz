// 🛑 NOTICE: generated files should be added to .gitignore
/* eslint-disable */
import { Moment } from "moment"
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CardInput = {
  balance: InputMaybe<Scalars['Float']['input']>;
  dischargedate: InputMaybe<Scalars['String']['input']>;
  id: InputMaybe<Scalars['ID']['input']>;
  interesrate: InputMaybe<Scalars['Float']['input']>;
  iscredit: InputMaybe<Scalars['Boolean']['input']>;
  limit: InputMaybe<Scalars['Float']['input']>;
  name: InputMaybe<Scalars['String']['input']>;
};

export type Cards = {
  balance: Maybe<Scalars['Float']['output']>;
  dischargedate: Maybe<Scalars['String']['output']>;
  id: Maybe<Scalars['ID']['output']>;
  interesrate: Maybe<Scalars['Float']['output']>;
  iscredit: Maybe<Scalars['Boolean']['output']>;
  limit: Maybe<Scalars['Float']['output']>;
  name: Maybe<Scalars['String']['output']>;
  userid: Maybe<Scalars['ID']['output']>;
};

export type Mutation = {
  createCard: Maybe<Scalars['String']['output']>;
  createTransaction: Maybe<Scalars['String']['output']>;
  createUser: Maybe<Scalars['String']['output']>;
  deleteTransaction: Maybe<Scalars['String']['output']>;
  onboardingUser: Maybe<Scalars['String']['output']>;
  updateCard: Maybe<Scalars['String']['output']>;
  updateTransaction: Maybe<Scalars['String']['output']>;
};


export type MutationCreateCardArgs = {
  cardData: InputMaybe<CardInput>;
};


export type MutationCreateTransactionArgs = {
  transactionData: InputMaybe<TransactionInput>;
};


export type MutationCreateUserArgs = {
  userData: InputMaybe<UserInput>;
};


export type MutationDeleteTransactionArgs = {
  transactionId: InputMaybe<Scalars['ID']['input']>;
};


export type MutationOnboardingUserArgs = {
  userData: InputMaybe<UserInput>;
};


export type MutationUpdateCardArgs = {
  cardData: InputMaybe<CardInput>;
};


export type MutationUpdateTransactionArgs = {
  transactionData: InputMaybe<TransactionInput>;
};

export type Query = {
  allUsers: Maybe<Array<Maybe<User>>>;
  token: Maybe<Scalars['String']['output']>;
  user: Maybe<User>;
  userCards: Maybe<Array<Maybe<Cards>>>;
  userTransactions: Maybe<Array<Maybe<Transactions>>>;
};


export type QueryTokenArgs = {
  password: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
};

export type TransactionInput = {
  amount: Scalars['Float']['input'];
  cardid: Scalars['String']['input'];
  category: Scalars['String']['input'];
  date: Scalars['String']['input'];
  icon: Scalars['String']['input'];
  id: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type Transactions = {
  amount: Maybe<Scalars['Float']['output']>;
  cardid: Maybe<Scalars['ID']['output']>;
  category: Maybe<Scalars['String']['output']>;
  date: Maybe<Scalars['String']['output']>;
  icon: Maybe<Scalars['String']['output']>;
  id: Maybe<Scalars['ID']['output']>;
  name: Maybe<Scalars['String']['output']>;
  type: Maybe<Scalars['String']['output']>;
  userid: Maybe<Scalars['ID']['output']>;
};

export type User = {
  id: Maybe<Scalars['ID']['output']>;
  isOnboardingComplete: Maybe<Scalars['Boolean']['output']>;
  name: Maybe<Scalars['String']['output']>;
  password: Maybe<Scalars['String']['output']>;
  phoneNumber: Maybe<Scalars['String']['output']>;
  subscriptionExpirationDate: Maybe<Scalars['String']['output']>;
  subscriptionType: Maybe<Scalars['String']['output']>;
};

export type UserInput = {
  isOnboardingComplete: InputMaybe<Scalars['Boolean']['input']>;
  name: InputMaybe<Scalars['String']['input']>;
  password: InputMaybe<Scalars['String']['input']>;
  phoneNumber: InputMaybe<Scalars['String']['input']>;
  subscriptionExpirationDate: InputMaybe<Scalars['String']['input']>;
  subscriptionType: InputMaybe<Scalars['String']['input']>;
};
