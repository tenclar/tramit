
const Sequelize = require("sequelize")
const db = require("../database/db")

const tramitacoes = db.sequelize.define('tramitacoes',
    
    {
        id: {
            type:Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        setorId: {
            type:Sequelize.INTEGER          
        },
        
        documentoId: {
            type:Sequelize.INTEGER          
        },
        datacad: {
            type: Sequelize.DATE
        },
        
        acao: {
            type:Sequelize.STRING
        },

        movimento: {
            type:Sequelize.STRING
        },

        despacho: {
            type:Sequelize.STRING
        },
       
        observacao: {
            type:Sequelize.STRING
        }
       
               
    }
)


module.exports = tramitacoes