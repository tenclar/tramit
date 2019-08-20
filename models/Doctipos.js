
const Sequelize = require("sequelize")
const db = require("../database/db")

const doctipo = db.sequelize.define('doctipos',
    
    {
        id: {
            type:Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        
        nome: {
            type:Sequelize.STRING
        },

        descricao: {
            type:Sequelize.STRING
        }
       
               
    }
)


module.exports = doctipo