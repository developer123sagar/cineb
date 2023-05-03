import React, { useContext, useState } from "react";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import swal from "sweetalert";
import { TailSpin } from "react-loader-spinner";
import { query, where, getDocs } from "firebase/firestore";
import app, { userRef } from "../firebase/firebase";
import bcrypt from "bcryptjs";
import { AppState } from "../App";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";


const Login = () => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();


  const useAppState = useContext(AppState);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    mobile: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const Login = async () => {
    setLoading(true);
    try {
      const _query = query(userRef, where("mobile", "==", form.mobile));
      const querySnapshot = await getDocs(_query);
      querySnapshot.forEach((doc) => {
        const _data = doc.data();
        const isUser = bcrypt.compareSync(form.password, _data.password);

        if (isUser) {
          useAppState.setIsLogin(true);
          swal({
            title: "Logged in successfully",
            icon: "success",
            button: false,
            timer: 3000,
          });
          navigate("/");
        } else {
          swal({
            title: "invalid credentials",
            icon: "error",
            button: false,
            timer: 3000,
          });
        }
      });
    } catch (e) {
      swal({
        title: e,
        icon: "e",
        button: false,
        timer: 3000,
      });
    }
    setLoading(false);
  };

  const googleLogin = () =>{
    useAppState.setIsLogin(true)
    signInWithPopup(auth, provider)
    .then((data) => {
     navigate('/')
     localStorage.setItem('email',data.user.email);
     
    }).catch((error) => {
      console.log(error)
    });
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-300">
        <div className="relative flex flex-col m-4 space-y-0 bg-pink-100 shadow-2xl rounded-2xl md:flex-row md:space-y-0 overflow-hidden">
          <div className="absolute md:w-[600px] md:h-[720px] w-[400px] h-[600px] bg-gradient-to-r from-red-600 via-lime-500 to-transparent -top-[50%] -left-[50%] animate-spin-slow origin-bottom-right"></div>
          <div className="absolute md:w-[600px] md:h-[720px] w-[400px] h-[600px] bg-gradient-to-r from-lime-600 via-red-600 to-transparent -top-[50%] -left-[50%] animate-spin-delay origin-bottom-right"></div>
          <div className="absolute inset-1 rounded-2xl p-5 bg-pink-100"></div>
          <div className="flex flex-col justify-center p-4 md:p-14 z-10">
            <span className="mb-3 text-4xl font-bold text-black">
              Welcome back
            </span>
            <span className="font-bold text-gray-600 mb-2">
              Welcom back ! Please Login to your account
            </span>
            <div className="py-2">
              <span className="mb-2 text-black font-bold text-lg">
                Mobile Number
              </span>
              <input
                type="text"
                value={form.mobile}
                onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                className="w-full p-2 border border-gray-800 rounded-md text-black font-bold text-lg outline-none bg-transparent"
                name="mobileNumber"
                id="mobileNumber"
              />
            </div>
            <div className="py-2">
              <span className="mb-2 text-black font-bold text-lg">
                Password
              </span>
              <input
                type={"password"}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                name="pass"
                id="pass"
                className="w-full p-2 border border-gray-800 rounded-md text-black font-bold text-lg outline-none bg-transparent"
              />
            </div>
            <div className="flex justify-between w-full py-4">
              <div className="mr-24">
                <label htmlFor="check">
                  <input type="checkbox" name="ch" id="ch" className="mr-2" />
                  <span className="text-black font-bold">Remember me</span>
                </label>
              </div>
              <span className="font-bold text-black cursor-pointer">
                Forgot password ?
              </span>
            </div>
            <div className="mb-1">
              <Button onClick={Login} variant="contained" className="w-full">
                {
                  loading ? <TailSpin color="white" height={30} width={30}/> : "Login"
                }
              </Button>
            </div>
            <span className="text-black font-bold text-xs my-1 w-full ml-40">
              Or
            </span>
            <div className="mb-4">
              <Button onClick={googleLogin} variant="contained" className="w-full">
                <GoogleIcon className="mr-4" />
                signin with google
              </Button>
            </div>
            <div className="text-center text-gray-500 font-bold">
              Dont'have an account ?
              <Link to={"/signup"}>
                <span className="font-bold text-blue-700 ml-3 cursor-pointer">
                  Sign up here
                </span>
              </Link>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://raw.githubusercontent.com/soriya2/Login-Form/main/image.jpg"
              alt="img"
              className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
