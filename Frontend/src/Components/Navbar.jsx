import React, { useState } from 'react';
// import cart from "../Assets/Icons/shopping-cart.png";
// import heart from "../Assets/Icons/heart.png";
import { removeActiveUser } from '../Redux/User/UserReducer';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from '../Firebase/Config';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [link, setLink] = useState('');
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const role = useSelector(state => state.user.role);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
``
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logout Successfully");
        dispatch(removeActiveUser());
      })
      .catch((error) => {
        console.log(error);
        toast.error("Logout UnSuccessfully");
      });
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
      <ToastContainer />
      <nav className="bg-white w-full z-20 top-0 start-0 border-b-2 shadow-md ">
        <div className="xl:px-10 flex flex-wrap items-center justify-between  p-4">
          <div className="flex items-center space-x-4 rtl:space-x-reverse cursor-pointer">
          <div className="flex items-center space-x-4 rtl:space-x-reverse cursor-pointer">
            <span onClick={() => navigateTo('/')}  className="self-center text-3xl font-semibold whitespace-nowrap mr-7">BR Collection</span>
            <span className="self-center text-lg font-normal whitespace-nowrap text-green-600 hover:text-green-800 lg:block hidden" onClick={() => navigateTo('/')}>Home</span>
            <span className="self-center text-lg font-normal whitespace-nowrap text-green-600 hover:text-green-800 lg:block hidden " onClick={() => navigateTo('/product')}>Products</span>
            <span className="self-center text-lg font-normal whitespace-nowrap text-green-600  hover:text-green-800 lg:block hidden" onClick={() => navigateTo('/contact')}>Contact</span>
            <span className="self-center text-lg font-normal whitespace-nowrap text-green-600  hover:text-green-800 lg:block hidden" onClick={() => navigateTo('/about')}>About</span>
            
            {isLoggedIn && (
                <>
                <span className="self-center text-lg font-normal whitespace-nowrap text-green-600  hover:text-green-800 lg:block hidden" onClick={() => navigateTo('/cart')}>Cart</span>
                </>
              )}
          </div>
          </div>

          
         
            <div className="hidden lg:flex items-center space-x-3">
              {/* <div href="#"><img src={heart} alt="Liked" style={{ height: "30px", width: "30px", padding: "2px" }} /></div> */}
              {/* <div href="/cart"><img src={cart} alt="Cart" style={{ height: "30px", width: "30px", padding: "2px" }} /></div> */}
              <form className="hidden sm:flex  items-center  ">
              <label htmlFor="simple-search" className="sr-only">Search</label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2" />
                  </svg>
                </div>
                <input onChange={(e) => setLink(e.target.value)} value={link} type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5" placeholder="What are you looking for?" required />
              </div>
              <button type="submit" onClick={() => link && navigateTo(`/product?q=${link}`)} className="p-2.5 ms-2 mr-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              <span className="sr-only">Search</span>
              </button>
            </form>
              {!isLoggedIn && (
                <>
                
                  <div onClick={() => navigateTo('/auth/Login')} className="cursor-pointer bg-green-600 text-white px-2 rounded-lg py-2 font-semibold">Login</div>
                  <div onClick={() => navigateTo('/auth/SignUp')} className="cursor-pointer bg-green-600 text-white px-2 rounded-lg py-2 font-semibold">Sign Up</div>
                  {/* <div   onClick={() => navigateTo('/auth/Login')} className="bg-green-600 text-white px-2 rounded-lg py-2 font-semibold">Login</div>
                  <div   onClick={() => navigateTo('/auth/SignUp')} className="bg-green-600 text-white px-2 rounded-lg py-2 font-semibold">Sign Up</div> */}
                </>
              )}
              {isLoggedIn && (
                <div className="relative">
                  {/* <button onClick={toggleDropdown} className="bg-green-600 text-white px-2 rounded-full h-10 w-10 flex items-center justify-center font-semibold"> */}
                <button onClick={toggleDropdown} className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700">

                    <span className="sr-only">User Menu</span>
                    <div className="bg-blue-300 rounded-full h-8 w-8 flex items-center justify-center">
                      {/* Placeholder for user profile picture or initials */}
                      <span className="text-green-600">U</span>
                    </div>
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg py-2 z-10">
                      <div onClick={() => navigateTo('/profile')} className="cursor-default block px-4 py-2 text-gray-700 hover:bg-gray-100">Profile</div>
                      <div onClick={() => navigateTo('/order/me')} className="cursor-default block px-4 py-2 text-gray-700 hover:bg-gray-100">My Orders</div>
                    {/* <a href="/liked" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Liked</a> */}
                      {/* <div   onClick={() => navigateTo('/profile')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Profile</div> */}
                      {/* <div href="/order/me" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">My Orders</div> */}
                    {/* <div href="/liked" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Liked</div> */}
                      {role === "admin" && (
                        <div onClick={() => navigateTo('/admin/dashboard')} className="cursor-default block px-4 py-2 text-gray-700 hover:bg-gray-100">Dashboard</div>
                      )}
                        <div  onClick={() => navigateTo('/cart')} className="cursor-default block px-4 py-2 text-gray-700 hover:bg-gray-100">Cart</div>
                        {/* <div   onClick={() => navigateTo('/cart')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Cart</div> */}

                      <div onClick={handleLogout} className="cursor-default block px-4 py-2 text-gray-700 hover:bg-gray-100">Logout</div>
                      {/* <div   onClick={handleLogout} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Logout</div> */}
                    </div>
                  )}
                </div>
              )}
            </div>
          {/* </div> */}
          <div className="lg:hidden">
            {isLoggedIn ? (
              <div className="relative">
                <button onClick={toggleDropdown} className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700">
                  <span className="sr-only">User Menu</span>
                  <div className="bg-blue-300 rounded-full h-8 w-8 flex items-center justify-center">
                    {/* Placeholder for user profile picture or initials */}
                    <span className="text-green-600">U</span>
                  </div>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg py-2 z-10">
                    <div onClick={() => navigateTo('/profile')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Profile</div>
                    <div onClick={ () => navigateTo('/order/mee')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">My Orders</div>
                    {/* <div   onClick={() => navigateTo('/profile')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Profile</div>
                    <div onClick={() => navigateTo('/order/mee')}  className="block px-4 py-2 text-gray-700 hover:bg-gray-100">My Orders</div> */}

                    {/* <div href="/liked" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Liked</div>  */}
                    {role === "admin" && (
                      <div onClick={() => navigateTo('/admin/dashboard')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Dashboard</div>
                    )}
                    <div onClick={() => navigateTo('/cart')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Cart</div>
                    <div onClick={handleLogout} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Logout</div>
                    {/* <div   onClick={() => navigateTo('/cart')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Cart</div>
                    <div   onClick={handleLogout} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Logout</div> */}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-3">
                <div onClick={ ()=> navigateTo('/auth/Login')} className="cursor-pointer bg-green-600 text-white px-2 rounded-lg py-2 font-semibold">Login</div>
                <div onClick={ ()=> navigateTo('/auth/SignUp')}  className="cursor-pointer bg-green-600 text-white px-2 rounded-lg py-2 font-semibold">Sign Up</div>
                {/* <div href="/auth/Login" className="bg-green-600 text-white px-2 rounded-lg py-2 font-semibold">Login</div>
                <div href="/auth/SignUp" className="bg-green-600 text-white px-2 rounded-lg py-2 font-semibold">Sign Up</div> */}
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
