import { RouterProvider } from "react-router-dom";
import { routes } from "../Shared/config/routes";
import styled from "styled-components";
import { ApolloProvider } from "@apollo/client";
import { client } from "../Shared/config/graphql";
import { ConfigProvider } from "antd";
import ruRU from "antd/lib/locale/ru_RU";

function App() {
  return (
    <StyledLayout>
      <ConfigProvider locale={ruRU}>
        <ApolloProvider client={client}>
          <RouterProvider router={routes} />
        </ApolloProvider>
      </ConfigProvider>
    </StyledLayout>
  );
}

export default App;

const StyledLayout = styled.div`
  background-color: #e4e4e4;
  font-family: "Courier New", Courier, monospace;
  height: 100vh;
  width: 100vw;
`;
