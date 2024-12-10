import ReactDOM from 'react-dom/client'
import { Provider} from 'react-redux';
import App from "./App.js";
import './index.css'
import store from './store/store.js';
import { QueryClient,QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();
// QueryClient 생성하여 react-query를 설정s
ReactDOM.createRoot(document.getElementById('root')!).render(

  
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
    <App />
    </QueryClientProvider>
  </Provider>
)
