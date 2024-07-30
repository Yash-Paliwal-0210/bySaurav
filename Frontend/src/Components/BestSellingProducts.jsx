import { collection, getDocs } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import ReactStars from 'react-stars';
import { db } from '../Firebase/Config';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function BestSellingProducts() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        getProduct();
    }, [])

    const handleAddToCart = (product) => {
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    
        const existingItem = cartItems.find((item) => item.Id === product.Id);
        if (existingItem) {
            existingItem.quantity = existingItem.quantity + 1;
        } else {
            cartItems.push({ ...product, quantity: 1 });
        }
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        toast.success(`${product.Name} Added Successfully`, {
            position: "top-right",
            autoClose: 3000, // Close the toast after 3 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const getProduct = async () => {
        const querySnapshot = await getDocs(collection(db, "Products")); // Assuming you have your query snapshot

        const productsArray = [];
        querySnapshot.forEach((doc) => {
            const productData = doc.data(); // Get the data from the document
            productsArray.push(productData);
        });
        productsArray.sort((a, b) => b.Rating - a.Rating);
        setProducts(productsArray)
    }

     const navigateTo = useNavigate();

    return (
    

        <div>
            <div className='mx-32 py-3 md:text-left sm:text-center text-center '>
                <h1 className='text-2xl font-bold text-red-500'>This Month</h1>
            </div>
            <div className='md:mx-32 mx-0 py-3 md:text-left sm:text-center text-center '>
                <h1 className='text-4xl font-bold color-red-500'>Best Selling Products</h1>
            </div>

            <div className="cards hidden sm:flex-wrap xl:mx-32 py-6  sm:flex-row sm:flex gap-5 md:gap-10 justify-center mx-0 sm:mx-0 md:mx-10 lg:mx-10">
                {
                    products.slice(0, 4).map((doc, index) => {
                        return (
                            <div key={index} id={doc} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow  " style={{ width: "280px" }}>
                                <a href="">
                                    <img className="p-3 rounded-t-lg" src={"https://picsum.photos/800/600?random=8"} alt="product image" />
                                </a>
                                <div className="px-5 pb-5">
                                    <div>
                                        <h5 onClick={() => navigateTo(`/Description/${doc.Id}`)}  className="cursor-pointer text-xl font-semibold tracking-tight text-gray-900 ">{doc.Name}</h5>
                                    </div>
                                    <div className="flex items-center mt-2.5 mb-5">
                                        <div className="flex items-center space-x-1 rtl:space-x-reverse">
                                            <ReactStars half={true} edit={false} value={doc.Rating} count={5} size={24} color2={'#ffd700'} />
                                        </div>
                                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded  ms-3">{doc.Rating}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-3xl font-bold text-gray-900 ">${doc.Price}</span>
                                        <button onClick={() => handleAddToCart(doc)} className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  ">Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="cards sm:hidden flex-wrap xl:mx-32 py-6  flex-row flex gap-5 md:gap-10 justify-center mx-0 sm:mx-0 md:mx-10 lg:mx-10">
                {
                    products.slice(0,4).map((doc, index) => {
                        return (
                            <div key={doc.Id} className="flex flex-row xl:hidden  bg-white border border-gray-200 rounded-lg shadow " style={{ width: "420px", height: "auto" }}>
                            <a href="" className="flex-shrink-0">
                                <img className="w-40 h-full object-cover rounded-l-lg" src={"https://picsum.photos/800/600?random=6"} alt="product image" />
                            </a>
                            <div className="flex flex-col justify-between p-4 w-full">
                                <div>
                                    <h5 onClick={() => navigateTo(`/Description/${doc.Id}`)} className="cursor-pointer text-sm sm:text-xl font-semibold tracking-tight text-gray-900 ">{doc.Name}</h5>
                                </div>
                                <div className="flex items-center">
                                    <ReactStars half={true} edit={false} value={doc.Rating} count={5} size={24} color2={'#ffd700'} />
                                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded  ml-3">{doc.Rating}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm  sm:text-3xl font-bold text-gray-900 ">${doc.Price}</span>
                                    <button onClick={() => handleAddToCart(doc)} className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1.5 sm:px-5 sm:py-2.5 text-center ">Add to cart</button>
                                </div>
                            </div>
                        </div>
                            
                            
                            
                        )
                    })
                }
            </div>

            <div className='py-4 flex justify-center mb-10'>
                <div onClick={ () => navigateTo('/product')}><button className='px-14 py-4 text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-center ' >View All</button></div>
            </div>

        </div>
    )
}
