const router = require('express').Router()


//routes
router.get('/', (req , res) => {
    const sData = {
        server : 'Servidor Tramit',
        hora: new Date()
    }
    res.send(sData)
    
})
    
    const auth = require('./authRoute')
    router.use(auth)

    const api = require('./api')
    router.use(api)


  

module.exports = router 