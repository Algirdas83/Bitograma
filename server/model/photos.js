import { DataTypes } from "sequelize"

const Photo = (sequelize) => {

    const Schema ={

        photo:{
            type: DataTypes.STRING,
            allowNull: false
        },
        caption:{
            type: DataTypes.STRING,
            allowNull: true
        }
        
    
    
    }


    return sequelize.define('photos', Schema)
}
      
      


export default Photo