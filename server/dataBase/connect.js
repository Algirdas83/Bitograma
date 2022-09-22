
import { Sequelize } from "sequelize";
import  mysql from 'mysql2/promise'
import { Users, Photo, Comment } from "../model/index.js";



const db = {}

 const dbTemplate = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Bitograma'
}


try {

   const connection = await mysql.createConnection(
        {
            host:dbTemplate.host,
            user: dbTemplate.user,
            password:dbTemplate.password
        }
    )
        //Linas apacioje skirtas jei norime ir data base skurti iskarto prie lenteliu
        await connection.query('CREATE DATABASE IF NOT EXISTS ' + dbTemplate.database)    

        const sequelize = new Sequelize (dbTemplate.database, dbTemplate.user, dbTemplate.password, {
            dialect: 'mysql'
        } )

        db.Users = Users(sequelize)
        db.Photo = Photo(sequelize)
        db.Comment = Comment(sequelize)


        db.Users.hasMany(db.Photo)// Kad vartotojas galetu tireti visas nuotraukas
        db.Photo.belongsTo(db.Users)// Kad isfiltruotos nuotraukos turetu ir vartotojo informacija
        db.Photo.hasMany(db.Comment)
        db.Comment.belongsTo(db.Photo)



        await sequelize.sync({ alter: false });
    
} catch (error) {

    console.log(error)

}


export default db

