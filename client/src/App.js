import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import "./App.css";
import Login from './page/Login/Login.js'
import Logout from './page/Logout/Logout.js'
import Register from './page/Register/Register.js'
import Profile from './page/profile/Profile';
import AlertContext from './context/AlertContext';
import Alert from './components/Alert';
import Header from './components/Header';
import MainProfile from './page/profile/MainProfile';

const App = () => {

  const [alert, setAlert] = useState({
    message:'',
    status: ''
  })

  const [userData, setUserData] = useState({})

  const contextValue = {alert, setAlert, userData, setUserData}

  useEffect(() => {
    //  if(localStorage.getItem('loggedin') === 'true') 
    //   setLoggedIn(true)

    axios.get(`api/users/check-auth`)
    .then(resp => {
      setUserData(resp.data.user)
    })
    

  }, [])

  return (

    <>
    
      
      
      <BrowserRouter>
        <AlertContext.Provider value={contextValue}>
          
          {userData &&
             <Header/>
             
          }
          <div className = 'container' >
        
            <Alert/>
                <Routes>
                  <Route path = '/' element = {<Login/>} />
                  <Route path ='logout' element = {<Logout/>}/>
                  <Route path = 'register' element = {<Register/>} />
                  {userData &&
                  <>
                    <Route path ='profile' element = {<Profile/>}/>
                    <Route path='/main-profile' element ={<MainProfile/>}/>
                  </>
                  }
                </Routes>
          </div>
        </AlertContext.Provider>
       
      </BrowserRouter>




   
    
    
    
    </>

    
  )
}

export default App