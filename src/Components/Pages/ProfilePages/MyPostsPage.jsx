import React, { useState } from 'react'
import { FaBookmark, FaShareSquare } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { postDataDelete, updatePost } from '../../Redux/Action/postAction'
import { BiDotsVerticalRounded } from 'react-icons/bi';
import Like from './Like'
import Comments from './Comments'
import { Button, Dropdown, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MyPostsPage = () => {
  const post = useSelector(state => state.post.post)
  const userId = JSON.parse(localStorage.getItem('loginUser'))
  const user = useSelector(state => state.user.user)
  const userData = user?.find(x => x.id == userId)
  const myposts = post?.filter(x => x.userId == userId)
  const dispatch = useDispatch()

  const blanckObj = {id : 0 , title : '' , discription : '' , mediatype : '' , file : '' , like : []}
  const [obj, setobj] = useState({...blanckObj})

  const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const postData = async (e) => {
        if(e.target.name == "file"){
            let file = e.target.files[0]
            obj.file = file ? await toBase64(file) : ''
        }
        else{
            obj[e.target.name] = e.target.value
        }
        setobj({...obj})
    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });

    const editPostData = () => {
      if(obj.id != 0){
        dispatch(updatePost(obj))
      }
      setobj({...blanckObj})
      handleClose()
    }

    const editPost = (x) => {
      handleShow()
      setobj({...x})
    }

  return (
    <>
      <div className='container-fluid'>
        <div className='row row-cols-1 row-cols-md-2 row-cols-xxl-3 px-2 g-4 py-3'>
          {
            myposts?.map((x,i) => {
              return <div className='col' key={i}>
                <div className='card h-100'>
                <div className='text-white p-2 bg-dark card-header d-flex justify-content-between'>
                  <span><img src={userData.profile} height={40} width={40} style={{borderRadius : '50%'}} /> <span>{userData.firstName} {userData.lastName}</span></span>
                  {/* <span className='pt-2'><BiDotsVerticalRounded style={{cursor : 'pointer'}} className='fs-5'/></span> */}
                </div>
                  <div>
                    <img src={x.file} style={{height : '310px' , width : '100%'}} />
                  </div>
                  <div className='card-body'>
                    <h5 className="card-title">{x.title}</h5>
                    <div>
                      <p className="text-muted">{x.discription}</p>
                      <div className=''>
                        <button className='btn btn-danger me-3' onClick={() => dispatch(postDataDelete(x.id))}>Delete Post</button><button onClick={() => editPost(x)} className='btn btn-success'>Edit Post</button>
                      </div>
                    </div>
                  </div>
                  <div className='card-footer'>
                    <div className='d-flex justify-content-between fs-4'>
                      <span className='d-flex align-items-center'>
                        <Like like={x.like} postId={x.id}/>
                        <Comments postId={x.id} userPostId={x.id}/>
                        <FaShareSquare />
                      </span>
                      <span className='d-flex align-items-center'><FaBookmark /></span>
                    </div>
                  </div>
                </div>
              </div>
            })
          }
        </div>
      </div>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Your Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form>
                <div class="form-floating mb-3">
                  <input type="text" name='title' value={obj.title} className="form-control" id="floatingInput" placeholder="name@example.com" onChange={postData}/>
                  <label for="floatingInput">Title</label>
                </div>
                <div class="form-floating mb-3">
                  <input type="text" name='discription' value={obj.discription} className="form-control" id="floatingPassword" placeholder="Password" onChange={postData}/>
                  <label for="floatingPassword">Description</label>
                </div>
                <div className='mb-3 ps-1'>
                    <label className='fw-semibold'>Media Type :</label>
                    <input type="radio" name='mediatype' value='Image' checked={obj.mediatype?.includes('Image')} className='ms-2 me-1' onChange={postData}/>Image
                    <input type="radio" name='mediatype' value='Video' checked={obj.mediatype?.includes('Video')} className='ms-2 me-1' onChange={postData}/>Video
                </div>
                <div>
                    <input type="file" name="file" className='form-control' onChange={postData}/>
                </div>
            </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>Close</Button>
          <Button className='btn btn-primary' onClick={editPostData}>Update Post</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default MyPostsPage