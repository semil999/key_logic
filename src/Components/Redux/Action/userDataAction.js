import axios from "axios"
import { USERDATA } from "../Type/types"

export const userApi = () => {
    return async (dispatch) => {
        await axios.get('http://192.168.29.148:3000/user').then(res => dispatch(userApiData(res.data)))
    }
}

export const userAddData = (obj) => {
    return async (dispatch) => {
        await axios.post('http://192.168.29.148:3000/user/' , obj).then(() => dispatch(userApi()))
    }
}

export const userUpdateData = (obj) => {
    return async (dispatch) => {
        await axios.put(`http://192.168.29.148:3000/user/${obj.id}` , obj).then(() => dispatch(userApi()))
    }
}

const userApiData = (userdata) => {
    return {
        type : USERDATA,
        userdata : userdata
    }
}