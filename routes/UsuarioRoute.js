const express =  require('express')
const router = express.Router()
const Sequelize = require('sequelize')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/Usuarios')

router.use(cors())

process.env.SECRET_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImp0aSI6ImUyMGQyODNlLTk5MTQtNDU5MS04YWQ3LWY2NzE1YWYzMTI1NCIsImlhdCI6MTU2NTM2MjE4MSwiZXhwIjoxNTY1MzY1NzgxfQ.FBXVTyOD-NCQVwEC6wMQmIYoK0Sr9sM6kJFGLiSkOgc'

router.get('/', async(req, res) => {
    const e = await Usuario.findAll()
    res.send(e)
})

const Op = Sequelize.Op
router.get('/:arg', async(req, res) => {
    const e = await Usuario.findAll({
        where: { nome : { [Op.like]: '%'+req.params.arg+'%' }}
    })
    res.send(e)
})

router.get('/u/:id', async(req, res) => {
    const e = await Usuario.findOne({
        where: { id : req.params.id }
    })
    res.send(e)
})

router.post('/editar',(req, res) =>{

    const uData = {
        nome:req.body.nome,
        email:req.body.email,
        password:req.body.password,
        nivel:req.body.nivel,
        setorId:req.body.setorId
    }

    bcryptjs.hash(req.body.password, 10, (err, hash) => {
        uData.password = hash; 

        Usuario.update(uData, {
            where: { id: req.body.id}
        })
        .then(usuario => {
            res.json({status: usuario.nome + 'Alterado'})
        }).catch(err => {
            res.send('error:'+err)
        })
    })

})

router.post('/novo', (req, res) => {
    const uData = {
        nome:req.body.nome,
        email:req.body.email,
        password:req.body.password,
        nivel:req.body.nivel,
        setorId:req.body.setorId
    }

    Usuario.findOne({
        where: { nome: req.body.nome}
    })
    .then(usuario => {
        if(!usuario){
            bcryptjs.hash(req.body.password, 10, (err, hash) => {
                uData.password = hash;            
                Usuario.create(uData)
                .then(usuario => {
                    res.json({status: usuario.nome + ' Cadatrado '})
                })
                .catch(err => {
                    res.send('error: '+ err)
                })
            })
        } else{
            res.json({error: usuario.nome + ' Já existe '})
        }
    })
    .catch(err => {
        res.send('error: '+ err)
    })
})

module.exports = router