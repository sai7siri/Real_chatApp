
import React, { useEffect, useState } from 'react';
import {BrowserRouter , Routes , Route, Navigate} from "react-router-dom";
import Home from "./chat_app/components/Home"
import Signup from "./chat_app/pages/Signup"
import SignIn from "./chat_app/pages/Signin";
import {Toaster} from "react-hot-toast"
import { useAuthContext } from './chat_app/Context/authUser';

function App() {

  const {authUser} = useAuthContext();

  return (
    <div className=' h-screen'>
      <BrowserRouter>
      <Routes>

        <Route path='/' element={<Navigate to="/signin" />} />

        <Route path='/home' element={authUser ? <Home /> : <Navigate to='/signin' /> } />
        <Route path='/signup' element={authUser ? <Navigate to='/home' /> : <Signup /> } />
        <Route path='/signin' element={ authUser ? <Navigate to="/home" /> : <SignIn /> } />

      </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  )
}

export default App
