import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchAllUsers } from "../Redux/User/UserReducer";
import { FetchAllOrders } from "../Redux/Orders/OrderReducer";
import { FetchAllProduct } from "../Redux/Products/ProductReducer";
import { Link, useNavigate } from "react-router-dom";
import { HiTrendingUp, HiTrendingDown } from "react-icons/hi";
import data from "../Assets/data.json";
import { BiMaleFemale } from "react-icons/bi";
import BarCharts from "./Charts/Barcharts";
import { DoughnutChart } from "../Components/Charts";
import Navbar from "../Components/Navbar";

const DashboardAdmin = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigateTo = useNavigate();

  const product = useSelector((state) => state.product);
  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);

  useEffect(() => {
    fetchUser_order();
  }, []);

  const dispatch = useDispatch();

  const fetchUser_order = async () => {
    dispatch(FetchAllUsers());
    dispatch(FetchAllOrders());
    dispatch(FetchAllProduct());
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Calculate total revenue
  const totalRevenue = () => {
    let revenue = 0;
    // Assuming revenue data is available in product or order state
    if (order && order.orders) {
      order.orders.forEach((ord) => {
        revenue += ord.amount; // Assuming amount field exists in order object
      });
    }
    return revenue;
  };

  // Calculate total transactions
  const totalTransactions = () => {
    return order && order.orders ? order.orders.length : 0;
  };

  // Calculate total products
  const totalProducts = () => {
    return product && product.product ? product.product.length : 0;
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
        <div  onClick={()=> navigateTo("/admin/dashboard")}><NavItem icon="fa-qrcode" text="Dashboard" link="/admin/dashboard"  /></div>
        <div>
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
        </div>
        <div onClick={()=> navigateTo("/admin/orders")}><NavItem icon="fa-cart-shopping" text="Orders" link="/admin/orders" /></div>
        <div onClick={()=> navigateTo("/admin/users")}><NavItem icon="fa-users" text="Users" link="/admin/users" /></div>
      </div>

      <div className="w-full p-4">
        <div className="font-semibold text-3xl text-center mb-5">DashBoard</div>
        <div className="bg-green-600 text-2xl sm:text-4xl p-3 flex justify-center mb-4">
          Amount
        </div>

        <div className="flex flex-col sm:flex-row justify-around gap-2 sm:gap-0 flex-wrap">
          <DashboardButton
            text={`Product ${totalProducts()}`}
            onClick={() => navigateTo("/admin/product")}
          />
          <DashboardButton text={`Order ${totalTransactions()}`} />
          <DashboardButton text={`User ${user?.users.length}`} />
        </div>

        <section className="py-10 flex flex-wrap gap-4 mt-4 justify-center items-center">
          <WidgetItem
            percent={40}
            amount={true}
            value={totalRevenue()}
            heading="Revenue"
            color="rgb(0,115,255)"
          />
          <WidgetItem
            percent={-14}
            value={user?.users.length}
            heading="Users"
            color="rgb(0,198,202)"
          />
          <WidgetItem
            percent={80}
            value={totalTransactions()}
            heading="Transactions"
            color="rgb(255,196,0)"
          />
          <WidgetItem
            percent={30}
            value={totalProducts()}
            heading="Products"
            color="rgb(76,0,255)"
          />
        </section>

        <section className="graph-container mt-8 flex flex-col xl:flex-row gap-10">
          <div className="revenue-chart mb-8 w-full xl:w-1/2">
            <h2 className="text-center font-semibold text-2xl">
              Revenue & Transaction
            </h2>
            <BarCharts
              data_2={[300, 144, 433, 655, 237, 755, 190]}
              data_1={[200, 444, 343, 556, 778, 455, 990]}
              title_1="Revenue"
              title_2="Transaction"
              bgColor_1="rgb(0,115,255)"
              bgColor_2="rgba(53,162,235,0.8)"
            />
          </div>

          <div className="gender-chart w-full xl:w-1/2 flex justify-center items-center">
            <div className="w-80 h-80">
              <h2 className="text-center font-bold text-3xl mb-4">
                Gender Ratio
              </h2>
              <DoughnutChart
                labels={["Female", "Male"]}
                data={[12, 19]}
                backgroundColor={["hsl(340,82%,56%)", "rgba(53,162,235,0.8)"]}
                cutout={90}
              />
              <p className="text-center mt-4">
                <BiMaleFemale />
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
    </>
  );
};

export default DashboardAdmin;

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


const DashboardButton = ({ text, onClick }) => (
  <button
    onClick={onClick}
    className="bg-gray-400 text-xl sm:text-4xl py-2 px-6 rounded mb-2 sm:mb-0"
  >
    {text}
  </button>
);

const WidgetItem = ({ heading, value, percent, color, amount = false }) => (
  <article className="widget p-4 border rounded shadow-sm">
    <div className="widget-info flex justify-between items-center">
      <div>
        <p className="text-lg">{heading}</p>
        <h4 className="text-2xl font-bold">{amount ? `$${value}` : value}</h4>
        {percent > 0 ? (
          <span className="green flex items-center text-green-600">
            <HiTrendingUp /> +{percent}%
          </span>
        ) : (
          <span className="red flex items-center text-red-600">
            <HiTrendingDown /> {percent}%
          </span>
        )}
      </div>
      <div
        className="widget-circle w-16 h-16 rounded-full flex items-center justify-center text-white"
        style={{
          background: `conic-gradient(
            ${color} ${(Math.abs(percent) / 100) * 360}deg,
            rgb(255, 255, 255) 0
          )`,
        }}
      >
        <span
          className="text-lg font-bold"
          style={{
            color,
          }}
        >
          {percent}%
        </span>
      </div>
    </div>
  </article>
);

const CategoryItem = ({ color, value, heading }) => (
  <div className="category-item p-4 border rounded shadow-sm">
    <h5 className="text-lg font-bold">{heading}</h5>
    <div className="w-full bg-gray-200 rounded-full h-4 mt-2 mb-2">
      <div
        className="h-4 rounded-full"
        style={{
          backgroundColor: color,
          width: `${value}%`,
        }}
      ></div>
    </div>
    <span className="text-lg">{value}%</span>
  </div>
);
