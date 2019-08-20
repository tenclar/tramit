import axios from 'axios'


const docNovo = novo =>{
    return axios
    .post('/docs/novo', {
        tipodocId:novo.tipodocId,
        setorId:novo.setorId,
        numero:novo.numero,
        nome: novo.nome,
        descricao: novo.descricao
    })
    .then(res => {
        return res.data
    })
}
const docGet = arg =>{
    return axios
    .get('/docs')
    .then(res =>{
       return res.data
    
    })
}
/* 
const docGetByNome = arg =>{
    return axios
    .get('/docs/'+arg)
    .then(res =>{
       return res.data
    
    })
} */

const docGetFilter = args =>{
   
    return axios.get('/docs/localiza/'+args.arg+'/'+args.setorId +'/'+args.tipodocId).then(res =>{ return res.data })
    
}

const docGetById = id =>{
    return axios
    .get('/docs/doc/'+id)
    .then(res =>{
       return res.data
    
    })
}


const docUpdate = editar =>{
    return axios
    .post('/docs/editar',{
      
        tipodocId:editar.tipodocId,
        setorId:editar.setorId,
        numero:editar.numero,
        nome: editar.nome,
        descricao: editar.descricao,
        id: editar.id
    })
    .then(res => {
       return res.data
    })
}
export { docNovo, docGet, docGetById,docUpdate, docGetFilter }
