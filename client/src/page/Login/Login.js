
import './Login.css'
import image from '../../../src/photos/insta.png'
import React from 'react'
import {Link} from 'react-router-dom'
import {useState, useContext} from 'react'
import AlertContext from '../../context/AlertContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'




const Login = () => {

    const {setAlert, setUserData} = useContext(AlertContext)
    const [form, setForm] = useState({
        email: '',
        password:''
    })

    const navigate = useNavigate()

    const handleForm = (e) => {
        
        setForm({...form, [e.target.name]: e.target.value})
        
    }


    const  handleSubmit = (e) => {

        e.preventDefault()

            axios.post('/api/users/login', form)
            .then(resp => {
                
                setAlert({
                    message: resp.data.message,
                    status: 'success'
                })
                setUserData(resp.data.user)

                setTimeout(() =>{ 
                    
                       
                } , 1000)

                navigate('/profile')
                
            })
            .catch(error => {
                console.log(error)

                setAlert({
                    message: error.response.data,
                    status: 'danger'
                })

            })
        }


  return (
    <div className='login-container'>

        <div className='login-form-container'>
            <div className='login-img-div'>
                <img className='insta-logo' src={image} alt="Insta logo" />
            </div>
            <form onSubmit={handleSubmit}>
                <div className='d-grid gap-2 input-group input-group-lg'>
                    <input className='login-input mt-2' type="email" name='email' placeholder='El pašto adresas' onChange={handleForm}   />
                </div>
                <div className='d-grid gap-2 input-group input-group-lg'>
                    <input className='login-input  mt-2' type="password" name='password' placeholder='Slaptažodis' onChange={handleForm}/>
                </div>
                <div className='d-grid gap-2'>
                    <button className='login-btn mt-4 btn btn-info'>Prisijungti</button>
                </div>
                
            </form>

        </div>
       
             <div  className='sing-in-container'>
                <p>Neutrite paskyros ? <Link className='login-link' to = "/register">Užsiregistroukite</Link></p> 

            </div>

       

    </div>
  )
}

export default Login