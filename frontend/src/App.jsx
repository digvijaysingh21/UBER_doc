import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CaptainLogin from "./pages/Captainlogin";
import CaptainSignup from "./pages/CaptainSignUp";
import { UserDataContext } from "./context/userContext";

const App = () => {

  return (
    <div>
      <Routes>
        {/* user path */}
        <Route path='/' element={ <Home/>}/>
        <Route path='/login' element={<UserLogin/>}/>
        <Route path='/signup' element={<UserSignup/>}/>
        {/* captain paths */}
        <Route path='captain-login' element={<CaptainLogin/>}/>
        <Route path='captain-signup' element={<CaptainSignup/>}/>
      </Routes>
    </div>
  )
}

export default App;