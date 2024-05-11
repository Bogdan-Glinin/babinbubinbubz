const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
const schema = require("./src/schema/schema");
const pool = require("./src/db");
const userResolver = require("./src/graphql/resolvers/user");
const tokenResolver = require("./src/graphql/resolvers/token");
const transactionsResolver = require("./src/graphql/resolvers/transactions");
const cardsResolver = require("./src/graphql/resolvers/cards");
const transactionsForChartResolver = require("./src/graphql/resolvers/transactions-for-charts");

const app = express();
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

const root = {
  ...userResolver,
  ...tokenResolver,
  ...transactionsResolver,
  ...cardsResolver,
  ...transactionsForChartResolver,
};

app.use(
  "/graphql",
  graphqlHTTP(async (req, res, params) => {
    const authorization = req.headers.authorization || "";
    return {
      schema,
      context: { authorization },
      graphiql: true,
      rootValue: root,
    };
  })
);

app.listen(5000, () => console.log("sever started 5000"));
