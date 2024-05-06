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
    cardid: ID
    category: String
    name: String
    amount: Float
    icon: String
    date: String
    type: String
}

type Cards{
    id: ID
    userid: ID
    name: String
    balance: Float
    iscredit: Boolean
    interesrate: Float
    limit: Float
    dischargedate: String
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
    cardid: String!
    category: String!
    name: String!
    amount: Float!
    icon: String!
    date: String!
    type: String!
}

input CardInput{
    id: ID
    name: String
    balance: Float
    iscredit: Boolean
    interesrate: Float
    limit: Float
    dischargedate: String
}

type Query {
    allUsers: [User]
    user: User
    token(phoneNumber: String! password:String!): String
    userTransactions: [Transactions]
    userCards: [Cards]
}

type Mutation {
    createUser(userData: UserInput): String
    onboardingUser(userData: UserInput): String
    createTransaction(transactionData: TransactionInput): String
    deleteTransaction(transactionId: ID): String
    updateTransaction(transactionData: TransactionInput): String
    createCard(cardData: CardInput): String
    updateCard(cardData: CardInput): String
}
`);

module.exports = schema;
