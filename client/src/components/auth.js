import axios from 'axios'

const token = localStorage.getItem('usertoken')

 const isAuthenticated = () => {
    

   axios.get('/verifytoken',{
        headers:{
            "Content-Type": "application/json",
            "authorization":`Bearer ${token}`
        }
    }).then(res => {
        localStorage.setItem('success', res.data.success )
      return res.data.success
    }).catch(err => console.log('Error', err))

  
   return localStorage.getItem('success')
}
 
export {isAuthenticated}