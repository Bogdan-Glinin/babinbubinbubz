import { RouterProvider } from "react-router-dom";
import { routes } from "../Shared/config/routes";
import styled from "styled-components";
import { ApolloProvider } from "@apollo/client";
import { client } from "../Shared/config/graphql";

function App() {
  return (
    <StyledLayout>
      <ApolloProvider client={client}>
        <RouterProvider router={routes} />
      </ApolloProvider>
    </StyledLayout>
  );
}

export default App;

const StyledLayout = styled.div`
  background-color: #e4e4e4;
  height: 100vh;
  font-family: "Courier New", Courier, monospace;
`;
