import React from 'react'
import {useState, useContext} from'react'
import AlertContext from '../../context/AlertContext'
import {Link} from 'react-router-dom'
import axios from 'axios'
import './Register.css'
import image from '../../../src/photos/insta.png'


const Register = () => {

    const [user, setUser] = useState({
        first_name:'',
        last_name:'',
        username: '',
        email:'',
        password:'',
        photo: ''

    })

    const {setAlert} = useContext(AlertContext)
    

    const handleInput = (e) => {

        // setUser({...user, [e.target.name]: e.target.value}) be foto ikelimo funkcijos
        setUser({...user, [e.target.name]: e.target.name === 'photo'? e.target.files[0] : e.target.value})
    }


    const handleForm = (e) => {
        e.preventDefault()

        const formData = new FormData()

      for(const key in user){ 

        formData.append(key, user[key])
      }

        axios.post('/api/users/register', formData )
        .then(resp => {

            setAlert({
                message: resp.data,
                status:'success'
            })

            window.scrollTo(0,0)

            })
        .catch(error =>{
            console.log(error)

            setAlert({
                message:  error.response.data,
                status:'danger'
            })


        } )

    }




  return (

    <div className='login-container'>

    <div className='login-form-container'>
            <div className='login-img-div'>
                <img className='insta-logo' src={image} alt="Insta logo" />
            </div>

        <form onSubmit={handleForm}>
            <div className='d-grid gap-2 input-group input-group-lg'>
                <input className='login-input mt-2' type="text" name = 'first_name' placeholder='Vardas' onChange={handleInput} />
            </div>
            <div className='d-grid gap-2 input-group input-group-lg'>
                <input className='login-input  mt-2' type="text" name ='last_name' placeholder='Pavardė' onChange={handleInput}/>
            </div>
            <div className='d-grid gap-2 input-group input-group-lg'>
                <input className='login-input  mt-2' type="text" name ='username' placeholder='Pravardė - nikas' onChange={handleInput}/>
            </div>
            <div className='d-grid gap-2 input-group input-group-lg'>
                <input className='login-input  mt-2' type="email" name='email' placeholder='Elektrininio pašto adresas' onChange={handleInput}/>
            </div>
            <div className='d-grid gap-2 input-group input-group-lg'>
                <input className='login-input  mt-2' type="password" name='password' placeholder='Slaptažodis' onChange={handleInput}/>
            </div>
            <div className='d-grid gap-2 input-group input-group-lg'>
                <input className='login-input  mt-2' type="file" name='photo' placeholder='Slaptažodis' onChange={handleInput}/>
            </div>
            <div className='d-grid gap-2'>
                <button className='login-btn mt-4 btn btn-info'>Registruotis</button>
            </div>
            
        </form>

    </div>
   
         <div  className='sing-in-container'>
            <p>Jau turite paskyrą ? <Link className='regsiter-link' to = "/">Prisijunkite</Link></p> 

        </div>

   

</div>
  )
}

export default Register