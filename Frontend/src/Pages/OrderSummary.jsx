import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const OrderSummary = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    return (
        <div className='flex gap-10 md:flex-row flex-col'>
            <div className="p-4 md:hidden">
                <button
                    className="text-white bg-green-600 px-4 py-2 rounded"
                    onClick={toggleMenu}
                >
                    {menuOpen ? "Close Menu" : "Open Menu"}
                </button>
            </div>
            <div className={`flex flex-col p-8 gap-4 w-full md:w-1/4 ${menuOpen ? "block" : "hidden"} md:block`}>
                <NavItem icon="fa-qrcode" text="Dashboard" link="/admin/dashboard" />
                <NavItem icon="fa-cart-shopping" text="Products" link="" subLinks={[
                    { text: "All", Link: "/admin/product" },
                    { text: "New", link: "/admin/product/new" },
                    { text: "Banner", link: "/admin/banner" }
                ]} />
                <NavItem icon="fa-cart-shopping" text="Orders" link="/admin/orders" />
                <NavItem icon="fa-users" text="Users" link="/admin/users" />
                {/* <NavItem icon="fa-star" text="Review" link="/admin/review" /> */}
            </div>

            <div className='w-full p-4'>
                <div><h1 className='text-2xl font-bold flex justify-center items-center'>Update Status</h1></div>

                <div className='p-4'>
                    <div>Name: </div>
                    <div>Phone No.:</div>
                    <div>Address:</div>
                </div>

                <div className='p-4'>
                    <div className='font-semibold'>Order Status : </div>
                </div>
                <div className='p-4'>
                    <div className='font-semibold'>Shopping Cart : </div>
                </div>

                <div className=''>
                <div className='p-4 '>
                    <div className='font-semibold'>Order Summary </div>
                    <div className=''>Subtotal : </div>
                    <div className=''>Delivery :</div>
                    <div className=''>Tax :</div>
                </div>

                <div className='p-4'>
                <div className='font-bold'>Update Status</div>
                <div className='font-bold'>Selected Category</div>
                Choose
                <div>
                    <select name="" id="">
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>

                </div>

                <div className='flex justify-center items-center mt-2 mb-2'>
                    <button className='bg-green-600 p-2 rounded text-white font-semibold'>Update Status</button>
                </div>
                </div>
            </div>




        </div>
    )
}

export default OrderSummary

const NavItem = ({ icon, text, link, subLinks = [] }) => (
    <div className="flex gap-4 items-center px-4 mb-4">
        <div className="w-[20px]">
            <i className={`fa-solid ${icon}`}></i>
        </div>
        <div className="space-x-2 font-semibold mb-2">
            <a href={link}>
                <span className="text-2xl">{text}</span>
            </a>
            {subLinks.length > 0 && subLinks.map((subLink, index) => (
                <div key={index}>
                    <Link to={subLink.link}>{subLink.text}</Link>
                </div>
            ))}
        </div>
    </div>
);
