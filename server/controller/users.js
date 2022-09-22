import express from 'express'
import bcrypt from 'bcrypt'
import db from '../dataBase/connect.js'
import upload from '../middleware/multer.js'
import { auth } from '../middleware/auth.js'


const router = express.Router()
const saltRounds = 10

router.get('/all', async (req, res) => {

    try {
        
        const allUsers = await db.Users.findAll({
            attributes:['id', 'username', 'photo', ],
            include: [
                {model: db.Photo,
                attributes: ['id','photo', 'caption', 'userId']
            }]
        })
        
        res.status(200).json(allUsers)

    } catch (error) {
        
    }

})


router.post('/register', upload.single('photo'), async (req, res) => {
    console.log(req.body);

    try {
        if(req.file)
        
        req.body.photo ='/' + req.file.path

        const userExist = await  db.Users.findOne( {where: {email: req.body.email } } )

        if(userExist){
            res.status(401).send('Toks vartotoajas jau egzistuoja')
            return 
        }


        req.body.password =  await bcrypt.hash(req.body.password, saltRounds )

        const user = await db.Users.create(req.body)

        res.json(' Registracija sekminga')
        
    } catch (error) {

        console.log(error);
        res.status(401).send('ivyko serverio klaida poste')
    }

})


router.post('/login', async (req, res) => {

    try {

     const user = await db.Users.findOne({where:{email: req.body.email}})

        if(!user)
        return res.status(401).send('Toks vartotojas nerastas')

            if(await bcrypt.compare(req.body.password, user.password )) {

            req.session.loggedIn = true

            req.session.user = {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                username:user.username,
                email: user.email,
                photo: user.photo
            }

            res.status(200).json({user: req.session.user, message: 'Sekmingai prisijungete'})
            
            } else{
                res.status(401).send('Nepavyko prisijungti')
            }

    } catch (error) {
        console.log(error);
        res.status(500).send('Ivyko serverio klaida')
    }
    
})

router.get('/logout', (req, res) => {

    req.session.destroy()

    res.send('Jus sekmingai atsijungete')
})


    router.get('/check-auth', auth,  async (req, res) => {

        res.json(req.session.user)
    })


export default router