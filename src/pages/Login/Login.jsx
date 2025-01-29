import React from 'react'
import Header from '../../components/Header/Header'
import LoginForm from '../../components/LoginForm/LoginForm'
import Footer from '../../components/Footer/Footer'


const Login = () => {
  return (
    <div>
      <Header />
      <LoginForm />
      <div className='loginpage'>
      <Footer />
      </div>
    </div>
  )
}

export default Login
