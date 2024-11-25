// import React from 'react';
// import './App.css'
// import {createBrowserRouter,RouterProvider} from 'react-router-dom'
// import { Toaster } from './components/ui/toaster';
// //import { Button } from "./components/ui/button"
// import HomePage from './pages/Homepage'
// import Chatpage from './pages/Chatpage';

// function App() {
//  const routers =  createBrowserRouter([
//   {
//      path : '/',
//      element :<HomePage/>
//   },
//   {
//     path :'/chat',
//     element :<Chatpage/>
//   }

// ])
//   return (
    
//    < div className='App'>

//          <Toaster/>
//        <RouterProvider  router={routers}/>
      
//    </div>    
//   );
// }
// export default App;


import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import HomePage from './pages/Homepage';
import Chatpage from './pages/Chatpage';

function App() {
  return (
    <div className="App">
   
      <Toaster />
      <Routes>
        <Route path="/home" element={<HomePage />} exact  />
        <Route path="/chat" element={<Chatpage />} />
      </Routes>
    </div>
  );
}

export default App;
