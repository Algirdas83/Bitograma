import React from 'react'
import { useState, useEffect, useContext } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import AlertContext from '../../context/AlertContext'
import './Profile.css'

const Profile = () => {
    const {userData} = useContext(AlertContext)
    const [users, setUsers] = useState([])
    const navigate = useNavigate()


    useEffect(() => {

        axios.get('/api/users/all')
        .then(resp =>{
            setUsers(resp.data)
            
            
        })
        .catch(error => console.log(error))
        
       

       
    },[])
   


  return (
   <div className='profile-container'>


        <div className='section-one'>

        {
            users.map(data => 
                data.photos.map(allPhotos => 
                <div className='sec-one-all-container'>
                    <div>
                        <img className='prof-user-photo' src={data.photo} alt="" />
                      <span>{data.username}</span>
                    </div>
                    
                            <Link>
                                <img className='prof-all-photos' src={allPhotos.photo} alt="photo" />
                            </Link>
                        
                         <p>{allPhotos.caption}</p>
                </div>
                )
           )
        }

            <h4>Ather info left</h4>
        </div>

{/* /////////////// section two start */}
        <div className='section-two'>
             <div className='img-part'>
             
                <Link to={'/main-profile'}>
                 <img className='prof-img' src={userData.photo} alt="profile picture" />
                </Link>

                <div className='surname-name'>
                    <p className='surname'>Algirdautas</p>
                    <p>Algirdas Liutkus</p>
                </div>
            </div>
            <div className='ather-profiles'>
                <div className='sugestions'>
                    <p className='sugestions-p1'>Sugestion for you</p>
                    <p className='sugestions-p2'>See All</p>
                </div>
                <div>
                    {/* <img src="" alt="ather-profiles" /> */}
                    NOUTRAUKA
                    <div>
                        <p>AstasPastas</p>
                        <p>Folow you</p>
                    </div>
                </div>

            </div>
         

        </div>

   </div>
  )
}

export default Profile