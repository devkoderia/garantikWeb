import axios from 'axios'



const api = axios.create({
    
    baseURL: process.env.REACT_APP_API,
    
    headers: {
        'Content-Type': 'application/json',        
        'x-access-token': '!nf0$@ud#',
    }
    
})

export default api  
