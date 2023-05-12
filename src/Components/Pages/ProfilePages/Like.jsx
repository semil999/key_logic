import React, { useState } from 'react'
import { FaHeart } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { addLike } from '../../Redux/Action/postAction'

const Like = (props) => {
    const userId = JSON.parse(localStorage.getItem('userId'))
    const post = useSelector(state => state.post.post)
    const postdata = post?.find(x => x.id == props.postId)
    const [showLike, setshowLike] = useState(props?.like?.includes(userId) ? true : false)
    const dispatch = useDispatch()
    
    const like = () => {
        if(!showLike){
            postdata.like.push(userId)
            setshowLike(true)
        }
        else{
            let likeary = postdata.like?.filter(x => x != userId)
            postdata.like = likeary
            setshowLike(false)
        }
        dispatch(addLike(postdata))
    }
  return (
    <>
        <FaHeart style={showLike == true ? {color : 'red'} : {color : 'black'}} onClick={like} /> <span className='me-3 ms-1'>{postdata?.like?.length}</span>
    </>
  )
}

export default Like