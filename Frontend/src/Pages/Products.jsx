import { collection, getDocs } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { db } from '../Firebase/Config';
import ReactStars from 'react-stars';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Navbar from '../Components/Navbar';

const Products = () => {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [products, setProducts] = useState([]);
    const [buffer, setBuffer] = useState([]);
    const [costRange, setCostRange] = useState(10000);
    const [starRange, setStarRange] = useState(0);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const [showFilters, setShowFilters] = useState(false); // State to manage showing/hiding filters
    const navigateTo = useNavigate();


    console.log("products")

    useEffect(() => {
        getProduct();
    }, []);

    const handleSearchChange = (event) => {
        const query = event.target.value;
        const filteredProducts = buffer.filter((product) => {
            const matchesQuery = query === null || query.trim() === "" || product.Name.toLowerCase().includes(query.toLowerCase());
            return matchesQuery;
        });
        setProducts(filteredProducts);
        setSearchTerm(event.target.value);
    };

    const getProduct = async () => {
        const querySnapshot = await getDocs(collection(db, "Products"));
        const productsArray = [];
        querySnapshot.forEach((doc) => {
            const productData = doc.data();
            productsArray.push(productData);
        });
        setBuffer(productsArray);
        const category = searchParams.get('category');
        const query = searchParams.get('q');
        setSelectedCategory(category);
        const filteredProducts = productsArray.filter((product) => {
            const matchesCategory = category === null || product.Category === category;
            const matchesQuery = query === null || query.trim() === "" || product.Name.toLowerCase().includes(query.toLowerCase());
            return matchesCategory && matchesQuery;
        });
        setProducts(filteredProducts);
        setLoading(false);
        console.log("get product")
    }

    const handleFilterChange = (e) => {
        let filteredProducts = buffer;
        if (e.target.id === "filter-category") {
            setSelectedCategory(e.target.value);
            filteredProducts = filteredProducts.filter((product) => {
                if (e.target.value === "all" || e.target.value === null) {
                    return true;
                } else {
                    return product.Category === e.target.value;
                }
            });
        } else {
            filteredProducts = filteredProducts.filter((product) => {
                if (selectedCategory === "all" || selectedCategory === null) {
                    return true;
                } else {
                    return product.Category === selectedCategory;
                }
            });
        }

        if (e.target.id === "price-range-slider") {
            setCostRange(e.target.value);
            filteredProducts = filteredProducts.filter((product) => {
                return parseInt(product.Price) < e.target.value;
            });
        } else {
            filteredProducts = filteredProducts.filter((product) => {
                return parseInt(product.Price) < costRange;
            });
        }

        if (e.target.id === "rating-slider") {
            setStarRange(e.target.value);
            filteredProducts = filteredProducts.filter((product) => {
                return parseInt(product.Rating) >= e.target.value;
            });
        } else {
            filteredProducts = filteredProducts.filter((product) => {
                return parseInt(product.Rating) >= starRange;
            });
        }

        setProducts(filteredProducts);
    }

    // Toggle function to show/hide filters on small screens
    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    return (
        <>
        <Navbar/>
            {loading ? (
                <div className="loader-container flex items-center justify-center h-screen">
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
            ) : (
                <div className=''>
                    
                <div className="container mx-auto px-6 py-6 ">
                    <div className='flex flex-col justify-center items-center'>

                        <h1 className="text-3xl font-extrabold mb-4">Products</h1>

                        {/* Always visible search bar */}
                        <div className="mb-4 flex lg:hidden">
                            <input
                                type="text"
                                id="filter-search"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="px-3 py-2 w-full md:w-auto rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="Search products..."
                            />
                            <button
                                type="button"
                                // onClick={() => link && navigateTo(`/product?q=${link}`)}
                                className="ml-2 px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                            >
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                                <span className="sr-only">Search</span>
                            </button>
                        </div>

                        {/* Filters dropdown */}
                        <div className="mb-4 lg:hidden">
                            <button
                                onClick={toggleFilters}
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Filters
                            </button>
                            {showFilters && (
                                <div className="mt-2 p-2 bg-white border border-gray-200 rounded-lg shadow-lg">
                                    <div className="flex items-center mb-2">
                                        <label htmlFor="filter-category" className="mr-2 text-sm font-medium">Category:</label>
                                        <select
                                            id="filter-category"
                                            className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                            value={selectedCategory}
                                            onChange={handleFilterChange}
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
                                    <div className="flex items-center mb-2">
                                        <label htmlFor="price-range-slider" className="mr-2 text-sm font-medium">Price:</label>
                                        <div id="price-filter" className="flex items-center">
                                            <input
                                                type="range"
                                                id="price-range-slider"
                                                className="flex-grow focus:outline-none focus:ring-1 focus:ring-blue-500 h-2"
                                                value={costRange}
                                                onChange={handleFilterChange}
                                                min="0"
                                                max="10000"
                                            />
                                            <span className="ml-2 text-sm">Price Range: $ {costRange}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center mb-2">
                                        <label htmlFor="rating-slider" className="mr-2 text-sm font-medium">Ratings:</label>
                                        <div id="rating-filter" className="flex items-center">
                                            <input
                                                type="range"
                                                id="rating-slider"
                                                className="flex-grow focus:outline-none focus:ring-1 focus:ring-blue-500 h-2"
                                                value={starRange}
                                                onChange={handleFilterChange}
                                                min="0"
                                                max="5"
                                            />
                                            <span className="ml-2 text-sm">Ratings: {starRange}</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Filters section for medium and larger screens */}
                        <div className="hidden md:hidden mb-4 lg:flex lg:gap-10">
                            <div className="flex items-center mb-2">
                                <label htmlFor="filter-category" className="mr-2 text-sm font-medium">Category:</label>
                                <select
                                    id="filter-category"
                                    className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    value={selectedCategory || ''}
                                    onChange={handleFilterChange}
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
                            <div className="flex items-center mb-2">
                                <label htmlFor="price-range-slider" className="mr-2 text-sm font-medium">Price:</label>
                                <div id="price-filter" className="flex items-center">
                                    <input
                                        type="range"
                                        id="price-range-slider"
                                        className="flex-grow focus:outline-none focus:ring-1 focus:ring-blue-500 h-2"
                                        value={costRange}
                                        onChange={handleFilterChange}
                                        min="0"
                                        max="10000"
                                    />
                                    <span className="ml-2 text-sm">Price Range: $ {costRange}</span>
                                </div>
                            </div>
                            <div className="flex items-center mb-2">
                                <label htmlFor="rating-slider" className="mr-2 text-sm font-medium">Ratings:</label>
                                <div id="rating-filter" className="flex items-center">
                                    <input
                                        type="range"
                                        id="rating-slider"
                                        className="flex-grow focus:outline-none focus:ring-1 focus:ring-blue-500 h-2"
                                        value={starRange}
                                        onChange={handleFilterChange}
                                        min="0"
                                        max="5"
                                    />
                                    <span className="ml-2 text-sm">Ratings: {starRange}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product grid */}
                    <div className="flex flex-wrap justify-center lg:mx-10 gap-4">
                        {products.map((product) => (
                            <Product key={product.id}  doc={product} />
                        ))}
                    </div>
                    <ToastContainer />
                </div>
                </div>
            )}
        </>
    );
};

