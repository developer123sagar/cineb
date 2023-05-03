import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { TailSpin } from "react-loader-spinner";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  getAuth,
} from "firebase/auth";
import swal from "sweetalert";
import app, { userRef } from "../firebase/firebase";
import bcrypt from "bcryptjs"
import { addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    username: "",
    mobile: "",
    password: "",
  });
  
  const [loading, setLoading] = useState(false);
  const [OTPSent, setOTPSent] = useState(false);
  const [OTP, setOTP] = useState("");
  
  const auth = getAuth(app);

  const generateReCaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {},
      },
      auth
    );
  };
  
  const requestOTP = () => {
    setLoading(true);
    generateReCaptcha();
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, `+977${form.mobile}`, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        swal({
          title: "A code has been sent to your mobile number",
          icon: "success",
          button: false,
          timer: 3000,
          timerProgressBar: true,
        });
        setOTPSent(true);
        setLoading(false);
      })
      .catch((error) => {
        swal({
          title: error.message,
          icon: "error",
          button: false,
          timer: 3000,
          timerProgressBar: true,
        });
        setLoading(false);
      });
  };

  const verifyOTP = ()=>{
    try{
      setLoading(true)
      window.confirmationResult.confirm(OTP).then((result) => {
        uploadData();
        swal({
          title: "Successfully Registered !",
          icon: "success",
          button: false,
          timer: 3000,
          timerProgressBar: true,
        });
        navigate('/login')
        setLoading(false);
      })
    }
    catch (error){
      swal({
        title: error.message,
        icon: "error",
        button: false,
        timer: 3000,
        timerProgressBar: true,
      })
      setLoading(false);
    }
  
  }

  const uploadData = async() =>{
    try{
      const salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(form.password, salt);
      await addDoc(userRef,{
        username: form.username,
        password: hash,
        mobile: form.mobile
      })

    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <div className="flex flex-col w-full items-center my-4 p-2">
      <h1 className="text-xl font-bold mb-3">Signup</h1>
      {OTPSent ? (
        <>
          <div className="mb-4 w-full md:w-2/3 lg:w-5/6 flex flex-col items-center">
            <label
              htmlFor="otp"
              className="leading-7 text-lg font-bold text-neutral-300"
            >
              Please enter a code that sent to your moblie
            </label>
            <input
              autoComplete="off"
              type="text"
              value={OTP}
              onChange={(e) => setOTP(e.target.value)}
              className="w-2/6 bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out mb-2 md:w-2/6 lg:w-1/6"
            />
          </div>

          <div className="w-full md:w-2/3 lg:w-1/3 mb-2 flex justify-center">
            <Button variant="contained" className="w-1/3" onClick={verifyOTP}>
              confirm
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="mb-4 w-full md:w-1/3">
            <label
              htmlFor="user-name"
              className="leading-7 text-lg font-bold text-neutral-300"
            >
              Username:
            </label>
            <input
              autoComplete="off"
              type="text"
              id="name"
              name="name"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>

          <div className="mb-4 md:w-1/3 w-full">
            <label
              htmlFor="mobile"
              className="leading-7 text-lg font-bold text-neutral-300"
            >
              Mobile number:
            </label>
            <input
              autoComplete="off"
              type="text"
              id="mobile"
              name="mobile"
              value={form.mobile}
              onChange={(e) => setForm({ ...form, mobile: e.target.value })}
              className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>

          <div className="mb-4 md:w-1/3 w-full">
            <label
              htmlFor="pass"
              className="leading-7 text-lg font-bold text-neutral-300"
            >
              Password :
            </label>
            <input
              autoComplete="off"
              type="password"
              id="pass"
              name="pass"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>

          <div className="w-full md:w-1/3 mb-2">
            <Button variant="contained" className="w-full" onClick={requestOTP}>
              {loading ? (
                <TailSpin color="white" height={30} width={30} />
              ) : (
                "SignUp"
              )}
            </Button>
          </div>
          <span>Or</span>

          <div className="mb-4 w-full md:w-1/3">
            <Button variant="contained" className="w-full">
              <GoogleIcon className="mr-4" />
              signUp with google
            </Button>
          </div>
        </>
      )}

      <div>
        <p>
          Already have an account ? &nbsp;
          <Link to={"/login"}>
            <span className="text-blue-500">Login</span>
          </Link>
        </p>
      </div>
      <div id="sign-in-button"></div>
    </div>
  );
};


export default Signup;
