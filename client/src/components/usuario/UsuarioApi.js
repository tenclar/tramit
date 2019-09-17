import axios from 'axios'


const usuarioNovo = novo =>{
    return axios
    .post('/usuarios/novo', {
        nome: novo.nome,
        email: novo.email,
        password:novo.password,
        nivel:novo.nivel,
        setorId:novo.setorId

        
    })
    .then(res => {
        if(res.data.error){
        return res.data
        }
    })
}

const usuarioUpdate = editar =>{
    return axios
    .post('/usuarios/editar',{
        nome: editar.nome,
        email: editar.email,
        password:editar.password,
        nivel:editar.nivel,
        setorId:editar.setorId,
        id: editar.id
    })
    .then(res => {
       return res.data
    })
}


const usuarioGet = arg =>{
    return axios
    .get('/usuarios')
    .then(res =>{
       return res.data
    
    })
}

const usuarioGetByNome = arg =>{
    return axios
    .get('/usuarios/'+arg)
    .then(res =>{
       return res.data
    
    })
}

const usuarioIdGet = id =>{
    
    return axios
    .get('/usuarios/u/'+id)
    .then(res => {
       return res.data
    })
}



 const login = user => {
    return axios 
    .post('/auth', {
        email: user.email,
        password:user.password
    })
    .then(res => {
        
        localStorage.setItem('usertoken', res.data)
       
        return res.data
    }).then(err => {        
        return err.data
    })
   /*  .catch(err => {
        console.log(err)
        return err.error
       
    }) */
}



export { 
    usuarioNovo, 
    usuarioGet, 
    usuarioIdGet, 
    usuarioGetByNome, 
    usuarioUpdate,
    login
 }
