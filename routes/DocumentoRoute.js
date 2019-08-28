const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const cors = require('cors')
const Documento = require('../models/Documentos')
const Tramitacao = require('../models/Tramitacoes')
router.use(cors())

Documento.hasMany(Tramitacao)
//Tramitacao.belongsTo(Documento)
//Documento.belongsTo(Tramitacao)



router.get('/', async(req, res) => {
    const e = await Documento.findAll()
    res.send(e)
})

router.get('/localiza', async(req, res) => {
    const e = await Documento.findAll()
    res.send(e)
})



router.get('/tramit/:arg', async(req, res) => {
    const e = await Documento.findAll({
        where: { [Op.or]:[
            {nome : {[Op.like]: '%'+req.params.arg+'%'}},
            {setorId : {[Op.like]: '%'+req.params.arg+'%'}},
            {tipodocId : {[Op.like]: '%'+req.params.arg+'%'}}
            ]
        },
        include:[
            {
                model:Tramitacao              
            }
        ] 
    })
    
    res.send(e)
})

/* router.get('/:arg', async(req, res) => {
    const e = await Documento.findAll({
        where: { nome : {[Op.like]: '%'+req.params.arg+'%'} }
    })
    res.send(e)
})
 */

router.get('/localiza/:arg', async(req, res) => {
    const e = await Documento.findAll({
        where: { [Op.or]:[
                {nome : {[Op.like]: '%'+req.params.arg+'%'}},
                {setorId : {[Op.like]: '%'+req.params.arg+'%'}},
                {tipodocId : {[Op.like]: '%'+req.params.arg+'%'}}
            ]
        }
    })
    
    res.send(e)
})
router.get('/localiza/:arg/:id', async(req, res) => {
    const e = await Documento.findAll({
        where: {nome : {[Op.like]: '%'+req.params.arg+'%'}, 
            [Op.or]:[
                 {setorId : {[Op.like]: '%'+req.params.id+'%'}},
                {tipodocId : {[Op.like]: '%'+req.params.id+'%'}}
            ]
        }
    })
    
    res.send(e)
})


router.get('/localiza/:arg/:setorId/:tipodocId', async(req, res) => {
    const e = await Documento.findAll({
        where: { 
                nome : {[Op.like]: '%'+req.params.arg+'%'},
                setorId : {[Op.like]: '%'+req.params.setorId+'%'},
                tipodocId : {[Op.like]: '%'+req.params.tipodocId+'%'}
              
            }
    })
    
    res.send(e)
})

router.post('/novo', (req , res) => {
    const sData = {
        setorId: req.body.setorId,
        tipodocId:req.body.tipodocId,
        numero:req.body.numero,
        nome: req.body.nome,
        descricao: req.body.descricao
    }

    Documento.findOne({
        where:{
            nome: req.body.nome
        }
    }).then(documento => {
        if(!documento){
            Documento.create(sData)
            .then(documento =>{
                res.json({status: documento.nome + ' cadastrado '})
            })
            .catch(err => {
                res.send('error: '+err)
            })
        }else{
            res.json({error: documento.nome + ' Já existe '})
        }
    })
    .catch(err => {
        res.send('error: '+ err)
    })
})


router.get('/doc/:id', async(req, res) => {
    const e = await Setor.findOne({
        where: { id : req.params.id }
    })
    res.send(e)
})

router.put('/editar',(req, res) =>{

    const uData = {
        setorId:req.body.setorId,
        usuarioId:req.body.usuarioId,
        tipodocId:req.body.tipodocId,
        numero: req.body.numero,
        nome:req.body.nome,
       descricao:req.body.descricao
    }
    
    Documento.update(uData, {
        where: { id: req.body.id}
    })
    .then(doc => {
        res.json({status: doc.nome + 'Alterado'})
    }).catch(err => {
        res.send('error:'+err)
    })
    

})


module.exports = router