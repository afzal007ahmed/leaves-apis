import { DataTypes } from "sequelize";
import { Column, Model, Table } from "sequelize-typescript";


interface userTableInterface{
  id ?: string , 
  name : string ,
  email : string , 
  password : string ,
  role? : string 
}


@Table({
    tableName : "users"
})
export class User extends Model<userTableInterface>{
    @Column({
        type : DataTypes.UUID , 
        defaultValue : DataTypes.UUIDV4 ,
        allowNull : false ,
        primaryKey : true 
    })
    declare id : string ;
    @Column({
        type : DataTypes.STRING ,
        allowNull : false 
    })
    name : string ;
    @Column({
        type : DataTypes.STRING ,
        allowNull : false 
    })
    email : string ;
    @Column({
         type : DataTypes.STRING ,
         allowNull : false 
    })
    password : string ;
    @Column({
        type : DataTypes.ENUM('employee' , 'manager'),
        defaultValue : 'employee'
     })
     role : string 
} 