import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import { BrowserRouter } from "react-router-dom";
import Rotas from "./rotas";
import ABApolloClient from './componentes/ABApolloClient';
import CarrinhoProvider from './contextApi/carrinho';

const queryClient = new QueryClient();

function App() {
  return (
    <ABApolloClient>
      <CarrinhoProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Rotas />
          </BrowserRouter>
        </QueryClientProvider>
      </CarrinhoProvider>
    </ABApolloClient>
  )
}

export default App;