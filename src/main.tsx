import ReactDOM from 'react-dom/client'
import { Provider} from 'react-redux';
import App from "./App.js";
import './index.css'
import store from './store/store.js';
import { QueryClient,QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')!).render(

  
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
    <App />
    </QueryClientProvider>
  </Provider>
)
