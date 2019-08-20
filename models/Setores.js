
const Sequelize = require("sequelize")
const db = require("../database/db")

const setor = db.sequelize.define('setores',
    
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


module.exports = setor