import axios from 'axios'


const setorNovo = novo =>{
    return axios
    .post('/setores/novo', {
        nome: novo.nome,
        descricao: novo.descricao
        
    })
    .then(res => {
        console.log(" Registrado ")
    })
}


const setorUpdate = editar =>{
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

const setorGet = arg =>{
    return axios
    .get('/setores')
    .then(res =>{
       return res.data
    
    })
}

const setorGetByNome = arg =>{
    return axios
    .get('/setores/'+arg)
    .then(res =>{
       return res.data
    
    })
}

const setorGetById = id =>{
    return axios
    .get('/setores/setor/'+id)
    .then(res =>{
       return res.data
    
    })
}

export { setorNovo, setorGet, setorGetByNome, setorGetById , setorUpdate}
