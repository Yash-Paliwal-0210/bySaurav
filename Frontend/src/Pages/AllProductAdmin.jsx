import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchAllProduct } from "../Redux/Products/ProductReducer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const AllProductAdmin = () => {
  const [editingProduct, setEditingProduct] = useState(null);
  const [updateFormData, setUpdateFormData] = useState({
    Id: "",
    Name: "",
    Price: "",
    Stock: "",
    Category: "",
    Description: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const products = useSelector((state) => state.product.products || []);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/get_products/");
      dispatch(FetchAllProduct(response.data));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError(error.message);
      setLoading(false);
      toast.error("Error fetching products");
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:8000/api/delete_product/${productId}/`);
      toast.success("Product deleted successfully");
      fetchProducts();
    } catch (error) {
      toast.error("Error deleting product: " + error.message);
      console.error("Error deleting product:", error);
    }
  };

  const startEditing = (product) => {
    setEditingProduct(product);
    setUpdateFormData({
      Id: product._id,
      Name: product.name,
      Price: product.price,
      Stock: product.stock,
      Category: product.category,
      Description: product.description,
    });
    setShowForm(true);
  };

  const cancelEditing = () => {
    setEditingProduct(null);
    setUpdateFormData({
      Id: "",
      Name: "",
      Price: "",
      Stock: "",
      Category: "",
      Description: "",
    });
    setShowForm(false);
  };

  const handleUpdateChange = (e) => {
    setUpdateFormData({
      ...updateFormData,
      [e.target.name]: e.target.value,
    });
  };

  const submitUpdate = async (e) => {
    e.preventDefault();
    const { Id, Name, Price, Stock, Description, Category } = updateFormData;
    try {
      await axios.put(`http://localhost:8000/api/update_product/${Id}/`, {
        name: Name,
        price: Price,
        stock: Stock,
        category: Category,
        description: Description,
      });
      toast.success("Product updated successfully");
      cancelEditing();
      fetchProducts();
    } catch (error) {
      toast.error("Error updating product: " + error.message);
      console.error("Error updating product:", error);
    }
  };

  const categories = ["all", "Ethnic", "Kurti", "Umbrella", "Nayra", "Pant", "Dupatta"];

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row">
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
          <div onClick={() => navigateTo("/admin/dashboard")}><NavItem icon="fa-qrcode" text="Dashboard" link="/admin/dashboard" /></div>
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
          <div onClick={() => navigateTo("/admin/orders")}><NavItem icon="fa-cart-shopping" text="Orders" link="/admin/orders" /></div>
          <div onClick={() => navigateTo("/admin/users")}><NavItem icon="fa-users" text="Users" link="/admin/users" /></div>
        </div>

        <div className="items-center w-full">
          <div className="flex flex-col justify-center items-center mt-4">
            <h2 className="text-center text-2xl font-bold mb-4">Product Table</h2>
            <div className="w-full overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 sm:p-3 text-left text-xs sm:text-sm">ID</th>
                    <th className="p-2 sm:p-3 text-left text-xs sm:text-sm">Name</th>
                    <th className="p-2 sm:p-3 text-left text-xs sm:text-sm">Price</th>
                    <th className="p-2 sm:p-3 text-left text-xs sm:text-sm">Stock</th>
                    <th className="p-2 sm:p-3 text-left text-xs sm:text-sm">Category</th>
                    <th className="p-2 sm:p-3 text-left text-xs sm:text-sm">Update</th>
                    <th className="p-2 sm:p-3 text-left text-xs sm:text-sm">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id} className="border-b border-gray-300">
                      <td className="p-2 sm:p-3 text-xs sm:text-sm">{product._id}</td>
                      <td className="p-2 sm:p-3 text-xs sm:text-sm">{product.name.substring(0, 30)}</td>
                      <td className="p-2 sm:p-3 text-xs sm:text-sm">{product.price}</td>
                      <td className="p-2 sm:p-3 text-xs sm:text-sm">{product.stock}</td>
                      <td className="p-2 sm:p-3 text-xs sm:text-sm">{product.category}</td>
                      <td className="p-2 sm:p-3 text-xs sm:text-sm">
                        <button
                          onClick={() => startEditing(product)}
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 sm:py-2 px-2 sm:px-4 rounded text-xs sm:text-sm"
                        >
                          Update
                        </button>
                      </td>
                      <td className="p-2 sm:p-3 text-xs sm:text-sm">
                        <button
                          onClick={() => deleteProduct(product._id)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 sm:py-2 px-2 sm:px-4 rounded text-xs sm:text-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {editingProduct && showForm && (
              <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                  <h3 className="text-lg font-bold mb-4">Edit Product</h3>
                  <form onSubmit={submitUpdate}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">Name:</label>
                      <input
                        type="text"
                        name="Name"
                        value={updateFormData.Name}
                        onChange={handleUpdateChange}
                        required
                        className="block w-full border-gray-300 rounded-md p-2 mt-1"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">Price:</label>
                      <input
                        type="number"
                        name="Price"
                        value={updateFormData.Price}
                        onChange={handleUpdateChange}
                        required
                        className="block w-full border-gray-300 rounded-md p-2 mt-1"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">Stock:</label>
                      <input
                        type="number"
                        name="Stock"
                        value={updateFormData.Stock}
                        onChange={handleUpdateChange}
                        required
                        className="block w-full border-gray-300 rounded-md p-2 mt-1"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">Category:</label>
                      <select
                        name="Category"
                        value={updateFormData.Category}
                        onChange={handleUpdateChange}
                        required
                        className="block w-full border-gray-300 rounded-md p-2 mt-1"
                      >
                        <option value="">Select Category</option>
                        {categories.map((category, index) => (
                          <option key={index} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">Description:</label>
                      <textarea
                        name="Description"
                        value={updateFormData.Description}
                        onChange={handleUpdateChange}
                        required
                        className="block w-full border-gray-300 rounded-md p-2 mt-1"
                      ></textarea>
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={cancelEditing}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Update
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default AllProductAdmin;

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
