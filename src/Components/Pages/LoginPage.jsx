import React, { useState } from "react";
import "./style/loginpage.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { addLoginUser } from "../Redux/Action/loginUserAction";
import { v4 as uuidv4 } from 'uuid';

const LoginPage = () => {
  const user = useSelector((state) => state.user.user);
  const blanckObj = { email: "", password: "" };
  const [obj, setobj] = useState({ ...blanckObj });
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const logindata = (e) => {
    obj[e.target.name] = e.target.value;
    setobj({ ...obj });
  };

  const saveData = (e) => {
    e.preventDefault();
    let matchuserdata = user?.find((x) => x?.email == obj?.email);
    if (
      matchuserdata?.email == obj?.email &&
      matchuserdata?.password == obj?.password
    ) {
      Swal.fire({
        position: "center-center",
        icon: "success",
        title: "Your Login Successfully.",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        obj.id = uuidv4();
        obj.userId = matchuserdata.id
        dispatch(addLoginUser(obj))
        navigate('/account/dashboard')
      }, 1500);

    }
    else if (obj.email == "" && obj.password == "") {
      Swal.fire("Please Fill Out This Fild !",'','question');
    } 
    else {
      Swal.fire({
        icon: "error",
        title: "Please enter valid UserName and Password.",
      });
    }
  };
  return (
    <>
      <div className="login">
        <div className="background">
          <div className="shape"></div>
          <div className="shape"></div>
        </div>
        <form onSubmit={saveData}>
          <h3>Login Here</h3>

          <label htmlFor="username">Username</label>
          <input type="email" placeholder="Email ID" id="username" onChange={logindata} name="email" />

          <label htmlFor="password">Password</label>
          <input type="password" placeholder="Password" id="password" onChange={logindata} name="password"/>

          <button type="submit" className="button">Log In</button>
          <div className="pt-4 px-1">
            <h6>Don't have an account? <Link to={'/register'} style={{color : '#3188ff'}} className="fw-bold text-decoration-none">Sing up</Link> </h6>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
