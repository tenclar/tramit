
const Sequelize = require("sequelize")
const db = require("../database/db")

const documentos = db.sequelize.define('documentos',
    
    {
        id: {
            type:Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        setorId: {
            type:Sequelize.INTEGER
        },
        
        usuarioId: {
            type:Sequelize.INTEGER
        },
        tipodocId: {
            type:Sequelize.INTEGER
        },
        numero: {
            type:Sequelize.STRING
        },
        nome: {
            type:Sequelize.STRING
        },
        descricao: {
            type:Sequelize.STRING
        }
      
       
               
    }
)


module.exports = documentos