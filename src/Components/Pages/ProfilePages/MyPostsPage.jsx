import React from 'react'
import { FaBookmark, FaShareSquare } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { postDataDelete } from '../../Redux/Action/postAction'
import Like from './Like'
import Comments from './Comments'

const MyPostsPage = () => {
  const post = useSelector(state => state.post.post)
  const userId = JSON.parse(localStorage.getItem('userId'))
  const dispatch = useDispatch()

  const myposts = post?.filter(x => x.userId == userId)
  return (
    <>
      <div className='container-fluid'>
        <div className='row row-cols-3 g-4 py-3'>
          {
            myposts?.map((x,i) => {
              return <div className='col' key={i}>
                <div className='card h-100'>
                {/* <div className='text-white p-2 bg-dark card-header'>
                  <img src={x.profile} height={40} width={40} style={{borderRadius : '50%'}} /> <span>{e.firstName} {e.lastName}</span>
                </div> */}
                  <div>
                    <img src={x.file} style={{height : '310px' , width : '100%'}} className='card-img-top' />
                  </div>
                  <div className='card-body'>
                    <h5 className="card-title">{x.title}</h5>
                    <div>
                      <p className="text-muted">{x.discription}</p> <span style={{cursor : 'pointer'}} className='text-decoration-underline text-danger' onClick={() => dispatch(postDataDelete(x.id))}>Delete this post</span>
                    </div>
                  </div>
                  <div className='card-footer'>
                    <div className='d-flex justify-content-between fs-4'>
                      <span className='d-flex align-items-center'>
                        {/* <FaHeart className='me-3'/> */}
                        <Like like={x.like} postId={x.id}/>
                        <Comments />
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
    </>
  )
}

export default MyPostsPage