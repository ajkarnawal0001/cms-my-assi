import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from '../Pages/Home'
import { LoginPage } from '../Pages/LoginSignUp/LoginPage'
import { SignUp } from '../Pages/LoginSignUp/SignUp'
import { IndexForm } from '../Pages/Post/IndexForm'

export const RoutesPage = () => {
  return (
    <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/register-login" element={<SignUp/>}/>
        <Route exact path="/post-form" element={<IndexForm/>}/>
    </Routes>
  )
}
