import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './Components/Pages/LoginPage';
import RegisterPage from './Components/Pages/RegisterPage';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userApi } from './Components/Redux/Action/userDataAction';
import SocialPage from './Components/Pages/ProfilePages/SocialPage';
import Dashboard from './Components/Pages/ProfilePages/Dashboard';
import MyPostsPage from './Components/Pages/ProfilePages/MyPostsPage';
import ProfilePage from './Components/Pages/ProfilePages/ProfilePage';
import Setting from './Components/Pages/ProfilePages/Setting';
import { getPostApi } from './Components/Redux/Action/postAction';

function App() {
  const user = useSelector(state => state.user.user)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(userApi())
    dispatch(getPostApi())
  }, [])

  let loginData = JSON.parse(localStorage.getItem('loginData')) || {}
  let matchData = user?.find(x => x.email == loginData.email && x.password == loginData.password)
  return (
    <>
      <BrowserRouter>
        <Routes>
          {
            matchData == null ?
            <>
              <Route path='/' element={<Navigate to={'/login'} />}></Route>
              <Route path='/login' element={<LoginPage />}></Route>
              <Route path='/register' element={<RegisterPage />}></Route>
            </>:
            <>
              {/* <Route path='/' element={<Navigate to={'/account'} />}/> */}
              <Route path='/account' element={<SocialPage />} >
                <Route path='dashboard' element={<Dashboard />} ></Route>
                <Route path='profile' element={<ProfilePage />} ></Route>
                <Route path='myposts' element={<MyPostsPage />} ></Route>
                <Route path='setting' element={<Setting />} ></Route>
              </Route>
            </>
          }
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
