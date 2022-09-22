import express from 'express'
import db from '../dataBase/connect.js'
import upload from '../middleware/multer.js'


const router = express.Router()


router.get('/user-photos/:id', async (req, res) => {

    

    try {
        const photos = await db.Photo.findAll({ where:{id: req.params.id} })
        res.json(photos)

    } catch (error) {

        console.log(error)
        res.status(500).send('Ivyko serverio klaida')
        
    }

})

router.post('/uploade', upload.single('photo'), async (req, res) => {


    try {
        if(req.file)
        
        req.body.photo ='/' + req.file.path

        const photo = await db.Photo.create(req.body)

        res.status(200).send('Noutrauka sekmingai issaugota')

    } catch (error) {
        console.log(error)
        res.status(500).send('Ivyko serverio klaida')
    }
        
})



export default router

