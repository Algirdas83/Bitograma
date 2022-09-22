import React from 'react'
import { useContext, useEffect, useState } from 'react'
import AlertContext from '../../context/AlertContext'
import axios from 'axios'
import './MainProfile.css'

const MainProfile = () => {

    const {userData} = useContext(AlertContext)
    const [photos, setPhotos] = useState([])

    useEffect(() => {

        axios.get(`/api/photos/user-photos/${userData.id}`)
        .then(resp => {
            setPhotos(resp.data)
        })
        .catch(error => console.log(error))

    },[userData])

  return (
    <div className='main-profile-container'>

        <div className='main-p1'>
            <div className='main-p1-img'>
                <img src={userData.photo} alt="Profile picture" />
            </div>

            <div className='main-p2-title'>
                <p className='p1'>{userData.username}</p>
                <p className='p2'>{userData.first_name + ' ' + userData.last_name}</p>
            </div>

        </div>

        <div className='main-p2'>

            {photos && photos.map(photo => 
                <img key={photo.id} className='user-pictures' src={photo.photo} alt="user photo" />
            )}
                
            

        </div>
       
    </div>
  )
}

export default MainProfile