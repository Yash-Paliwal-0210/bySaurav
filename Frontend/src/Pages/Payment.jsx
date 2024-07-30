import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const key_id = "rzp_test_JDumAGUYVqtCC3";
  const [searchParams] = useSearchParams();
  const [order, setOrder] = useState(null);
  const userId = useSelector((state) => state.user.userId);
  const navigateTo = useNavigate();
  
  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/order/${searchParams.get("q")}`);
      setOrder(response.data);
    } catch (error) {
      console.error("Error fetching order:", error);
    }
  };

  async function loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => reject(false);
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    try {
      const csrfToken = await getCSRFToken();

      const result = await axios.post(
        "http://localhost:8000/api/create_razorpay_order/",
        {
          amount: parseFloat(order.price) * 100,
          order_id: searchParams.get("q"),
          currency: "INR",
        },
        {
          headers: {
            "X-CSRFToken": csrfToken,
          },
        }
      );

      const { amount, id: order_id, currency } = result.data;

      const options = {
        key: key_id,
        amount: amount.toString(),
        currency: currency,
        name: `${order.firstName} ${order.lastName}`,
        description: "Test Transaction",
        order_id: order_id,
        handler: async function (response) {
          const data = {
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id || " ",
            razorpaySignature: response.razorpay_signature || " ",
          };

          try {
            await axios.put(
              `http://localhost:8000/api/order/update/${searchParams.get("q")}/`,
              {
                paymentDetails: data,
                paymentStatus: "paid",
                deliver_status: "processing",
                userId: userId,
                productIdQuantityArray: order.productIdQuantityArray,
              },
              {
                headers: {
                  "X-CSRFToken": csrfToken,
                },
              }
            );

            localStorage.clear();
            navigateTo('/');
          } catch (error) {
            console.error("Error updating order:", error);
          }
        },
        prefill: {
          name: `${order.firstName} ${order.lastName}`,
          email: order.email,
          contact: order.contact,
        },
        notes: {
          address: order.address,
        },
        theme: {
          color: "#61dafb",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Error creating Razorpay order:", error);
    }
  }

  async function getCSRFToken() {
    try {
      const response = await axios.get("http://localhost:8000/api/csrf/");
      const csrfToken = response.data.csrfToken;
      axios.defaults.headers.common["X-CSRFToken"] = csrfToken;
      return csrfToken;
    } catch (error) {
      console.error("Error fetching CSRF token:", error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment</h2>
        <p className="text-gray-700 mb-4">Complete your payment to proceed with your order.</p>
        <div className="mb-6">
          {order ? (
            <div className="bg-gray-50 p-4 rounded-md shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800">Order Details</h3>
              <p className="text-gray-600 mt-2"><strong>Name:</strong> {order.firstName} {order.lastName}</p>
              <p className="text-gray-600 mt-1"><strong>Email:</strong> {order.email}</p>
              <p className="text-gray-600 mt-1"><strong>Contact:</strong> {order.contact}</p>
              <p className="text-gray-600 mt-1"><strong>Address:</strong> {order.address}</p>
              <p className="text-gray-600 mt-1"><strong>Price:</strong> ₹{order.price}</p>
            </div>
          ) : (
            <p className="text-gray-600">Loading order details...</p>
          )}
        </div>
        <button
          onClick={displayRazorpay}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Pay ₹{order && order.price}
        </button>
      </div>
    </div>
  );
};

export default Payment;
