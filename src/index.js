import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom"

// redux사용 시 import할 것
import { Provider } from 'react-redux';
import store from './store';

// react-query 사용 시 import할 것
// (실시간으로 계속해서 ajax로 데이터를 가져와야 하는(ex)코인거래소)
// 사이트에서 사용해야하는 라이브러리)
import { QueryClient, QueryClientProvider } from "react-query"

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  {/*  위와 같이 <Provider> 사용함으로 store.js에 있던 state를
   App 내에서 사용 가능하게 함. */}
  </QueryClientProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
