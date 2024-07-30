// import React, { useEffect } from "react";
// import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { onAuthStateChanged } from "firebase/auth";
// import { doc, getDoc } from "firebase/firestore";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { auth, db } from "./Firebase/Config";
// import { setActiveUser } from "./Redux/User/UserReducer";
// import './App.css';
// import Home from './Pages/Home';
// import Layout from './Pages/Layout';
// import SignUp from './Pages/SignUp';
// import Login from "./Pages/Login";
// import Resetpassword from "./Pages/Resetpassword";
// import AddProductForm from "./Pages/AddProduct";
// import Products from "./Pages/Products";
// import Cart from "./Pages/Cart";
// import User from "./Pages/User";
// import Description from "./Pages/Description";
// import DashboardAdmin from "./Pages/DashboardAdmin";
// import Checkout from "./Pages/Checkout";
// // import ProductListAdmin from "./Pages/ProductListAdmin";
// import OrdersAdmin from "./Pages/OrdersAdmin";
// import UsersAdmin from "./Pages/UsersAdmin";
// import ReviewAdmin from "./Pages/ReviewAdmin";
// import Payment from "./Pages/Payment";
// import AllProductAdmin from "./Pages/AllProductAdmin";
// import OrderSummary from "./Pages/OrderSummary";
// import UpdateProfleAdmin from "./Pages/UpdateProfleAdmin";
// import MyOrders from "./Pages/MyOrders";
// import OrderDetails from "./Pages/OrderDetails";
// import About from "./Pages/About";
// import Contact from "./Pages/Contact";
// import BannerAdmin from "./Pages/BannerAdmin";

// function App() {
//   // console.log("app")
//   const dispatch = useDispatch();
//   useEffect(() => {
//     // console.log(dispatch);
//     onAuthStateChanged(auth, async(user) => {
//       if (user) {
//         const uid = user.uid;
//         const querySnapshot = await getDoc(doc(db, "Users", uid));
//         const query = querySnapshot.data();
//         console.log(query);
//         dispatch(setActiveUser({
//           email: user.email,
//           userName: user.displayName,
//           userId: user.uid,
//           createdAt: query?.createdAt,
//           wishList: query.wishList,
//           role: query.role,
//         }))
//       } else {
//         console.log("logged out");
//       }
//       console.log(new Date()*1000)
//     });
//   }, [dispatch]);

//   return (
//     <>
//       <Router>
//         <Routes>
//           <Route exact path='/' element={<Layout />}>
//             <Route exact path='/' element={<Home />} />
//             <Route exact path='/auth/SignUp' element={<SignUp />} />
//             <Route exact path='/auth/Login' element={<Login />} />
//             <Route exact path='/auth/Reset' element={<Resetpassword />} />
//             <Route exact path='/admin/product/new' element={<AddProductForm />} />
//             <Route exact path='/admin/product' element={<AllProductAdmin />} />
//             <Route exact path='/product' element={<Products />} />
//             <Route exact path='/cart' element={<Cart />} />
//             <Route exact path='profile' element={<User />} />
//             <Route exact path='/description/:id' element={<Description />} />
//             <Route exact path='/admin/dashboard' element={<DashboardAdmin />} />
//             <Route exact path='/checkout' element={<Checkout />} />
//             {/* <Route path='/admin/allproducts' element={<ProductListAdmin />} /> */}
//             <Route exact path='/admin/orders' element={<OrdersAdmin />} />
//             <Route exact path='/admin/users' element={<UsersAdmin />} />
//             <Route exact path='/admin/review' element={<ReviewAdmin />} />
//             <Route exact path='/payment' element={<Payment />} />
//             <Route exact path='/ordersummary' element={<OrderSummary />} />
//             <Route exact path='/updateProfileAdmin' element={<UpdateProfleAdmin />} />
//             <Route exact path='/order/:id' element={<MyOrders />} />
//             <Route exact path='/order/mee' element={<OrderDetails/>}/>
//             <Route exact path='/about' element={<About/>}/>
//             <Route exact path='/contact' element={<Contact />}/>
//             <Route exact path='/admin/banner' element={<BannerAdmin />}/>
//           </Route>
//         </Routes>
//       </Router>
//       <ToastContainer />
//     </>
//   );
// }

// export default App;


import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveUser } from './Redux/User/UserReducer';
import { getToken } from './utils/authService'; // Import the getToken function
// import React, { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { onAuthStateChanged } from "firebase/auth";
// import { doc, getDoc } from "firebase/firestore";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { auth, db } from "./Firebase/Config";
// import { setActiveUser } from "./Redux/User/UserReducer";
import './App.css';
import Home from './Pages/Home';
import Layout from './Pages/Layout';
import SignUp from './Pages/SignUp';
import Login from "./Pages/Login";
import Resetpassword from "./Pages/Resetpassword";
import AddProductForm from "./Pages/AddProduct";
import Products from "./Pages/Products";
import Cart from "./Pages/Cart";
import User from "./Pages/User";
import Description from "./Pages/Description";
import DashboardAdmin from "./Pages/DashboardAdmin";
import Checkout from "./Pages/Checkout";
// import ProductListAdmin from "./Pages/ProductListAdmin";
import OrdersAdmin from "./Pages/OrdersAdmin";
import UsersAdmin from "./Pages/UsersAdmin";
import ReviewAdmin from "./Pages/ReviewAdmin";
import Payment from "./Pages/Payment";
import AllProductAdmin from "./Pages/AllProductAdmin";
import OrderSummary from "./Pages/OrderSummary";
import UpdateProfleAdmin from "./Pages/UpdateProfleAdmin";
import MyOrders from "./Pages/MyOrders";
import OrderDetails from "./Pages/OrderDetails";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import BannerAdmin from "./Pages/BannerAdmin";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getToken();

    if (token) {
      // Fetch user data from API or decode the token
      fetch('http://localhost:8000/api/me/', {
        headers: { 'Authorization': `Bearer ${token}` },
      })
        .then(response => response.json())
        .then(data => {
          dispatch(setActiveUser(data));
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
          // Handle token expiration or removal
        });
    }
  }, [dispatch]);

  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<Layout />}>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/auth/SignUp' element={<SignUp />} />
            <Route exact path='/auth/Login' element={<Login />} />
            <Route exact path='/auth/Reset' element={<Resetpassword />} />
            <Route exact path='/admin/product/new' element={<AddProductForm />} />
            <Route exact path='/admin/product' element={<AllProductAdmin />} />
            <Route exact path='/product' element={<Products />} />
            <Route exact path='/cart' element={<Cart />} />
            <Route exact path='/profile' element={<User />} />
            <Route exact path='/description/:id' element={<Description />} />
            <Route exact path='/admin/dashboard' element={<DashboardAdmin />} />
            <Route exact path='/checkout' element={<Checkout />} />
            {/* <Route path='/admin/allproducts' element={<ProductListAdmin />} /> */}
            <Route exact path='/admin/orders' element={<OrdersAdmin />} />
            <Route exact path='/admin/users' element={<UsersAdmin />} />
            <Route exact path='/admin/review' element={<ReviewAdmin />} />
            <Route exact path='/payment' element={<Payment />} />
            <Route exact path='/ordersummary' element={<OrderSummary />} />
            <Route exact path='/updateProfileAdmin' element={<UpdateProfleAdmin />} />
            <Route exact path='/order' element={<MyOrders />} />
            <Route exact path='/order/mee' element={<OrderDetails/>}/>
            <Route exact path='/about' element={<About/>}/>
            <Route exact path='/contact' element={<Contact />}/>
            <Route exact path='/admin/banner' element={<BannerAdmin />}/>
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;

