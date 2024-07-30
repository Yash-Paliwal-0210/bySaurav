import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { FetchAllUsers, UpdateUserRole } from "../Redux/User/UserReducer";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

const UsersAdmin = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigateTo = useNavigate();
  const users = useSelector((state) => state.user.users);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchUsers();
  }, []);

  // const fetchUsers = async () => {
  //   dispatch(FetchAllUsers());
  // };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/users/');
      dispatch(FetchAllUsers(response.data));
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // const handleRoleChange = (uid, role) => {
  //   dispatch(UpdateUserRole({ uid, role }));
  // };

  const handleRoleChange = async (userId, newStatus) => {
    try {
      await axios.put(`http://localhost:8000/api/user/update/${userId}/`, { role: newStatus });
      fetchUsers(); // Refresh orders after updating status
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="flex flex-col md:flex-row w-full">
      <div className="p-4 md:hidden">
        <button
          className="text-white bg-green-600 px-4 py-2 rounded"
          onClick={toggleMenu}
        >
          {menuOpen ? "Close Menu" : "Open Menu"}
        </button>
      </div>

      <div
        className={`${
          menuOpen ? "block" : "hidden"
        } md:block w-full md:w-64 bg-slate-50 border-3 p-4 transition-transform duration-300 ease-in-out`}
      >
        <div onClick={() => navigateTo("/admin/dashboard")}>
          <NavItem icon="fa-qrcode" text="Dashboard" link="/admin/dashboard" />
        </div>
        <NavItem
          icon="fa-cart-shopping"
          text="Products"
          link=""
          subLinks={[
            { text: "All", link: "/admin/product" },
            { text: "New", link: "/admin/product/new" },
            { text: "Banner", link: "/admin/banner" },

          ]}
        />
        <div onClick={() => navigateTo("/admin/orders")}>
          <NavItem icon="fa-cart-shopping" text="Orders" link="/admin/orders" />
        </div>
        <div onClick={() => navigateTo("/admin/users")}>
          <NavItem icon="fa-users" text="Users" link="/admin/users" />
        </div>
      </div>

      <div className="w-full shadow-md sm:rounded-lg">
        <div className="text-4xl text-center py-4 font-semibold">Users</div>
        <div className="w-full overflow-x-auto">
  <table className="w-full text-sm sm:text-base text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs sm:text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-4 py-3 sm:px-6">UserID</th>
        <th scope="col" className="px-4 py-3 sm:px-6">Name</th>
        <th scope="col" className="px-4 py-3 sm:px-6">Email</th>
        <th scope="col" className="px-4 py-3 sm:px-6">Role</th>
        <th scope="col" className="px-4 py-3 sm:px-6">Actions</th>
      </tr>
    </thead>
    <tbody>
      {users.map((user) => (
        <tr key={user._id} className="border-b border-gray-300">
          <td className="px-4 py-3 sm:px-6">{user._id}</td>
          <td className="px-4 py-3 sm:px-6">{user.username}</td>
          <td className="px-4 py-3 sm:px-6">{user.email}</td>
          <td className="px-4 py-3 sm:px-6">{user.role}</td>
          <td className="px-4 py-3 sm:px-6">
            <div className="relative">
              <select
                value={user.role}
                onChange={(e) => handleRoleChange(user._id, e.target.value)}
                className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:ring"
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      </div>
    </div>
    </>
  );
};

export default UsersAdmin;

const NavItem = ({ icon, text, link, subLinks = [] }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSubMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mb-4">
      <div
        className="flex gap-4 items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded cursor-pointer"
        onClick={toggleSubMenu}
      >
        <div className="w-[20px]">
          <i className={`fa-solid ${icon}`}></i>
        </div>
        <div className="font-semibold">{text}</div>
        {subLinks.length > 0 && (
          <i
            className={`fa-solid fa-chevron-down ml-auto transform transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          ></i>
        )}
      </div>
      {isOpen && subLinks.length > 0 && (
        <div className="ml-8 mt-2 space-y-1">
          {subLinks.map((subLink, index) => (
            <div key={index}>
              <Link
                to={subLink.link}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 rounded"
              >
                {subLink.text}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
