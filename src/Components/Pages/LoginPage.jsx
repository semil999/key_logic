import React, { useState } from 'react'
import "./style/loginpage.css"
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const LoginPage = () => {
  const user = useSelector(state => state.user.user)
  const blanckObj = {email : '' , password : ''}
  const [obj, setobj] = useState({...blanckObj})

  const logindata = (e) => {
    obj[e.target.name] = e.target.value
    setobj({...obj})
  }

  const saveData = () => {
    let matchuserdata = user?.find(x => x?.email == obj?.email)
    if(matchuserdata?.email == obj?.email && matchuserdata?.password == obj?.password){
      localStorage.setItem('loginData' , JSON.stringify(obj))
      localStorage.setItem('userId' , JSON.stringify(matchuserdata.id))
      window.location.href = "/account/dashboard"
    }
    else if(matchuserdata?.email == obj.email && matchuserdata?.password != obj.password){
      alert('Please enter valid password');
    }
    else if(obj.email == "" && obj.password == ""){
      alert('Please fill out this fild');
    }
    else{
      alert('please enter valid username');
    }
  }
  return (
    <>
        <div className='container d-flex justify-content-center align-items-center' style={{height : '100vh'}}>
            <form className='shadow-lg p-4' style={{ borderRadius : '15px' , width : '400px' , backgroundColor : 'black' , color : 'white'}}>
              <h2>LOGIN</h2>
              <label className='w-100 pt-2 pb-1'>User Name :-</label>
              <input type="email" className='w-100 logininp' onChange={logindata} name="email" />

              <label className='w-100 pt-2 pb-1'>Password :-</label>
              <input type="password" className='w-100 logininp' onChange={logindata} name='password' />

              <div className='d-flex align-items-center mt-3'>
                <button onClick={saveData} type='button' className='btn btn-success'>Login</button> <p className='pt-3 ps-2'>Don't have an account? <Link to={'/register'} style={{fontWeight : 'bold' , textDecoration : 'none'}}>Signup now</Link> </p>
              </div>
            </form>
        </div>
    </>
  )
}

export default LoginPage