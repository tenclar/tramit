const express = require('express')
const router = express.Router()
const Sequelize = require("sequelize")
const cors = require('cors')
const Setor = require('../models/Setores')
router.use(cors())

router.get('/', async(req, res) => {
    const e = await Setor.findAll()
    res.send(e)
})



const Op = Sequelize.Op;
router.get('/:arg', async(req, res) => {
    const e = await Setor.findAll({
        where: {nome : {[Op.like]: '%'+req.params.arg+'%'}}
    })
    res.send(e)
})

router.get('/setor/:id', async(req, res) => {
    const e = await Setor.findOne({
        where: { id : req.params.id }
    })
    res.send(e)
})

router.post('/editar',(req, res) =>{

    const uData = {
        nome:req.body.nome,
       descricao:req.body.descricao
    }

  

        Setor.update(uData, {
            where: { id: req.body.id}
        })
        .then(setor => {
            res.json({status: setor.nome + 'Alterado'})
        }).catch(err => {
            res.send('error:'+err)
        })
  

})

router.post('/novo', (req , res) => {
    const sData = {
        nome : req.body.nome,
        descricao: req.body.descricao
    }

    Setor.findOne({
        where:{
            nome: req.body.nome
        }
    }).then(setor => {
        if(!setor){
            Setor.create(sData)
            .then(setor =>{
                res.json({status: setor.nome + ' cadastrado '})
            })
            .catch(err => {
                res.send('error: '+err)
            })
        }else{
            res.json({error: setor.nome + ' Já existe '})
        }
    })
    .catch(err => {
        res.send('error: '+ err)
    })
})

module.exports = router