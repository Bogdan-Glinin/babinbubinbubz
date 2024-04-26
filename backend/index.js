const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
const schema = require("./src/schema/schema");
const pool = require("./src/db");
const userResolver = require("./src/graphql/resolvers/user");

const app = express();
app.use(cors());

const root = {
  ...userResolver,
};

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root,
  })
);

app.listen(5000, () => console.log("sever started 5000"));
