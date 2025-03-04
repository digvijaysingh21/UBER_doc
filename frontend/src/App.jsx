import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Start from "./pages/Start";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CaptainLogin from "./pages/Captainlogin";
import CaptainSignup from "./pages/CaptainSignUp";
import UserProtectedWrapper from "./pages/UserProtectedWrapper";
import UserLogout from "./pages/UserLogout";


const App = () => {

  return (
    <div>
      <Routes>
        {/* user path */}
        <Route path='/' element={ <Start/>}/>
        <Route path='/login' element={<UserLogin/>}/>
        <Route path='/signup' element={<UserSignup/>}/>
        {/* captain paths */}
        <Route path='captain-login' element={<CaptainLogin/>}/>
        <Route path='captain-signup' element={<CaptainSignup/>}/>
        <Route path='/home' element={
        <UserProtectedWrapper>
        <Home/>
        </UserProtectedWrapper>
        }/>

        <Route path='/user/logout' element={
          <UserProtectedWrapper>
             <UserLogout/>
          </UserProtectedWrapper>
        }/>
      </Routes>
    </div>
  )
}

export default App;