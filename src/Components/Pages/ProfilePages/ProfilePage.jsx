import React from 'react'
import { useSelector } from 'react-redux'
import "./../style/profile.css"
import { Link } from 'react-router-dom'

const ProfilePage = () => {
    const user = useSelector(state => state.user.user)
    const loginUser = useSelector(state => state.loginUser.loginUser[0])
    const userData = user?.find(x => x.email == loginUser?.email && x.password == loginUser?.password)
  return (
    <>
        <div className='container h-100 d-flex justify-content-center align-items-center'>
            <div className='bg-white shadow-lg rounded-4 p-3 profileheight'>
                <div className='text-center'>
                    <img src={userData?.profile} className='profileImage'/>
                </div>
                <div>
                    <div className='profilediv'>
                        <p>Name :</p>
                        <span>{userData?.firstName} {userData.lastName}</span>
                    </div>
                    <div className='profilediv'>
                        <p>Email ID :</p>
                        <span>{userData?.email}</span>
                    </div>
                    <div className='profilediv'>
                        <p>Birth Date :</p>
                        <span>{userData?.date}</span>
                    </div>
                    <div className='profilediv'>
                        <p>Gender :</p>
                        <span>{userData?.gender}</span>
                    </div>
                    <div className='text-center pt-4'>
                        <Link to={'/account/setting'} className='btn btn-primary px-4'>Edit Your Profile</Link>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default ProfilePage