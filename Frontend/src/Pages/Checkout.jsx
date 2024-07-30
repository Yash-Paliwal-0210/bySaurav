import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'; // Import axios for HTTP requests
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    // State variables for managing input values
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [cart, setCart] = useState('');

    const navigateTo = useNavigate();

    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem("cartItems")));    
        fetchCsrfToken(); // Fetch CSRF token on component mount
    }, [])

    const [csrfToken, setCsrfToken] = useState('');

    const fetchCsrfToken = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/csrf/', { withCredentials: true });
            setCsrfToken(response.data.csrfToken);
        } catch (error) {
            console.error('Error fetching CSRF token:', error);
        }
    };

    const handlePlaceOrder = async () => {
        if (!firstName || !lastName || !address || !city || !state || !zip ) {
            toast.error('Please fill out all fields.');
            return;
        }

        const price = cart.reduce((total, item) => total + item.Price * item.quantity, 0);
        const productIdQuantityArray = cart.map(item => ({ Id: item.Id, quantity: item.quantity }));
        const orderData = {
            firstName,
            lastName,
            address,
            city,
            state,
            zip,
            price,
            productIdQuantityArray,
            paymentStatus: 'not paid', // Default payment status
        };

        try {
            const response = await axios.post('http://localhost:8000/api/place_order/', orderData, {
                headers: {
                    'X-CSRFToken': csrfToken, // Include CSRF token in headers
                },
                withCredentials: true, // Ensure credentials are sent with the request
            });

            console.log(response.data);
            setFirstName('');
            setLastName('');
            setAddress('');
            setCity('');
            setState('');
            setZip('');

            toast.success('Order placed successfully!');
            navigateTo(`/payment?q=${response.data.orderId}`);
            
        } catch (error) {
            console.error('Error placing order:', error);
            toast.error('An error occurred while placing the order.');
        }
    };

    return (
        <div>
            <ToastContainer/>
            <div className="bg-gray-100 dark:bg-gray-900">
                <div className="w-full max-w-3xl mx-auto p-8 h-[100vh]">
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border dark:border-gray-700">
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center">Checkout</h1>

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-2">Shipping Address</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="first_name" className="block text-gray-700 dark:text-white mb-1">First Name</label>
                                    <input
                                        type="text"
                                        id="first_name"
                                        className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="last_name" className="block text-gray-700 dark:text-white mb-1">Last Name</label>
                                    <input
                                        type="text"
                                        id="last_name"
                                        className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="mt-4">
                                <label htmlFor="address" className="block text-gray-700 dark:text-white mb-1">Address</label>
                                <input
                                    type="text"
                                    id="address"
                                    className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>

                            <div className="mt-4">
                                <label htmlFor="city" className="block text-gray-700 dark:text-white mb-1">City</label>
                                <input
                                    type="text"
                                    id="city"
                                    className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <div>
                                    <label htmlFor="state" className="block text-gray-700 dark:text-white mb-1">State</label>
                                    <input
                                        type="text"
                                        id="state"
                                        className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                                        value={state}
                                        onChange={(e) => setState(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="zip" className="block text-gray-700 dark:text-white mb-1">ZIP Code</label>
                                    <input
                                        type="text"
                                        id="zip"
                                        className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                                        value={zip}
                                        onChange={(e) => setZip(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end">
                            <button onClick={handlePlaceOrder} className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-700 dark:bg-teal-600 dark:text-white dark:hover:bg-teal-900">Place Order</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
