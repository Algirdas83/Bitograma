import React from 'react'
import { useContext, useEffect } from 'react'
import AlertContext from '../context/AlertContext'

const Alert = () => {

    const {alert, setAlert} = useContext(AlertContext)

    useEffect (() => {

        if(alert.message === '')
            return

                setTimeout(() => {

                    setAlert({
                        message:'',
                        
                    })
                }, 3000)
    })


  return (


    alert.message && (
        <div className={`alert alert-${alert.status} mt-5`}>
           {alert.message}
       </div>
    )
  )
}

export default Alert