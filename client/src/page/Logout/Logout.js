import React from 'react'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AlertContext from '../../context/AlertContext'
import axios from 'axios'

const Logout = () => {

   

    // const {setLoggedIn} = useContext(MainContext)
    const {setAlert,setUserData} = useContext(AlertContext)
   

const navigate = useNavigate()


    useEffect(() => {

        axios.get('/api/users/logout', {
            withCredentials:true,
            
        })
        .then(resp => {

            
        
            setUserData({})

        setAlert({
            message: resp.data,
            status: 'success'
        })

        setTimeout(() => {
            navigate('/')
        }, 1000)

        })
        .catch(error => {

            setAlert({
                message: error.response.data,
                status: 'danger'
            })
    
                setTimeout(() => {
                    navigate('/')
                }, 1000)


        })
        // Laikinas sprendimas logoutui prekraiti
        // window.location.reload()

    },[])
  return (

     alert.message && (
        <div>
             <h3 className={`main-container-${alert.status}`}>{alert.message}</h3>
         </div>
        
    )
   
  )
}

export default Logout