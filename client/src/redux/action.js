import customAxios from "../axios/axios"

export const signup = (payload) => dispatch => {
    console.log('signup fn invoked')
    return customAxios.post('/user/signup', payload)
        .then((res) => {
       return res
    }).catch((err) => {
        return err
    })
}

export const LoginFn = (payload) => dispatch => {
    return customAxios.post('/user/login', payload)
    .then((res)=>{
        return res
    })
        .catch((err) => {
       return err
    })
}

export const getTodos = () => dispatch => {
   return customAxios.get('/todos/', {
        headers:{Authorization:`Bearer ${JSON.parse(localStorage.getItem('token'))}`}
    })
        .then((res) => {
            return res
        }).catch(err => {
            return err
    })
}

export const refreshtoken = () => dispatch => {
    return customAxios.post('/user/refresh', { refreshToken: JSON.parse(localStorage.getItem('refreshToken') )})
        .then(res => {
        return res
        })
        .catch(err => {
       return err
    })
}