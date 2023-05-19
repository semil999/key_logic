import React, { useEffect, useState } from 'react'
import "./../style/socialmediapage.css"
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaBars, FaPlayCircle, FaPlus } from 'react-icons/fa';
import { Button, Modal, Offcanvas } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { postDataAdd } from '../../Redux/Action/postAction';
import Swal from 'sweetalert2';
import { deleteLoginUser } from '../../Redux/Action/loginUserAction';
import LoadingPage from './LoadingPage';

const SocialPage = () => {
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch();
    const loginUser = useSelector(state => state.loginUser.loginUser[0])
    const userData = user?.find(x => x.email == loginUser?.email && x.password == loginUser?.password)
    const blanckObj = {id : 0 , title : '' , discription : '' , mediatype : '' , file : '' , like : []}
    const [obj, setobj] = useState({...blanckObj})
    const navigate = useNavigate()
    const [loading, setloading] = useState(true)

    useEffect(() => {
        setloading(true)
        setTimeout(() => {
            setloading(false);
        }, 500);
    }, [])
    
    
    const logout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to Logout!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Logout!'
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteLoginUser(loginUser.id))
                setTimeout(() => {
                    navigate('/login')
                }, 1000);
            }
          })
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [showOffCanvas, setshowOffCanvas] = useState(false)

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
        dispatch(postDataAdd(obj))
        setobj({...blanckObj})
        handleClose()
        Swal.fire({
            position: "center-center",
            icon: "success",
            title: "Post added Successfully.",
            showConfirmButton: false,
            timer: 1500,
          });
    }
  return (
    <>
        {
            loading ? <>
                <LoadingPage />
            </> :
            <>
                <div className='container-fluid g-0' style={{height : '100vh'}}>
            <div className='d-flex align-items-center header' style={{background : '#1876f2' , color : 'white'}}>
                <FaPlayCircle className='ms-4 me-2 fs-1'/><h2 className='pt-1'><Link to={'/account/dashboard'} style={{color : '#fff' , textDecoration : 'none'}}>Social Media</Link></h2>
                <div className='ms-auto'>
                    <span className='me-3 fs-5' style={{cursor : 'pointer'}} onClick={handleShow}>Add Post <FaPlus className='fs-3'/></span>
                    <Link to={'/account/profile'} className='d-none d-lg-inline-block'>{userData?.profile != "" ? <img src={userData?.profile} className='headerimg me-3' /> : <img src='data:image/png;base64,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' className='headerimg me-3' />}</Link>
                </div>
            </div>
            <div className='d-flex flex-wrap bottomDiv' style={{backgroundColor : '#efefef'}}>
                <div className='leftside pt-lg-4 pt-3 pb-3 px-lg-3 px-4 d-flex align-items-center d-lg-block'>
                    <div className='d-flex justify-content-center align-items-center flex-wrap pb-lg-5 topimagediv'>
                        <Link to={'/account/profile'}><img src={userData?.profile} className='accountImage' /></Link>
                        <div>
                            <h5 className='fw-bold pt-2 mb-0 text-center'>{userData?.firstName} {userData?.lastName}</h5>
                            <span>{userData?.email}</span>
                        </div>
                    </div>
                    <button className="d-inline d-lg-none ms-auto me-2 leftbutton" onClick={() => setshowOffCanvas(true)}><FaBars /></button>
                    <div className='d-lg-block d-none px-xxl-4 px-3'>
                        <div><NavLink className='dashbuttons' to={'/account/dashboard'}>Dashboard</NavLink></div>
                        <div><NavLink className='dashbuttons' to={'/account/profile'}>Profile</NavLink></div>
                        <div><NavLink className='dashbuttons' to={'/account/myposts'}>My Posts</NavLink></div>
                        <div><NavLink className='dashbuttons' to={'/account/setting'}>Setting</NavLink></div>
                        <div><button onClick={logout} className='dashbuttons logoutbtn'>Logout</button></div>
                    </div>
                </div>
                <div className='rightside overflow-auto'>
                    <Outlet />
                </div>
            </div>
        </div>

        <Offcanvas show={showOffCanvas} className="d-lg-none" onHide={() => setshowOffCanvas(false)} responsive="lg">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className='fw-semibold fs-2'>Social Media</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <div className='w-50 mx-auto mt-4'>
                <div><NavLink onClick={() => setshowOffCanvas(false)} className='dashbuttons' to={'/account/dashboard'}>Dashboard</NavLink></div>
                <div><NavLink onClick={() => setshowOffCanvas(false)} className='dashbuttons' to={'/account/profile'}>Profile</NavLink></div>
                <div><NavLink onClick={() => setshowOffCanvas(false)} className='dashbuttons' to={'/account/myposts'}>My Posts</NavLink></div>
                <div><NavLink onClick={() => setshowOffCanvas(false)} className='dashbuttons' to={'/account/setting'}>Setting</NavLink></div>
                <div><button onClick={logout} className='dashbuttons logoutbtn'>Logout</button></div>
            </div>
        </Offcanvas.Body>
      </Offcanvas>

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
        }
    </>
  )
}

export default SocialPage