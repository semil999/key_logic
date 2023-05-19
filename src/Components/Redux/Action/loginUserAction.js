import axios from "axios"
import { LOGINUSER } from "../Type/types"

export const getLoginUser = () => {
    return (dispatch) => {
        axios.get('http://192.168.29.148:3000/loginUser').then(res => {
            dispatch({
                type : LOGINUSER,
                data : res.data
            })
        })
    }
}

export const addLoginUser = (obj) => {
    return (dispatch) => {
        axios.post('http://192.168.29.148:3000/loginUser' , obj).then(() => {
            dispatch(getLoginUser())
        })
    }
}

export const deleteLoginUser = (id) => {
    return (dispatch) => {
        axios.delete(`http://192.168.29.148:3000/loginUser/${id}`).then(() => {
            dispatch(getLoginUser())
        })
    }
}