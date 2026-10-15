import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Start from './pages/Start.jsx';
import UserLogin from './pages/UserLogin.jsx';
import UserSignup from './pages/UserSignup.jsx';
import CaptainLogin from './pages/CaptainLogin.jsx';
import CaptainSignup from './pages/CaptainSignup.jsx';
import Home from './pages/Home.jsx';
import UserContext from "./context/UserContext.jsx";
import UserProtectWrapper from './pages/UserProtectWrapper.jsx';
import UserLogout from './pages/UserLogout.jsx';
import CaptainLogout from './pages/CaptainLogout.jsx';
import CaptainHome from './pages/CaptainHome.jsx';
import CaptainContext from "./context/CaptainContext.jsx";
import CaptainProtectWrapper from './pages/CaptainProtectWrapper.jsx';

const App = () => {
  return (
    <div>
      <UserContext>
        <CaptainContext>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={ < Start /> } />
        <Route path='/UserLogin' element={ < UserLogin /> } />
        <Route path='/UserSignup' element={ < UserSignup /> } />
        <Route path='/CaptainLogin' element={ < CaptainLogin /> } />
        <Route path='/CaptainSignup' element={ < CaptainSignup /> } />
        <Route path='/Home' element={ 
          <UserProtectWrapper>
            < Home />
          </UserProtectWrapper>
         } />
         <Route path='/UserLogout' element={ 
          <UserProtectWrapper>
            < UserLogout />
          </UserProtectWrapper>
         } />
          <Route path='/CaptainLogout' element={ 
          <CaptainProtectWrapper>
            < CaptainLogout />
          </CaptainProtectWrapper>
         } />
         <Route path='/captain-home' element={ 
          <CaptainProtectWrapper>
            < CaptainLogout />
          </CaptainProtectWrapper>
         } />
         
      </Routes>
      </BrowserRouter>
      </CaptainContext>
      </UserContext>
    </div>
  )
}

export default App
