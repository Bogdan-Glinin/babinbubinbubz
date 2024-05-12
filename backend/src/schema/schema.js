const { buildSchema } = require("graphql");

const schema = buildSchema(`
type User{
    id: ID
    name: String
    phoneNumber: String
    password: String
    subscriptiontype: String
    subscriptionExpirationDate: String
    isonboardingcomplete: Boolean
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
    interestrate: Float
    minpayment: Float
    limit: Float
    dischargedate: String
}

type chartDataType{
    value: Float
    date: String
}

type creditCardIncomeChartData{
    amount: Float
    date: String
}
type creditCardIncome{
    cardId: String
    cardIncomes: [creditCardIncomeChartData]
}

type transactionForChart {
    expense: [chartDataType]
    income: [chartDataType]
}

input onboadringType{
    subscriptionType: String
    cardName: String
    cardBalance: Float
}

input UserInput {
    name: String
    phoneNumber: String
    password: String
    subscriptiontype: String
    subscriptionExpirationDate: String
    isonboardingcomplete: Boolean
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
    interestrate: Float
    limit: Float
    dischargedate: String
    minpayment: Float
}

type Query {
    allUsers: [User]
    user: User
    token(phoneNumber: String! password:String!): String
    userTransactions: [Transactions]
    userCards: [Cards]
    userCreditCards: [Cards]
    transactionForChart(dataType: String): transactionForChart
    allCreditCardIncome(cardIds: [String]): [creditCardIncome]
}

type Mutation {
    createUser(userData: UserInput): String
    onboardingUser(data: onboadringType): String
    createTransaction(transactionData: TransactionInput): String
    deleteTransaction(transactionId: ID): String
    updateTransaction(transactionData: TransactionInput): String
    createCard(cardData: CardInput): String
    updateCard(cardData: CardInput): String
}
`);

module.exports = schema;
