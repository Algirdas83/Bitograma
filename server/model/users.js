import { DataTypes } from "sequelize"

// const sequelize = new Sequelize("sqlite::memory:")
// Modelio varijantas is sequelize puslapio

const Users = (sequelize) => {

    const Schema ={

        username:{
            type: DataTypes.STRING,
            allowNull: false
        },
        first_name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull:false
        },
        photo:{
            type:DataTypes.STRING,
            allowNull: true
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false 
        },
        password:{
            type:DataTypes.STRING,
            allowNull: false
        }
        
       
    
    }


    return sequelize.define('users', Schema)
}
      
      


export default Users