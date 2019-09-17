const router = require('express').Router()
const jwt = require('jsonwebtoken')
const cors = require('cors')
process.env.SECRET_KEY  = 'secret'

router.use(cors())
router.get('/', (req , res) => {
    const sData = {
        server : 'Servidor Tramit',
        hora: new Date()
    }
    res.send(sData)
    
})
//  const isValid = await jwt.verify(req.body.token, process.env.SECRET_KEY)

router.use( async(req, res, next) => {
  
    const token = req.body.token

    if(token){
        try {
            const payload = jwt.verify(req.body.token, process.env.SECRET_KEY)
           // console.log(payload)
           res.send({success:true})
            next()
        } catch (error) {
          
           console.log("Auth failed")
           res.send({success:false})
        }
       
    }else {
        console.log("Auth failed")
       res.send({success:false})
    }
})

const Usuarios = require('./UsuarioRoute')
router.use('/usuarios', Usuarios)

 const Setores = require('./SetorRoute')
 router.use('/setores', Setores)

const Doctipos = require('./DoctipoRoute')
router.use('/doctipos', Doctipos)

const Tramitacoes = require('./TramitacaoRoute')
router.use('/tramitacoes', Tramitacoes)

const Documentos = require('./DocumentoRoute')
router.use('/docs', Documentos)

module.exports = router