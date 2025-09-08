import { useState } from 'react'
import './App.css'
import Login from './components/Login'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import SignUp from './components/SignUp'
import Home from './components/Home'
import Layout from './components/Layout'
import Cart from './components/Cart'
import UserProvider from './components/Context'
import Account from './components/Account'

function App() {

  return (
    <>
    <UserProvider>
    <BrowserRouter>
       <Routes>
        <Route path='/' element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/account' element={<Account/>}/>
        </Route>
       </Routes>
     
    </BrowserRouter>
    </UserProvider>
     
    </>
  )
}

export default App;
