import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setActiveUser } from '../Redux/User/UserReducer'; // Import the action if needed
import { saveToken } from '../utils/authService'; // Import the saveToken function

const Login = () => {
  const [login, setLogin] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      navigateTo('/');
    }
  }, [isLoggedIn, navigateTo]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(login),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Invalid credentials');
      }

      const data = await response.json();
      saveToken(data.token); // Save token using authService
      toast.success('Login Successful');

      dispatch(setActiveUser({ email: data.email, userName: data.userName, userId: data.userId, role: data.role }));

      setLoading(false);
      navigateTo('/');
    } catch (error) {
      toast.error(error.message || 'Login failed');
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    toast.info('Google login is currently disabled');
  };

  return (
    <>
      <ToastContainer />
      <section className='bg-blue-200 dark:bg-gray-900 min-h-screen flex items-center justify-center'>
        <div className='bg-white shadow-md rounded-lg flex flex-col md:flex-row overflow-hidden'>
          <div className='md:w-1/2 hidden md:flex items-center justify-center bg-cover bg-center' style={{ backgroundImage: 'url(https://picsum.photos/800/600?random=7)' }}>
            <div className='text-white text-center'>
              <h2 className='text-3xl font-bold'>Welcome Back!</h2>
              <p className='mt-2'>Sign in to continue to your account.</p>
            </div>
          </div>
          <div className='md:w-1/2 p-8'>
            <h1 className='text-2xl font-bold leading-tight text-gray-900 dark:text-white'>
              Sign in to your account
            </h1>
            <form className='mt-6' onSubmit={handleLogin}>
              <div>
                <label htmlFor='email' className='block text-sm font-medium text-gray-700 dark:text-white'>
                  Your email
                </label>
                <input
                  type='email'
                  name='email'
                  id='email'
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm'
                  placeholder='name@company.com'
                  required
                  value={login.email}
                  onChange={({ target: { value } }) => setLogin(prev => ({ ...prev, email: value }))}
                />
              </div>
              <div className='mt-4'>
                <label htmlFor='password' className='block text-sm font-medium text-gray-700 dark:text-white'>
                  Password
                </label>
                <input
                  type='password'
                  name='password'
                  id='password'
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm'
                  placeholder='••••••••'
                  required
                  value={login.password}
                  onChange={({ target: { value } }) => setLogin(prev => ({ ...prev, password: value }))}
                />
              </div>
              <div className='mt-6'>
                <button
                  type='submit'
                  className='w-full bg-green-700 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'
                  disabled={loading}
                >
                  {loading ? 'Signing in...' : 'Sign in'}
                </button>
              </div>
              <div className='mt-4'>
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Sign in with Google
                </button>
              </div>
              <p className='mt-6 text-center text-sm text-gray-600 dark:text-gray-400'>
                Don’t have an account yet? <Link to='/auth/SignUp' className='font-medium text-primary-600 hover:underline dark:text-primary-500'>Sign up</Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
