// import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserHistory } from "history";
export let history = createBrowserHistory({ window });
// import Rotas from './rotas';
import './App.css';
import { BrowserRouter } from "react-router-dom";
import Rotas from "./rotas";

const queryClient = new QueryClient();

/* function App() {
  return (<QueryClientProvider client={queryClient}>
    <HistoryRouter history={history.action}>
      <Rotas />
    </HistoryRouter>
  </QueryClientProvider>);
} */

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Rotas />
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App;
