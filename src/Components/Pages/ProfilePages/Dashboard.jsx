import React, { useRef, useState } from 'react'
import { FaBookmark, FaCommentDots, FaHeart, FaShareSquare } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import "./../style/dashboard.css"
import { addLike } from '../../Redux/Action/postAction'
import Like from './Like'
import Comments from './Comments'

const Dashboard = () => {
  const user = useSelector(state => state.user.user)
  const post = useSelector(state => state.post.post)
  const userId = JSON.parse(localStorage.getItem('userId'))
  const dispatch = useDispatch()
  let id;
  let postdata = post?.find(x => x.id == id?.id)
  const [showLike, setshowLike] = useState(id?.like?.includes(userId) ? true : false)

  const like = (object) => {
    // if(object.like == ""){
    //   object.like.push(userId)
    //   object.showLike = true
    // }
    // else{
    //   // object.like?.map(x => x != userId ? object.like.push(userId) : object.like = a)
    //   object.like?.map(x => {
    //     if(x != userId){
    //       object.like.push(userId)
    //     }
    //     else{
    //       let a = object.like?.filter(e => e != userId);
    //       object.like = a;
    //     }
    //     return object.like
    //   })
    // }
    // dispatch(addLike(object))
    if(!showLike){
      postdata.like.push(userId)
      setshowLike(true)
    }
    else{
      let a = postdata.like?.filter(e => e != userId);
      postdata.like = a;
      setshowLike(false)
    }
    dispatch(addLike(postdata))
  }
  return (
    <>
      <div className='container-fluid'>
        <div className='row row-cols-3 g-4 py-3'>
          {
            post?.map((x,i) => {
              // console.log(id = x)
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
                        {/* <FaHeart style={showLike == true ? {color : 'red'} : {color : 'black'}} className='me-3' onClick={() => like(x)}/> {x.like?.length} */}
                        <Like like={x.like} postId={x.id}/>
                        <Comments />
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