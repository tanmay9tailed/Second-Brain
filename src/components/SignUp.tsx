import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {URL} from "../config"

const SignUp = () => {
  const [error,setError] = useState("")
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${URL}/api/v1/signup`, {
        username: formData.username,
        password: formData.password,
      })
      .then((response) => {
        // console.log("SignUp Response:", response.data);
        if(response.data.errorResponse.errmsg){
          setError(response.data.errorResponse.errmsg);
        }else{
          navigate("/signin");
        }
      })
      .catch((error) => {
        console.error(
          "Error in SignUp:",
          error.response ? error.response.data : error.message
        );
      });
  };
  

  return (
    <div className="h-screen w-full flex justify-center items-center bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md w-80" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4 text-center">Sign Up</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 text-sm font-medium mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Sign Up
        </button>
        <p className="text-sm text-center mt-4">
          Already have and account{" "}
          <a href="/signin" className="text-blue-500 hover:underline">
            Sign In
          </a>
        </p>
        <p className="text-red-500">{
            error?error:<></>
          }</p>
      </form>
    </div>
  );
};

export default SignUp;
