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
import LoadingPage from './Components/Pages/ProfilePages/LoadingPage';
import { getLoginUser } from './Components/Redux/Action/loginUserAction';

function App() {
  const user = useSelector(state => state.user.user)
  const loginUserId = useSelector(state => state.loginUser.loginUser[0]?.id)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(userApi())
    dispatch(getPostApi())
    dispatch(getLoginUser())
  }, [])
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          {
            !loginUserId ?
            <>
              <Route path='/login' element={<LoginPage />}></Route>
              <Route path='/register' element={<RegisterPage />}></Route>
              <Route path='*' element={<LoadingPage />}></Route>
            </>:
            <>
              <Route path='/' element={<Navigate to={'/account/dashboard'} />}/>
              <Route path='/account' element={<SocialPage />} >
                <Route path='dashboard' element={<Dashboard itemsPerPage={9}/>} ></Route>
                <Route path='profile' element={<ProfilePage />} ></Route>
                <Route path='myposts' element={<MyPostsPage />} ></Route>
                <Route path='setting' element={<Setting />} ></Route>
              </Route>
              <Route path='*' element={<Navigate to={'/account/dashboard'} />}></Route>
            </>
          }
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
