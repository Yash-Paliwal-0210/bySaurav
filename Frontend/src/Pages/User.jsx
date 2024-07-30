import { doc, getDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../Firebase/Config';
import Navbar from '../Components/Navbar';
import { useNavigate } from 'react-router-dom';

const User = () => {
  const [user, setUser] = useState(null);
  const userDetail = useSelector(state => state.user);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (userDetail && userDetail.userId) {
      fetchUserData();
    }
  }, [userDetail]);

  const fetchUserData = async () => {
    try {
      const docRef = doc(db, "Users", userDetail.userId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const userData = docSnap.data();
        setUser({
          email: userData.email,
          userName: userData.username,
          joinedAt: userData.createdAt,
        });
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching document: ", error);
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader">
          <div className="loader-square"></div>
          <div className="loader-square"></div>
          <div className="loader-square"></div>
          <div className="loader-square"></div>
          <div className="loader-square"></div>
          <div className="loader-square"></div>
          <div className="loader-square"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg transform transition-transform duration-300 max-w-4xl w-full mx-4">
          <div className="md:w-1/2 p-6 flex items-center justify-center">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Profile"
              className="rounded-full w-48 h-48 shadow-lg object-cover"
            />
          </div>
          <div className="md:w-1/2 p-8 text-center flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-6 text-center">User Details</h2>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Email:</label>
              <p className="text-gray-900">{user.email}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Username:</label>
              <p className="text-gray-900">{user.userName ? user.userName : user.email}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Joined At:</label>
              <p className="text-gray-900">{user.joinedAt}</p>
            </div>
            <div className="flex justify-center mt-8 space-x-4">
              <button
                onClick={() => navigateTo('/order/me')}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                My Orders
              </button>
              <button
                onClick={() => navigateTo('/auth/Reset')}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Reset Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
