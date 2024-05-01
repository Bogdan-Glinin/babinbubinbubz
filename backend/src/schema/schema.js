const { buildSchema } = require("graphql");

const schema = buildSchema(`
type User{
    id: ID
    name: String
    phoneNumber: String
    password: String
    subscriptionType: String
    subscriptionExpirationDate: String
    isOnboardingComplete: Boolean
}

type Transactions{
    id: ID
    userid: ID
    category: String
    name: String
    amount: Float
    icon: String
    date: String
    type: String
}

type Post {
    id: ID
    title: String
    content: String
}

input UserInput {
    name: String
    phoneNumber: String
    password: String
    subscriptionType: String
    subscriptionExpirationDate: String
    isOnboardingComplete: Boolean
}

input TransactionInput{
    id: String
    category: String!
    name: String!
    amount: Float!
    icon: String!
    date: String!
    type: String!
}

input PostInput {
    id: ID
    title: String!
    content: String!
}


type Query {
    allUsers: [User]
    user: User
    token(phoneNumber: String! password:String!): String
    userTransactions: [Transactions]
}

type Mutation {
    createUser(userData: UserInput): String
    onboardingUser(userData: UserInput): String
    createTransaction(transactionData: TransactionInput): String
    deleteTransaction(transactionId: ID): String
    updateTransaction(transactionData: TransactionInput): String
}
`);

module.exports = schema;
