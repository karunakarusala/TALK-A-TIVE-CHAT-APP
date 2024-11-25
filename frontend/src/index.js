import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom'
import App from './App';
import ChatProvider from './context/chatProvider';
import {Provider} from './components/ui/provider'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
   <BrowserRouter>
     <ChatProvider>    
           <Provider>
             <App/>
           </Provider>    
     </ChatProvider> 
     </BrowserRouter> 
);

