const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const port = process.env.PORT || 5001

app.use(cors())
app.use(bodyParser.json({extended:true}))
app.use(bodyParser.urlencoded({extended:false}))

const routes = require('./routes')
app.use(routes)


app.listen(port, err => {
    if(err){
        console.log('não foi possivel iniciar o servidor')
    }else{
        console.log('Server está Rodando na porta ' + port)
    }
})
