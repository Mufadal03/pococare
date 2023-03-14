import * as data from './actionType'
const initialState = {
    isAuth: JSON.parse(localStorage.getItem('token'))?true:false,
    token: JSON.parse(localStorage.getItem('token'))||null,
    isError: false,
    isLoading:false,
}

export const reducer = (state= initialState, { type, payload }) => {
    switch (type) {
        case data.LOGIN_REQUEST: {
            return {
                ...state,
                isLoading:true
            }
        }
        case data.LOGIN_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isAuth:true
            }
        }
        default:return state
    }
}