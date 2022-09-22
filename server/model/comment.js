import { DataTypes } from "sequelize"

const Comment = (sequelize) => {

    const Schema ={

        comment:{
            type: DataTypes.STRING,
            allowNull: false
        }
    
    
    }


    return sequelize.define('comments', Schema)
}
      
      


export default Comment