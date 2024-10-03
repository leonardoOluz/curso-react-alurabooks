import {
  ApolloClient, ApolloProvider,
  InMemoryCache, ApolloLink} from "@apollo/client";
import useObterToken from "../../hooks/useObterToken";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'http://localhost:9000/graphql'
});

type Props = {
  children: JSX.Element
}

const ABApolloClient = ({ children }: Props) => {
  return (<ApolloProvider client={client}>
    {children}
  </ApolloProvider>)
}

export const outLink = new ApolloLink((operation, forward) => {
  const token = useObterToken();
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : ''
    }
  })
  return forward(operation)
})

export default ABApolloClient