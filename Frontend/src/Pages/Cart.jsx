import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiMinusCircle, FiPlusCircle, FiTrash2 } from 'react-icons/fi'; // Importing icons for buttons
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../Components/Navbar';

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(cart);
  }, []);

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find((item) => item.Id === product.Id);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.Id === product.Id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    toast.success('Added to cart');
  };

  const handleRemoveFromCart = (productId) => {
    const updatedCartItems = cartItems.filter((item) => item.Id !== productId);
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    toast.error('Removed from cart');
  };

  const handleChangeQuantity = (productId, quantity) => {
    const updatedCartItems = cartItems.map((item) =>
      item.Id === productId ? { ...item, quantity } : item
    );
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + Number(item.Price) * item.quantity, 0);
  };

  return (

    <>
    <Navbar/>
    <div className="container mx-auto px-4 py-16">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="text-3xl font-extrabold mb-8 text-center">Your Shopping Cart</h2>
      {(!cartItems || cartItems.length === 0) ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {cartItems.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img src="https://via.placeholder.com/150" alt={item.Name} className="w-24 h-24 rounded object-cover" />
                  <div>
                    <Link to={`/product/${item.Id}`} className="lg:text-lg md:text-md text-xsm font-medium text-gray-800 hover:text-blue-500">
                      {item.Name}
                    </Link>
                    <p className="text-gray-500">${Number(item.Price).toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleChangeQuantity(item.Id, item.quantity - 1)}
                    className="text-gray-500 hover:text-red-500 focus:outline-none"
                    disabled={item.quantity <= 1}
                  >
                    <FiMinusCircle size={20} />
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleChangeQuantity(item.Id, item.quantity + 1)}
                    className="text-gray-500 hover:text-green-500 focus:outline-none"
                  >
                    <FiPlusCircle size={20} />
                  </button>
                  <button
                    onClick={() => handleRemoveFromCart(item.Id)}
                    className="text-red-600 hover:text-red-800 focus:outline-none"
                  >
                    <FiTrash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {cartItems && cartItems.length > 0 && (
        <div className="mt-8 flex items-center justify-between bg-white p-6 rounded-lg shadow-lg">
          <p className="text-xl font-bold text-gray-800">Total: ${calculateTotalPrice().toFixed(2)}</p>
          <Link
            to="/Checkout"
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Proceed to Checkout
          </Link>
        </div>
      )}
    </div>
    </>
  );
}

export default Cart;