const Product = ({ doc }) => {
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
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };
    const navigateTo = useNavigate();

    return (
        // <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow">
        //     <img className="w-full h-56 object-cover" src={"https://picsum.photos/300/300"} alt="product" />
        //     <div className="p-4">
        //         <h5 className="text-xl font-semibold text-gray-900 mb-2">{doc.Name}</h5>
        //         <div className="flex items-center mb-2">
        //             <ReactStars half={true} edit={false} value={doc.Rating} count={5} size={24} color2={'#ffd700'} />
        //             <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded ml-2">{doc.Rating}</span>
        //         </div>
        //         <div className="flex justify-between items-center">
        //             <span className="text-2xl font-bold text-gray-900">${doc.Price}</span>
        //             <button
        //                 onClick={() => handleAddToCart(doc)}
        //                 className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        //             >
        //                 Add to Cart
        //             </button>
        //         </div>
        //     </div>
        //     <ToastContainer />
        // </div>
        //      <div id={doc} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" style={{ width: "280px" }}>
        //      <a href="#">
        //          <img className="p-3 rounded-t-lg" src={"https://picsum.photos/800/600?random=8"} alt="product image" />
        //      </a>
        //      <div className="px-5 pb-5">
        //          <a href="#">
        //              <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{doc.Name}</h5>
        //          </a>
        //          <div className="flex items-center mt-2.5 mb-5">
        //              <div className="flex items-center space-x-1 rtl:space-x-reverse">
        //                  <ReactStars half={true} edit={false} value={doc.Rating} count={5} size={24} color2={'#ffd700'} />
        //              </div>
        //              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">{doc.Rating}</span>
        //          </div>
        //          <div className="flex items-center justify-between">
        //              <span className="text-3xl font-bold text-gray-900 dark:text-white">${doc.Price}</span>
        //              <button onClick={() => handleAddToCart(doc)} className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-500 dark:focus:ring-red-600">Add to cart</button>
        //          </div>
        //      </div>
        //  </div>
        <>

            <div key={doc.Id} className="flex flex-row xl:hidden sm:hidden  bg-white border border-gray-200 rounded-lg shadow " style={{ width: "420px", height: "auto" }}>
                <a href="" className="flex-shrink-0">
                    <img className="w-40 h-full object-cover rounded-l-lg" src={doc.ImageUrl} alt="product image" />
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
                <ToastContainer />
            </div>

            <div id={doc} className="w-full max-w-sm hidden sm:block bg-white border border-gray-200 rounded-lg shadow " style={{ width: "280px" }}>
                <a href="">
                    <img className="p-3 rounded-t-lg" src={"https://picsum.photos/800/600?random=3"} alt="product image" />
                </a>
                <div className="px-5 pb-5">
                    <div>
                        <h5 onClick={() => navigateTo(`/Description/${doc.Id}`)} className="cursor-pointer text-xl font-semibold tracking-tight text-gray-900 ">{doc.Name}</h5>
                    </div>
                    <div className="flex items-center mt-2.5 mb-5">
                        <div className="flex items-center space-x-1 rtl:space-x-reverse">
                            <ReactStars half={true} edit={false} value={doc.Rating} count={5} size={24} color2={'#ffd700'} />
                        </div>
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded  ms-3">{doc.Rating}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold text-gray-900 ">${doc.Price}</span>
                        <button onClick={() => handleAddToCart(doc)} className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Add to cart</button>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>


    );
};

export default Products;
