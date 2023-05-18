import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userUpdateData } from '../../Redux/Action/userDataAction'
import "./../style/setting.css"
import Swal from 'sweetalert2'

const Setting = () => {
    const user = useSelector(state => state.user.user)
    const loginUser = JSON.parse(localStorage.getItem('loginData')) || {}
    const userData = user?.find(x => x.email == loginUser.email && x.password == loginUser.password)
    const [obj, setobj] = useState({...userData})
    const dispatch = useDispatch()
    
    const data = async (e) => {
        if(e.target.name == "profile"){
            let file = e.target.files[0]
            obj.profile = file ? await toBase64(file) : userData.profile
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

    const saveData = (e) => {
        e.preventDefault();
        if(obj.id == userData.id){
            dispatch(userUpdateData(obj))
        }
    }

    const logout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to Logout!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Logout'
          }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('loginData')
                localStorage.removeItem('loginUser')
                window.location.reload()
                window.location.href = '/login'
            }
          })
    }

  return (
    <>
        <div className='container d-flex justify-content-center align-items-center h-100'>
            <form className='bg-white settingdiv w-75 rounded-4 p-4 fs-5' onSubmit={saveData}>
                <h3 className='text-center fw-bold text-decoration-underline' style={{color : '#1876f2'}}>Edit Your Profile</h3>
                <label className='w-100 fw-bold pt-3'>First Name :- </label>
                <input type="text" value={obj.firstName} name='firstName' className='w-100 editinput' onChange={data}/>
                <label className='w-100 fw-bold pt-3'>Last Name :-</label>
                <input type="text" value={obj.lastName} name='lastName' className='w-100 editinput' onChange={data}/>
                <label className='w-100 fw-bold pt-3'>Birth Date :-</label>
                <input type="date" value={obj.date} name='date' className='w-100 editinput' onChange={data}/>
                <label className='w-100 fw-bold pt-3'>Gender :-</label>
                <input type="radio" value='Male' checked={obj.gender?.includes('Male')} name='gender' onChange={data}/>Male
                <input type="radio" value='Female' checked={obj.gender?.includes('Female')} name='gender' onChange={data}/>Female <br />
                <label className='w-100 fw-bold pt-3'>Profile :-</label>
                <div className='d-flex align-items-center'>
                    <img src={obj.profile} style={{height : '40px' , width : '40px' , borderRadius : '50%'}} alt="" /><input type="file" className='ms-2' name='profile' onChange={data}/>
                </div>
                <div className='text-center pt-4'>
                    <button className='btn btn-success px-3' type='submit'>Update Profile</button>
                    <button className='btn btn-danger ms-3 px-3' type='button' onClick={logout}>Logout</button>
                </div>
            </form>
        </div>
    </>
  )
}

export default Setting