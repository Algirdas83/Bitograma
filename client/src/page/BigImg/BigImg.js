import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import{useParams} from 'react-router-dom'
import './BigImg.css'

const BigImg = () => {

  const{id} = useParams()

  const [image, setImage] = useState([])

  useEffect(() => {

    axios.get(`/api/photos/user-photos/${id}`)
    .then(resp => {
      setImage(resp.data)
    })
    .catch(error => console.log(error))

  },[])

  return (
    <div className='big-img-container'>
      <div>
        {image && image.map(data =>  <img src={data.photo} alt="Nuotrauka" /> ) }
      </div>
      <div className='bigImg-text'>
        {image && image.map(text =>  <p>{text.caption}</p> ) }
      </div>
      
    
    </div>
  )
}

export default BigImg