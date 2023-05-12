import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';
import { FaCommentDots, FaLocationArrow } from 'react-icons/fa'
import "./../style/comments.css"

const Comments = () => {
    const [show, setShow] = useState(false);
  return (
    <>
        <FaCommentDots className='me-3' onClick={() => setShow(true)}/>
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Comments</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input type="text" className='commentinput' name='comment' placeholder='Add Your Comment' style={{border : 'none' , borderBottom : '0.5px solid gray'}}/><FaLocationArrow />
            </Modal.Body>
        </Modal>
    </>
  )
}

export default Comments