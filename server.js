const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const port = process.env.PORT || 5000

app.use(cors())
app.use(bodyParser.json({extended:true}))
app.use(bodyParser.urlencoded({extended:false}))


const Usuarios = require('./routes/UsuarioRoute')
app.use('/usuarios', Usuarios)

 const Setores = require('./routes/SetorRoute')
app.use('/setores', Setores)

const Doctipos = require('./routes/DoctipoRoute')
app.use('/doctipos', Doctipos)

const Tramitacoes = require('./routes/TramitacaoRoute')
app.use('/tramitacoes', Tramitacoes)

const Documentos = require('./routes/DocumentoRoute')
app.use('/docs', Documentos)

app.listen(port, err => {
    if(err){
        console.log('não foi possivel iniciar o servidor')
    }else{
        console.log('Server está Rodando na porta ' + port)
    }
})
