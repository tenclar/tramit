const express = require('express')
const router = express.Router()
const cors = require('cors')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const Tramitacao = require('../models/Tramitacoes')
const Documento = require('../models/Documentos')
router.use(cors())


//Tramitacao.hasMany(Documento)
//Documento.belongsTo(Tramitacao)
Tramitacao.belongsTo(Documento)
router.get('/', async(req, res) => {
    const e = await Tramitacao.findAll()
    res.send(e)
})
 
/* router.get('/:arg', async(req, res) => {
    const e = await Setor.findAll({
        where: {nome : {[Op.like]: '%'+req.params.arg+'%'}}
    })
})  */

router.get('/:arg', async(req, res) => {
    const e = await Tramitacao.findAll({
        where: { 
                despacho : {[Op.like]: '%'+req.params.arg+'%'}
            }
    })
    
    res.send(e)
})
router.get('/doc/:arg', async(req, res) => {
    const e = await Tramitacao.findAll({
        include:[
            {
                model:Documento,
                where: {
                    nome : {[Op.like]: '%'+req.params.arg+'%'}
                } 
            }
        ] 
        
        
    })
    
    res.send(e)
})

/* router.get('/acao/:action', async(req, res) => {
    const e = await Tramitacao.findAll({
        
        attributes: [
            [Sequelize.fn('MAX', Sequelize.col('acao')), 'max']
        ], raw:true   
    })
    
    res.send(e)
}) */

/* router.get('/acao/:action', async(req, res) => {
    const e = await Tramitacao.findAll({
        where: Sequelize.where(Sequelize.fn('MAX', Sequelize.col('acao')), req.params.action)
        
    })
    
    res.send(e)
})
 */
router.get('/acao/:action', async(req, res) => {
    const e = await Tramitacao.findAll({
        where:{
            acao:{
                    [Op.and]: [ req.params.action,
                     [Sequelize.literal('SELECT max(acao) AS acao FROM tramitacoes')] 
                    ]
            }
        }
        
        
    })
    
    res.send(e)
})
 
router.post('/novo', (req , res) => {
    const sData = {
        setorId: req.body.setorId,
        documentoId: req.body.documentoId,
        datacad: req.body.datacad,
        acao: req.body.acao,
        movimento: req.body.movimento,
        despacho: req.body.despacho,
        observacao:req.body.observacao
    }

    Tramitacao.findOne({
        where:{
            acao:{
                    [Op.and]: [ req.body.acao,
                     [Sequelize.literal('SELECT max(acao) AS acao FROM tramitacoes')] 
                    ]
            }
        }
        
    })
    .then(tramitacao => {
        if(!tramitacao){
            Tramitacao.create(sData)
            .then(tramitacao =>{
                res.json({status: tramitacao.acao + ' cadastrado '})
            })
            .catch(err => {
                res.send('error: '+err)
            })
        } else{
            res.json({error: tramitacao.acao + ' Já existe para o documento'})
        }
    })
    .catch(err => {
        res.send('error: '+ err)
    })
    
})



router.put('/editar',(req, res) =>{

    const sData = {
        setorId: req.body.setorId,
        documentoId: req.body.documentoId,
        datacad: req.body.datacad,
        acao: req.body.acao,
        movimento: req.body.movimento,
        despacho: req.body.despacho,
        observacao:req.body.observacao
    }

    Tramitacao.findOne({
        where:{
            acao:{
                    [Op.and]: [ req.body.acao,
                     [Sequelize.literal('SELECT max(acao) AS acao FROM tramitacoes')] 
                    ]
            }
        }
        
    })
    .then(tramitacao => {
        if(!tramitacao){
            Documento.update(uData, {
                where: { id: req.body.id}
            })
            .then(tramit => {
                res.json({status: tramit.acao + 'Alterado'})
            }).catch(err => {
                res.send('error:'+err)
            })
        }else{
                res.json({error: tramitacao.acao + ' Já existe para o documento'})
            }
    })
    .catch(err => {
        res.send('error: '+ err)
    })

})


module.exports = router