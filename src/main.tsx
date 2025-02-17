import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import store from './redux/store.ts';
import { App } from './App.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <ToastContainer limit={3} />
                <App />
            </BrowserRouter>
        </Provider>
    </StrictMode>,
);
