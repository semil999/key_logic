import axios from "axios"
import { POSTDATA } from "../Type/types"

export const getPostApi = () => {
    return (dispatch) => {
        axios.get('http://192.168.29.148:3000/post').then(res => {
            dispatch({
                type : POSTDATA,
                postdata : res.data
            })
        })
    }
}

export const postDataAdd = (obj) => {
    return (dispatch) => {
        axios.post('http://192.168.29.148:3000/post/' , obj).then(() => {
            dispatch(getPostApi())
        })
    }
}

export const postDataDelete = (id) => {
    return (dispatch) => {
        axios.delete(`http://192.168.29.148:3000/post/${id}`).then(() => {
            dispatch(getPostApi())
        })
    }
}

export const addLike = (obj) => {
    return (dispatch) => {
        axios.put(`http://192.168.29.148:3000/post/${obj.id}` , obj).then((res) => {
            console.log(res.data , 'response')
            dispatch(getPostApi())
        })
    }
}

export const Comment = (obj) => {
    return (dispatch) => {
        axios.put(`http://192.168.29.148:3000/post/${obj.id}` , obj).then(() => {
            dispatch(getPostApi())
        })
    }
}

export const updatePost = (obj) => {
    return (dispatch) => {
        axios.put(`http://192.168.29.148:3000/post/${obj.id}` , obj).then(() => {
            dispatch(getPostApi())
        })
    }
}