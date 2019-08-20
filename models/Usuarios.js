const Sequelize = require("sequelize")
const db = require("../database/db")

const usuario = db.sequelize.define('usuarios',
    
    {
        id: {
            type:Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        
        nome: {
            type:Sequelize.STRING
        },
              
        email: {
            type:Sequelize.STRING
        },
        password: {
            type:Sequelize.STRING
        },
        nivel: {
            type:Sequelize.STRING
        },
        setorId:{
            type:Sequelize.INTEGER
        }

    }
)

module.exports = usuario