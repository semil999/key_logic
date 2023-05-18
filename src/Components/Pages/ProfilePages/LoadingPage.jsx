import React from "react";
import { RotatingLines } from "react-loader-spinner";

const LoadingPage = () => {
  return (
    <div style={{ display : 'flex' , justifyContent : 'center' , alignItems : "center" , height: "100vh", width: "100%", background: "rgba(0,0,0,0.3)" }}>
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </div>
  );
};

export default LoadingPage;
