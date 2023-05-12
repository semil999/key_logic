import React, { useState } from 'react'
import "./style/register.css"
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { userAddData } from '../Redux/Action/userDataAction';

const RegisterPage = () => {
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch()
  const blanckObj = {id : 0 , firstName : '' , lastName : '' , email : '' , date : '' , gender : '' , profile : '' , password : ''}
  const [obj, setobj] = useState({...blanckObj})

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
    let c1 = uuidv4();
    obj.id = c1;
    dispatch(userAddData(obj))
    setobj({...blanckObj})
  }
  console.log(user)

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