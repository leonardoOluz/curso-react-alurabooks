import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import { BrowserRouter } from "react-router-dom";
import Rotas from "./rotas";
import ABApolloClient from './componentes/ABApolloClient';

const queryClient = new QueryClient();

function App() {
  return (
    <ABApolloClient>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Rotas />
        </BrowserRouter>
      </QueryClientProvider>
    </ABApolloClient>
  )
}

export default App;