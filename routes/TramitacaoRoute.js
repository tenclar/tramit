const express = require('express')
const router = express.Router()
const cors = require('cors')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const Tramitacao = require('../models/Tramitacoes')
router.use(cors())


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

router.post('/novo', (req , res) => {
    const sData = {
        setorId: req.body.setorId,
        documentod: req.body.documentod,
        datacad: req.body.datacad,
        acao: req.body.acao,
        movimento: req.body.movimento,
        despacho: req.body.despacho,
        observacao:req.body.observacao
    }


    Tramitacao.create(sData)
    .then(tramitacao =>{
        res.json({status: tramitacao.nome + ' cadastrado '})
    })
    .catch(err => {
        res.send('error: '+err)
    })

    
})



module.exports = router