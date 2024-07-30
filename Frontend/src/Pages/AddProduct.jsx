import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../Components/Navbar';
import { Link, useNavigate } from 'react-router-dom';

const AddProductForm = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState(0);
  const [csrfToken, setCsrfToken] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageUpload, setImageUpload] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigateTo = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    fetchCsrfToken();
  }, []);

  const fetchCsrfToken = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/csrf/', {
        credentials: 'include',
      });
      const data = await response.json();
      setCsrfToken(data.csrfToken);
    } catch (error) {
      console.error('Error fetching CSRF token:', error);
    }
  };

  const uploadImage = async (event) => {
    event.preventDefault();
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/products/${imageUpload.name + v4()}`);
    try {
      await uploadBytes(imageRef, imageUpload);
      const downloadURL = await getDownloadURL(imageRef);
      setImageUrl(downloadURL);
      toast.success("Image Uploaded Successfully");
    } catch (error) {
      toast.error("Image upload failed. Please try again.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const productData = {
      name,
      price,
      description,
      category,
      stock,
    };

    try {
      const response = await fetch('http://localhost:8000/api/products/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify(productData),
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to add product');
      }
      toast.success('Product added successfully!');
      setName('');
      setPrice(0);
      setDescription('');
      setCategory('');
      setStock(0);
    } catch (error) {
      console.error('Error adding product:', error.message);
      toast.error('Failed to add product');
    }
  };

  return (
    <>
    <Navbar />
    <div className='flex md:flex-row flex-col'>
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
        <div >
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
      <div className='w-full'>
        <div className="flex items-center justify-center min-h-screen ">
          <ToastContainer position="top-right" autoClose={5000} />
          <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg space-y-6">
            <h2 className="text-2xl font-bold text-center">Add New Product</h2>
            <div className="flex flex-col">
              <label htmlFor="name" className="text-sm font-medium">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="price" className="text-sm font-medium">Price:</label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="description" className="text-sm font-medium">Description:</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="category" className="text-sm font-medium">Category:</label>
              <select
                id="category"
                className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="all">All</option>
                <option value="Ethinic">Ethinic Set</option>
                <option value="Tops">Tops</option>
                <option value="Kurti">Kurti Set</option>
                <option value="Ambrella">Ambrella Set</option>
                <option value="Nayra">Nayra Set</option>
                <option value="Pant">Pant</option>
                <option value="Dupatta">Dupatta</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="stock" className="text-sm font-medium">Stock:</label>
              <input
                type="number"
                id="stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
                className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <input
              type="file"
              onChange={(e) => setImageUpload(e.target.files[0])}
              className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={uploadImage}
              className="px-4 py-2 mx-4 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition duration-200"
            >
              Upload Image
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition duration-200"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  </>
  );
};

export default AddProductForm;

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
