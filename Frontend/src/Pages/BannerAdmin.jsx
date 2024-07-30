import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { toast } from 'react-toastify';
import { v4 } from 'uuid';
import { storage } from '../Firebase/Config';
import banner from '../Assets/images/add1.jpeg'
import dltBtn from '../Assets/dltBtn.jpg'

const BannerAdmin = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigateTo = useNavigate();
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrl, setImageUrl] = useState(''); // Add imageUrl state

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const uploadImage = async (event) => {
    event.preventDefault();
    if (imageUpload == null) {
      toast.error("No image selected. Please choose an image to upload.");
      return;
    }
    const imageRef = ref(storage, `images/banners/${imageUpload.name + v4()}`);
    try {
      await uploadBytes(imageRef, imageUpload);
      const downloadURL = await getDownloadURL(imageRef);
      setImageUrl(downloadURL);
      toast.success("Image Uploaded Successfully");
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error("Image upload failed. Please try again.");
    }
  };

  function deleteImgHanlder(index){

  }

  return (
    <>
      <Navbar />
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

        <div className="w-full pt-3 p-4">
          <div className="text-center text-2xl font-extrabold mb-4">Banner Images</div>
          <input type="file"  className="border p-2 mb-4 md:mb-0 md:mr-4 w-full md:w-auto"
          style={{marginBottom: '1rem'}} />
          <button className='inline-flex items-center bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>
                      <svg class="h-8 w-8 "  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  
            <circle cx="12" cy="12" r="10" />  <polyline points="16 12 12 8 8 12" />  <line x1="12" y1="16" x2="12" y2="8" /></svg>
          <span>Upload </span>
            </button>
          <div className='flex flex-wrap gap-1'>
          {[...Array(5)].map((_, index) => (
            <div className='flex flex-col gap-2'>
            {/* <div key={index} className=" border-b-4 pb-2  md:flex-row items-center justify-between mt-4 space-y-4 md:space-y-0"> */}
              <img src={banner} alt={`Image ${index + 1}`} style={{height:'20rem', width:'25rem'}}/>
              <img src={dltBtn} alt={`Image ${index + 1}`} onClick={()=>deleteImgHanlder(index)}
              className='rounded' style={{height:'2rem', width:'5rem',marginLeft:'auto'}}
              />
             {/* <input type="file" onChange={(e) => setImageUpload(e.target.files[0])} className="border p-2 mb-4 md:mb-0 md:mr-4 w-full md:w-auto" /> */}
              {/* <div className="flex space-x-2"> */}
               {/* <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 active:bg-blue-700 transition duration-150">Delete</button> */}
               {/*  <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 active:bg-green-700 transition duration-150" onClick={uploadImage}>Upload</button> */}
             {/*  </div> */}
             {/* </div> */}
            </div>
          ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BannerAdmin;

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
