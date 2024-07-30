// import React, { Component } from 'react'
// import add from '../Assets/images/add1.jpeg'
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from 'react-responsive-carousel';
// import { useState } from 'react';
// import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
// import Carouse from './Carousel_Slider.jsx'
// import { useNavigate } from 'react-router-dom';
// export default class Main_Section extends Component {

//     render() {
//         const navigateTo = useNavigate();
//         return (
//             <>
//                 <div className='flex md:flex-row bg-brown-200 h-auto'>
//                     <div className="left md:flex  justify-center pt-10 border-r-2 border-gray-300 hidden sm:hidden md:visible lg:visible xl:visible" style={{ width: "350px", height: "500px" }}>
//                         <div className="flex flex-col ">
//                             <div onClick={()=> navigateTo('/product?category=New')} className='hover:text-red-500'><h1 className='py-1 font-semibold'>New</h1></div>
//                             <a href="/product?category=Ethinic" className='hover:text-red-500'><h1 className='py-1 font-semibold'>Ethnic Set</h1></a>
//                             <a href="/product?category=Tops" className='hover:text-red-500'><h1 className='py-1 font-semibold'>Tops</h1></a>
//                             <a href="/product?category=Kurti" className='hover:text-red-500'><h1 className='py-1 font-semibold'>Kurti Set </h1></a>
//                             <a href="/product?category=Ambrella" className='hover:text-red-500'><h1 className='py-1 font-semibold'>Ambrella Set </h1></a>
//                             <a href="/product?category=Nayra" className='hover:text-red-500'><h1 className='py-1 font-semibold'>Nayra Set </h1></a>
//                             <a href="/product?category=Pant" className='hover:text-red-500'><h1 className='py-1 font-semibold'>Pant</h1></a>
//                             <a href="/product?category=Dupatta" className='hover:text-red-500'><h1 className='py-1 font-semibold'>Dupatta</h1></a>
//                             {/* <a href="http://localhost:5174/product?category=health" className='hover:text-red-500'><h1 className='py-1 font-semibold'>Health & Beauty</h1></a> */}
//                         </div>
//                     </div>

//                     <div className="right  p-5" style={{ width: "1150px" }}>

//                         <Carouse />

//                     </div>

//                 </div>

                

//             </>
//         )
//     }
// }


import React from 'react';
import add from '../Assets/images/add1.jpeg';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import Carouse from './Carousel_Slider.jsx';
import { useNavigate } from 'react-router-dom';

const Main_Section = () => {
    const navigateTo = useNavigate();

    return (
        <>
            <div className='flex md:flex-row bg-brown-200 h-auto'>
                <div className="left md:flex  justify-center pt-10 border-r-2 border-gray-300 hidden sm:hidden md:visible lg:visible xl:visible" style={{ width: "350px", height: "500px" }}>
                    <div className="flex flex-col cursor-pointer">
                        <div onClick={() => navigateTo('/product?category=New')} className='hover:text-red-500'><h1 className='py-1 font-semibold'>New</h1></div>
                        <div onClick={() => navigateTo('/product?category=Ethinic')} className='hover:text-red-500'><h1 className='py-1 font-semibold'>Ethnic Set</h1></div>
                        <div onClick={() => navigateTo('/product?category=Tops')} className='hover:text-red-500'><h1 className='py-1 font-semibold'>Tops</h1></div>
                        <div onClick={() => navigateTo('/product?category=Kurti')} className='hover:text-red-500'><h1 className='py-1 font-semibold'>Kurti Set </h1></div>
                        <div onClick={() => navigateTo('/product?category=New')} className='hover:text-red-500'><h1 className='py-1 font-semibold'>Ambrella Set </h1></div>
                        <div onClick={() => navigateTo('/product?category=Nayra')} className='hover:text-red-500'><h1 className='py-1 font-semibold'>Nayra Set </h1></div>
                        <div onClick={() => navigateTo('/product?category=Pant')} className='hover:text-red-500'><h1 className='py-1 font-semibold'>Pant</h1></div>
                        <div onClick={() => navigateTo('/product?category=Dupatta')} className='hover:text-red-500'><h1 className='py-1 font-semibold'>Dupatta</h1></div>
                    </div>
                </div>

                <div className="right  p-5" style={{ width: "1150px" }}>
                    <Carouse />
                </div>
            </div>
        </>
    );
};

export default Main_Section;
