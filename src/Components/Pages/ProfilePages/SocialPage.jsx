import React, { useState } from 'react'
import "./../style/socialmediapage.css"
import { Link, NavLink, Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaPlayCircle, FaPlus } from 'react-icons/fa';
import { Button, Modal } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { postDataAdd } from '../../Redux/Action/postAction';

const SocialPage = () => {
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch();
    const loginUser = JSON.parse(localStorage.getItem('loginData')) || {}
    const userData = user?.find(x => x.email == loginUser.email && x.password == loginUser.password)
    const blanckObj = {id : 0 , title : '' , discription : '' , mediatype : '' , file : '' , like : []}
    const [obj, setobj] = useState({...blanckObj})
    
    const logout = () => {
        localStorage.removeItem('loginData')
        localStorage.removeItem('loginUser')
        window.location.reload()
        window.location.href = '/login'
    }

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

    const addPostData = () => {
        let c1 = uuidv4();
        obj.id = c1;
        obj.userId = userData.id
        obj.showLike = false;
        dispatch(postDataAdd(obj))
        setobj({...blanckObj})
        handleClose()
    }
  return (
    <>
        <div className='container-fluid g-0' style={{height : '100vh'}}>
            <div className='d-flex align-items-center header' style={{background : '#1876f2' , color : 'white'}}>
            <FaPlayCircle className='ms-4 me-2 fs-1'/><h2 className='pt-1'><Link to={'/account/dashboard'} style={{color : '#fff' , textDecoration : 'none'}}>Social Media</Link></h2>
                <div className='ms-auto'>
                    <span className='me-3 fs-5' style={{cursor : 'pointer'}} onClick={handleShow}>Add Post <FaPlus className='fs-3'/></span>
                    <Link to={'/account/profile'}><img src={userData.profile} className='headerimg me-3' /></Link>
                </div>
            </div>
            <div className='d-flex flex-wrap bottomDiv' style={{backgroundColor : '#efefef'}}>
                <div className='leftside h-100 p-3 px-5 border-end border-dark'>
                    <div className='d-flex justify-content-center flex-wrap pb-5'>
                        <img src={userData.profile} className='accountImage' alt="" />
                        <h5 className='fw-bold pt-2 mb-0'>{userData.firstName} {userData.lastName}</h5>
                        <span>{userData.email}</span>
                    </div>
                    <div><NavLink className='dashbuttons' to={'/account/dashboard'}>Dashboard</NavLink></div>
                    <div><NavLink className='dashbuttons' to={'/account/profile'}>Profile</NavLink></div>
                    <div><NavLink className='dashbuttons' to={'/account/myposts'}>My Posts</NavLink></div>
                    <div><NavLink className='dashbuttons' to={'/account/setting'}>Setting</NavLink></div>
                    <div><button onClick={logout} className='dashbuttons logoutbtn'>Logout</button></div>
                </div>
                <div className='rightside h-100 overflow-auto'>
                    <Outlet />
                </div>
            </div>
        </div>

        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>New Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form>
                <div class="form-floating mb-3">
                  <input type="text" name='title' className="form-control" id="floatingInput" placeholder="name@example.com" onChange={postData}/>
                  <label for="floatingInput">Title</label>
                </div>
                <div class="form-floating mb-3">
                  <input type="text" name='discription' className="form-control" id="floatingPassword" placeholder="Password" onChange={postData}/>
                  <label for="floatingPassword">Description</label>
                </div>
                <div className='mb-3 ps-1'>
                    <label className='fw-semibold'>Media Type :</label>
                    <input type="radio" name='mediatype' value='Image' className='ms-2 me-1' onChange={postData}/>Image
                    <input type="radio" name='mediatype' value='Video' className='ms-2 me-1' onChange={postData}/>Video
                </div>
                <div>
                    <input type="file" name="file" className='form-control' onChange={postData}/>
                </div>
            </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>Close</Button>
          <Link to={'/account/dashboard'} className='btn btn-primary' onClick={addPostData}>Add Post</Link>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default SocialPage