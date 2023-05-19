import React from 'react'
import { FaQuestion } from 'react-icons/fa'
import "./../style/error.css"
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ErrorPage = () => {
  const userId = useSelector(state => state.loginUser.loginUser[0]?.userId)
  return (
    <>
      <div className='outerbox'>
      <div class="mainbox">
        <div class="err">4</div>
        <FaQuestion className='far'/>
        <div class="err2">4</div>
        <div class="msg">Maybe this page moved? Got deleted? Is hiding out in quarantine? Never existed in the first place?<p>Let's go <Link to={!userId ? '/login' : '/account/dashboard'}>home</Link> and try from there.</p></div>
      </div>
      </div>
    </>
  )
}

export default ErrorPage