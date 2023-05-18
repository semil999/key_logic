import React, { useState } from 'react'
import { FaBookmark, FaShareSquare } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import "./../style/dashboard.css"
import Like from './Like'
import Comments from './Comments'
import { MagnifyingGlass } from 'react-loader-spinner'
import ReactPaginate from 'react-paginate'

const Dashboard = ({itemsPerPage}) => {
  const userId = JSON.parse(localStorage.getItem('loginUser'))
  const user = useSelector(state => state.user.user)
  const post = useSelector(state => state.post.post)
  const postData = post?.find(x => x.userId == userId)

  function Items({currentItems}) {
    return (
    <>
      <div className='container-fluid'>
        <div className='row row-cols-1 row-cols-md-2 row-cols-xxl-3 px-2 g-4 py-3'>
          {
            currentItems?.map((x,i) => {
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
                    {x.file == "" ? <div style={{height : '310px' , width : '100%'}} className='border-bottom border-2 d-flex flex-wrap justify-content-center align-items-center fw-bold fs-2'>Image Not Found <MagnifyingGlass visible={true} height="80" width="80" ariaLabel="MagnifyingGlass-loading" wrapperStyle={{}} wrapperClass="MagnifyingGlass-wrapper" glassColor = '#c0efff' color = 'red' /></div> : <img src={x.file} style={{height : '310px' , width : '100%'}} />}
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

  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = post.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(post.length / itemsPerPage);

  const handlePageClick = (event) => {
    console.log(event , 'event')
    const newOffset = (event.selected * itemsPerPage) % post.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} />
      <div className='pagination'>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="previous"
        renderOnZeroPageCount={null}
      />
      </div>
    </>
  )
}

export default Dashboard