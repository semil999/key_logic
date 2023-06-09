import React, { useState } from 'react'
import { FaBookmark, FaShareSquare } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { postDataDelete, updatePost } from '../../Redux/Action/postAction'
import Like from './Like'
import { Button, Modal } from 'react-bootstrap';
import Comments from './Comments'
import { MagnifyingGlass } from 'react-loader-spinner'
import Swal from 'sweetalert2'

const MyPostsPage = () => {
  const post = useSelector(state => state.post.post)
  const userId = useSelector(state => state.loginUser.loginUser[0]?.userId)
  const myposts = post?.filter(x => x.userId == userId)
  const user = useSelector(state => state.user.user)
  const userData = user?.find(x => x.id == userId)
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

  const editPostData = (e) => {
    e.preventDefault();
    if(obj.id != 0){
      dispatch(updatePost(obj))
    }
    setobj({...blanckObj})
    handleClose()
    Swal.fire({
      position: "center-center",
      icon: "success",
      title: "Your Post Updated Successfully.",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  const editPost = (x) => {
    handleShow()
    setobj({...x})
  }
  const deletePost = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to Delete this Post!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(postDataDelete(id))  
        Swal.fire({
          position: "center-center",
          icon: "success",
          title: "Your Post Deleted Successfully.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    })
  }
  return (
    <>
      <div className='container-fluid'>
        <div className='row row-cols-1 row-cols-md-2 row-cols-xxl-3 px-lg-3 g-4 py-3'>
          {
            myposts?.map((x,i) => {
              return <div className='col' key={i}>
                <div className='card h-100'>
                <div className='text-white p-2 bg-dark card-header d-flex justify-content-between'>
                  <span><img src={userData?.profile} height={40} width={40} style={{borderRadius : '50%'}} /> <span>{userData?.firstName} {userData?.lastName}</span></span>
                </div>
                  <div>
                    {x.file == "" ? <div className='dashboardimg border-bottom border-2 d-flex flex-wrap justify-content-center align-items-center fw-bold fs-2'>Image Not Found<MagnifyingGlass visible={true} height="80" width="80" ariaLabel="MagnifyingGlass-loading" wrapperStyle={{}} wrapperClass="MagnifyingGlass-wrapper" glassColor = '#c0efff' color = 'red' /></div> : <img src={x.file} className='dashboardimg' />}
                </div>
                  <div className='card-body'>
                    <h5 className="card-title">{x.title}</h5>
                    <div>
                      <p className="text-muted">{x.discription}</p>
                    </div>
                    <div>
                      <button className='btn btn-danger me-3' onClick={() => deletePost(x.id)}>Delete this post</button>
                      <button onClick={() => editPost(x)} className='btn btn-success'>Edit Post</button>
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
            <form onSubmit={editPostData}>
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
                <button type='submit' style={{border : 'none'}}></button>
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