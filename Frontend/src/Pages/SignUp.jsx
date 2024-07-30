import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const SignUp = () => {
  const navigateTo = useNavigate(); // Initialize useNavigate for navigation

  const [register, setRegister] = useState({
    email: '',
    username: '',
    password: '',
    cpassword: '',
  });

  const registerUser = async (e) => {
    e.preventDefault();

    const userData = {
      email: register.email,
      username: register.username,
      password: register.password,
      Role: 'user', // Default role
      created_at: new Date().toISOString(), // Timestamp of signup
    };

    try {
      const response = await fetch('http://localhost:8000/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error('Failed to register user');
      }
      alert('Registered successfully!');
      // Redirect to home page
      navigateTo('auth/Login');
    } catch (error) {
      console.error('Error registering user:', error.message);
      alert('Failed to register user');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-5 max-w-screen-lg w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="hidden md:block relative">
          <img
            src="https://picsum.photos/800/600?random=8"
            alt="Signup Background"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gray-900 bg-opacity-50"></div>
        </div>
        <div className="p-8 md:p-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>
          <form onSubmit={registerUser} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                required
                value={register.email}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                autoComplete="username"
                required
                value={register.username}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                autoComplete="new-password"
                required
                value={register.password}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="cpassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                id="cpassword"
                name="cpassword"
                autoComplete="new-password"
                required
                value={register.cpassword}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 rounded-md"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Sign Up
            </button>
            <button
              type="button"
              disabled
              className="w-full px-4 py-2 mt-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              Sign Up with Google (Disabled)
            </button>
          </form>
          <div className="mt-4 flex justify-center items-center">
            <span className="mr-2">Already have an account?</span>
            <Link to="/auth/login" className="text-indigo-600 hover:text-indigo-500 font-medium">Login here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
