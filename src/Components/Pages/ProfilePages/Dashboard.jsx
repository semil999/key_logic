import React from 'react'
import { FaBookmark, FaShareSquare } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import "./../style/dashboard.css"
import Like from './Like'
import Comments from './Comments'

const Dashboard = () => {
  const userId = JSON.parse(localStorage.getItem('loginUser'))
  const user = useSelector(state => state.user.user)
  const post = useSelector(state => state.post.post)
  const postData = post?.find(x => x.userId == userId)
  return (
    <>
      <div className='container-fluid'>
        <div className='row row-cols-1 row-cols-md-2 row-cols-xxl-3 px-2 g-4 py-3'>
          {
            post?.map((x,i) => {
              return <div className='col' key={i}>
                <div className='card h-100'>
                <div className='text-white p-2 bg-dark card-header'>
                  {
                    user?.map((e , index) => {
                      return <div key={index}>
                        {
                          e.id == x.userId ? 
                          <>
                            <img src={e.profile} height={40} width={40} style={{borderRadius : '50%'}} /> <span>{e.firstName} {e.lastName}</span>
                          </> : <></>
                        }
                      </div>
                      })
                    }
                    </div>
                  <div>
                    <img src={x.file} style={{height : '310px' , width : '100%'}} className='' />
                  </div>
                  <div className='card-body'>
                    <h5 className="card-title">{x.title}</h5>
                    <small className="text-muted">{x.discription}</small>
                  </div>
                  <div className='card-footer'>
                    <div className='d-flex justify-content-between fs-4'>
                      <span>
                        <Like like={x.like} postId={x.id}/>
                        <Comments postId={x.id} userPostId={postData?.id}/>
                        <FaShareSquare />
                      </span>
                      <span><FaBookmark /></span>
                    </div>
                  </div>
                </div>
              </div>
            })
          }
        </div>
      </div>
    </>
  )
}

export default Dashboard