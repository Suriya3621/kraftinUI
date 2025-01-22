import React, { useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router";
const Login = ({
  registerUrl,
  apiUrl,
  ForgotPasswordUrl,
  Response,
  onLogin,
  navigateUrl
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [, setCookie] = useCookies(["userId"]);
  let navigate = useNavigate();
  const handleLogin = async () => {
    setError(null);
    if (apiUrl) {
      try {
        const response = await axios.post(`${apiUrl}`, {
          email,
          password
        });
        if (Response) Response(response.data);
        if (response.data.success) {
          setCookie("userId", response.data.user.id || response.data.user.id, {
            path: "/",
            maxAge: 86400
          });
          navigate(navigateUrl || "/home");
        }
      } catch (err) {
        console.error("Login Failed:", err.response?.data || err.message);
        setError(err.response?.data?.message || "Login failed. Please try again.");
      }
    } else if (onLogin) {
      onLogin({
        email,
        password
      });
    }
  };
  const handleForgotPassword = async () => {
    if (!email) {
      return alert("Please Enter Email");
    }
    try {
      await axios.post(`${ForgotPasswordUrl}`, {
        email
      });
    } catch (error) {
      console.error(error);
    }
  };
  const handleRegister = () => {
    navigate(registerUrl || "/register");
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white/10 backdrop-blur-md shadow-2xl rounded-2xl p-10 w-full max-w-md transform transition-all hover:scale-105 duration-300 border border-white/20"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-4xl font-extrabold text-center mb-8 text-white drop-shadow-md"
  }, "Welcome Back!"), error && /*#__PURE__*/React.createElement("p", {
    className: "text-center text-red-300 text-sm mb-4 bg-red-600/20 p-2 rounded-lg shadow-sm"
  }, error), /*#__PURE__*/React.createElement("label", {
    htmlFor: "email",
    className: "block text-sm font-medium text-white/80 mb-2"
  }, "Email"), /*#__PURE__*/React.createElement("input", {
    id: "email",
    type: "email",
    value: email,
    onChange: e => setEmail(e.target.value),
    placeholder: "Enter your email",
    className: "w-full px-4 py-3 mb-5 rounded-lg text-white bg-white/10 placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent shadow-lg transition duration-300"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "password",
    className: "block text-sm font-medium text-white/80 mb-2"
  }, "Password"), /*#__PURE__*/React.createElement("input", {
    id: "password",
    type: "password",
    value: password,
    onChange: e => setPassword(e.target.value),
    placeholder: "Enter your password",
    className: "w-full px-4 py-3 mb-6 rounded-lg text-white bg-white/10 placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent shadow-lg transition duration-300"
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center mb-6"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-sm text-purple-300 hover:text-purple-500 cursor-pointer transition duration-200",
    onClick: handleForgotPassword
  }, "Forgot password?")), /*#__PURE__*/React.createElement("button", {
    onClick: handleLogin,
    className: "w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg shadow-xl transition-all duration-300 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-pink-300"
  }, "Login"), /*#__PURE__*/React.createElement("div", {
    className: "text-center mt-6 text-white/80"
  }, "Don\u2019t have an account?", " ", /*#__PURE__*/React.createElement("span", {
    className: "text-purple-300 hover:text-purple-500 cursor-pointer font-medium transition duration-200",
    onClick: handleRegister
  }, "Sign Up"))));
};
export default Login;