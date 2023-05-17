import React, { useState } from 'react'
import "./style/register.css"
import { Link, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { userAddData } from '../Redux/Action/userDataAction';
import Swal from 'sweetalert2';

const RegisterPage = () => {
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch()
  const blanckObj = {id : 0 , firstName : '' , lastName : '' , email : '' , date : '' , gender : '' , profile : '' , password : ''}
  const [obj, setobj] = useState({...blanckObj})
  const navigate = useNavigate()

  const userdata = async (e) => {
    if(e.target.name == "profile"){
      let file = e.target.files[0]
      obj.profile = file ? await toBase64(file) : ''
    }
    else{
      obj[e.target.name] = e.target.value
    }
    setobj({...obj})
  }

  const submitUserData = () => {
    if(obj.firstName != "" && obj.lastName != "" && obj.email != "" && obj.password != ""){
      let c1 = uuidv4();
    obj.id = c1;
    if(obj.profile == ""){
      if(obj.gender == "Male"){
        obj.profile = 'data:image/png;base64,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'
      }
      else{
        obj.profile = 'data:image/png;base64,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'
      }
    }
    Swal.fire({
      position: 'center-center',
      icon: 'success',
      title: 'You are Registered Succeccfully.',
      showConfirmButton: false,
      timer: 1500
    })
    setTimeout(() => {
      dispatch(userAddData(obj));
      navigate('/login')
      setobj({...blanckObj});
    }, 1500);
    }
    else{
      Swal.fire(
        'Please Fill Out This Fild',
        '',
        'question'
      )
    }
  }

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

  return (
    <>
        <div className='container d-flex justify-content-center align-items-center' style={{height : '100vh'}}>
          <form className='w-75 shadow-lg p-4 fs-5'>
            <h2 className='fw-bold text-center py-1'>REGISTER FORM</h2>
            <label className='w-100 pt-2 pb-1 fw-semibold'>First Name</label>
            <input type="text" name='firstName' value={obj.firstName} className='w-100 registerinp' onChange={userdata}/>

            <label className='w-100 pt-2 pb-1 fw-semibold'>Last Name</label>
            <input type="text" name='lastName' value={obj.lastName} className='w-100 registerinp' onChange={userdata}/>

            <label className='w-100 pt-2 pb-1 fw-semibold'>Email ID</label>
            <input type="email" name='email' value={obj.email} className='w-100 registerinp' onChange={userdata}/>

            <label className='w-100 pt-2 pb-1 fw-semibold'>Birth Date</label>
            <input type="date" name='date' value={obj.date} className='w-100 registerinp' onChange={userdata}/>

            <label className='w-100 pt-2 pb-1 fw-semibold'>Gender</label>
            <input type="radio" name='gender' value='Male' checked={obj.gender?.includes('Male')} className='me-1' onChange={userdata}/>Male
            <input type="radio" name='gender' value='Female' checked={obj.gender?.includes('Female')} className='me-1 ms-2' onChange={userdata}/>Female

            <label className='w-100 pt-2 pb-1 fw-semibold'>Profile</label>
            <input type="file" name='profile' onChange={userdata}/>

            <label className='w-100 pt-2 pb-1 fw-semibold'>Password</label>
            <input type="password" name='password' value={obj.password} className='w-100 registerinp' onChange={userdata}/>

            <div className='d-flex align-items-center mt-3'>
              <button type='button' className='btn btn-success' onClick={submitUserData}>Submit</button> <p className='pt-3 ps-2'>Already have an account? <Link to={'/login'} style={{ fontWeight : '600' , textDecoration : 'none'}}>Login now</Link></p>
            </div>
          </form>
        </div>
    </>
  )
}

export default RegisterPage