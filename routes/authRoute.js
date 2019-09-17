const express =  require('express')
const router = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/Usuarios')

router.use(cors())

//process.env.SECRET_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImp0aSI6ImUyMGQyODNlLTk5MTQtNDU5MS04YWQ3LWY2NzE1YWYzMTI1NCIsImlhdCI6MTU2NTM2MjE4MSwiZXhwIjoxNTY1MzY1NzgxfQ.FBXVTyOD-NCQVwEC6wMQmIYoK0Sr9sM6kJFGLiSkOgc'
process.env.SECRET_KEY  = 'secret'

router.post('/auth', (req, res) => {
     const sData = {
        email : req.body.email,
        password:req.body.password
    }
    //res.send(sData)
    //console.log(sData)
 
    Usuario.findOne({
        where: {
            email: req.body.email
        }
    }).then(usuario =>{
        if(usuario) {
            if(bcryptjs.compareSync(req.body.password, usuario.password)){          
                let token = jwt.sign(usuario.dataValues, process.env.SECRET_KEY,{
                    expiresIn:1440                
                })
                res.send(token)
            }else{
                res.status(400).json({error: 'Usuário ou senha inválida'})
            }
        }else{
            res.status(400).json({error: 'Usuário não existe!'})
        }
    })
})


router.get('/verifytoken',(req, res, next) =>{
    let token  = req.headers['authorization'].split(' ')[1]
    jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
        if(!err){
            res.json({
                success:true,
                message:'Token is Valid.'
            })
        }else {
            res.status(401).json({
                sucess:false,
                error:err
            })
        }
    })
})

module.exports = router