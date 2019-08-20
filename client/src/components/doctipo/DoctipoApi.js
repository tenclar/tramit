import axios from 'axios'


const doctipoNovo = novo =>{
    return axios
    .post('/doctipos/novo', {
        nome: novo.nome,
        descricao: novo.descricao
        
    })
    .then(res => {
        return res.data
        //console.log(" Registrado ")
    })
}
const doctipoGet = arg =>{
    return axios
    .get('/doctipos')
    .then(res =>{
       return res.data
    
    })
}
const doctipoGetByNome = arg =>{
    return axios
    .get('/doctipos/'+arg)
    .then(res =>{
       return res.data
    
    })
}

const doctipoGetById = id =>{
    return axios
    .get('/doctipos/doctipo/'+id)
    .then(res =>{
       return res.data
    
    })
}

const doctipoUpdate = editar =>{
    return axios
    .post('/setores/editar',{
        nome: editar.nome,
        descricao: editar.descricao,
        id: editar.id
    })
    .then(res => {
       return res.data
    })
}

export { doctipoNovo, doctipoUpdate, doctipoGet, doctipoGetByNome , doctipoGetById}
