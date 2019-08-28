import axios from 'axios'


const tramitNovo = novo =>{
    return axios
    .post('/tramitacoes/novo', {
        
        setorId:novo.setorId,
        documentoId:novo.documentoId,
        datacad:novo.datacad,
        acao:novo.acao,
        movimento:novo.movimento,
        despacho:novo.despacho,
        observacao:novo.observacao
    })
    .then(res => {
        return res.data
    })
}
const tramitGetByNome = arg =>{
    return axios
    .get('/tramitacoes/'+arg)
    .then(res =>{
       return res.data
    
    })
}

const tramitGetFilter = args =>{
    return axios
    .get('/docs/tramit/'+args.arg)
    .then(res =>{
       return res.data
    
    })
}

const tramitGetById = id =>{
    return axios
    .get('/tramitacoes/tramite/'+ id)
    .then(res =>{
       return res.data
    
    })
}


const tramitGet = arg =>{
    return axios
    .get('/tramitacoes')
    .then(res =>{
       return res.data
    
    })
}
const tramitUpdate = editar =>{
    return axios
    .post('/tramits/editar',{
      
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
export { tramitNovo, tramitGet, tramitGetByNome, tramitGetById, tramitUpdate, tramitGetFilter }
