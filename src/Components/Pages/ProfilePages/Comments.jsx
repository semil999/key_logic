import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import { FaCommentDots, FaLocationArrow, FaPen } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { v4 as uuidv4 } from 'uuid';
import "./../style/comments.css"
import { useDispatch, useSelector } from 'react-redux';
import { Comment } from '../../Redux/Action/postAction';

const Comments = ({postId , userPostId}) => {
    const userId = JSON.parse(localStorage.getItem('loginUser'))
    const [isShow, setisShow] = useState(false)
    const user = useSelector(state => state.user.user) 
    const userData = user?.find(x => x.id == userId)
    const post = useSelector(state => state.post.post)
    const postData = post?.find(x => x.id == postId)
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    const blanckObj = {id : 0 , comment : '' , userId : 0 , postId : 0 , email : ''}
    const [obj, setobj] = useState({...blanckObj})

    const commentData = (e) => {
        obj.comment = e.target.value
        if(e.target.value != ""){
            setisShow(true)
        }
        else{
            setisShow(false)
        }
        setobj({...obj})
    }

    const addComment = () => {
        if(obj.id == 0){
            if(obj.comment == ""){
                alert('Please Enter Comment in Box');
            }
            else{
                let c1 = uuidv4();
                obj.id = c1;
                obj.userId = userId
                obj.postId = postId
                obj.email = userData.email
                let postObj = post?.find(x => x.id == obj.postId)
                'comment' in postObj == true ? postObj.comment.push(obj) : postObj.comment = [obj]
                dispatch(Comment(postObj))
            }
        }
        else{
            let postObj = post?.find(x => x.id == obj.postId)
            let update = postObj.comment?.findIndex(x => x.id == obj.id)
            postObj.comment.splice(update , 1 , obj)
            dispatch(Comment(postObj))
        }
        setisShow(false)
        setobj({...blanckObj})
    }

    const editComment = (x) => {
        setobj({...x})
    }

    const deleteComment = (x) => {
        let postObj = post?.find(e => e.id == x.postId)
        let update = postObj.comment?.findIndex(e => e.id == x.id)
        postObj.comment.splice(update , 1)
        dispatch(Comment(postObj))
    }

    const enterKey = (e) => {
        console.log('first')
        console.log(e)
    }

  return (
    <>
        <FaCommentDots style={{cursor : 'pointer'}} className='' onClick={() => setShow(true)}/> <span className='me-3 ms-1'>{postData?.comment?.length}</span>
        <Modal show={show} onHide={() => setShow(false)} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Comments</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='mb-3'>
                    <input onChange={commentData} value={obj.comment} type="text" className='commentinput' name='comment' placeholder='Add Your Comment' style={{ width : '95%' , border : 'none' , borderBottom : '0.5px solid gray'}}/> {isShow == true ? <FaLocationArrow style={{cursor : 'pointer'}} className='text-primary' onClick={addComment} onKeyPress={enterKey}/> : <></>}
                </div>
                <div>
                    <dl>
                        {
                            postData?.comment?.map((x,i) => {
                                return x.userId == userId ? 
                                <div key={i}>
                                    <dt className='d-flex justify-content-between align-items-center fw-semibold text-dark'>{x.comment} <span><MdDelete style={{color : 'red' , cursor : 'pointer'}} className='fs-3' onClick={() => deleteComment(x)}/> <FaPen style={{cursor : 'pointer'}} onClick={() => editComment(x)} className='fs-5 text-success' /></span></dt>
                                    <dd className='text-end border-bottom text-muted'>-{x.email}</dd>
                                </div> :
                                x.postId == userPostId ? 
                                <div key={i}>
                                    <dt className='d-flex justify-content-between align-items-center fw-semibold text-dark'>{x.comment} <MdDelete style={{color : 'red' , cursor : 'pointer'}} className='fs-3' onClick={() => deleteComment(x)}/></dt>
                                    <dd className='text-end border-bottom text-muted'>-{x.email}</dd>
                                </div> :
                                <div key={i}>
                                    <dt className='d-flex justify-content-between align-items-center fw-semibold text-dark'>{x.comment}</dt>
                                    <dd className='text-end border-bottom text-muted'>-{x.email}</dd>
                                </div>
                            })
                        }
                    </dl>
                </div>
            </Modal.Body>
        </Modal>
    </>
  )
}

export default Comments