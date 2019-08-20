const express = require('express')
const router = express.Router()
const Sequelize = require("sequelize")
const cors = require('cors')
const Doctipo = require('../models/Doctipos')
router.use(cors())

router.get('/', async(req, res) => {
    const e = await Doctipo.findAll()
    res.send(e)
})

const Op = Sequelize.Op;
router.get('/:arg', async(req, res) => {
    const e = await Doctipo.findAll({
        where: {nome : {[Op.like]: '%'+req.params.arg+'%'}}
    })
    res.send(e)
})

router.post('/novo', (req , res) => {
    const sData = {
        nome : req.body.nome,
        descricao: req.body.descricao
    }

    Doctipo.findOne({
        where:{
            nome: req.body.nome
        }
    }).then(doctipo => {
        if(!doctipo){
            Doctipo.create(sData)
            .then(doctipo =>{
                res.json({status: doctipo.nome + ' cadastrado '})
            })
            .catch(err => {
                res.send('error: '+err)
            })
        }else{
            res.json({error: doctipo.nome + ' Já existe '})
        }
    })
    .catch(err => {
        res.send('error: '+ err)
    })
})


router.get('/doctipo/:id', async(req, res) => {
    const e = await Doctipo.findOne({
        where: { id : req.params.id }
    })
    res.send(e)
})

router.post('/editar',(req, res) =>{

    const uData = {
        nome:req.body.nome,
       descricao:req.body.descricao
    }

  

        Doctipo.update(uData, {
            where: { id: req.body.id}
        })
        .then(doctipo => {
            res.json({status: doctipo.nome + 'Alterado'})
        }).catch(err => {
            res.send('error:'+err)
        })
  

})
module.exports = router