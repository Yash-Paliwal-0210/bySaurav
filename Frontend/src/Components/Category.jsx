import React from 'react'
import responsive from '../Assets/Icons/responsive.png'
import cream from '../Assets/Icons/cream.png'
import Grocery from '../Assets/Icons/grocery.png'
import home from '../Assets/Icons/working-at-home.png'
import toys from '../Assets/Icons/toys.png'
import sports from '../Assets/Icons/sports.png'
import { useNavigate } from 'react-router-dom'


export default function Category() {
    const navigateTo = useNavigate();
    return (
        <div className='mb-10 py-4'>
            <div className='mx-32 py-3 md:text-left sm:text-center text-center '>
                <h1 className='text-2xl font-bold text-red-500'>Categories</h1>
            </div>
            <div className='md:mx-32 mx-0 py-3 md:text-left sm:text-center text-center '>
                <h1 className='text-4xl font-bold color-red-500'>Browse By Category</h1>
            </div>

            <div className=' py-3 flex-wrap xl:mx-32  flex-row flex gap-10 justify-center mx-0 sm:mx-0 md:mx-10 lg:mx-10'>
                <div className='card  flex flex-wrap flex1-row justify-center gap-6 '>
                    <div onClick={()=> navigateTo("/product?category=Ethinic")} className='gfg sm:p-10 p-6   sm:pb-7 pb-3 border-2 rounded-lg hover:text-white hover:bg-red-500 hover:cursor-pointer '>
                        <img src={"https://cdn.pixabay.com/photo/2022/11/20/06/31/woman-7603569_1280.jpg"} alt="" style={{ height: "140px", width:"100px" }} className='image'/>
                        <div className='flex justify-center pt-4'>
                            <h1>Ethinic Set</h1>
                        </div>
                    </div>
                    <div onClick={()=> navigateTo("/product?category=Tops")} className='gfg sm:p-10 p-6   sm:pb-7 pb-3 border-2 rounded-lg hover:text-white hover:bg-red-500 hover:cursor-pointer '>
                        <img src={"https://images.bewakoof.com/utter/content/2691/content_Stylish_tops_with_jeans.jpg"} alt="" style={{ height: "140px", width:"100px" }} className='image'/>
                        <div className='flex justify-center pt-4'>
                            <h1>Tops</h1>
                        </div>
                    </div>
                    <div onClick={()=> navigateTo("/product?category=Kurti")} className='gfg sm:p-10 p-6   sm:pb-7 pb-3 border-2 rounded-lg hover:text-white hover:bg-red-500 hover:cursor-pointer '>
                        <img src={"https://m.media-amazon.com/images/I/817kSlvA50L._AC_UY1100_.jpg"} alt="" style={{ height: "140px", width:"100px" }} className='image'/>
                        <div className='flex justify-center pt-4'>
                            <h1>Kurti Set</h1>
                        </div>
                    </div>
                    <div onClick={()=> navigateTo("/product?category=Ambrella")} className='gfg sm:p-10 p-6   sm:pb-7 pb-3 border-2 rounded-lg hover:text-white hover:bg-red-500 hover:cursor-pointer '>
                        <img src={"https://kohsh.in/cdn/shop/products/Copy_of__DSC5336-Edit-scaled.jpg?v=1677927958"} alt="" style={{ height: "140px", width:"100px" }} className='image'/>
                        <div className='flex justify-center pt-4'>
                            <h1>Ambrella Set</h1>
                        </div>
                    </div>
                    <div onClick={()=> navigateTo("/product?category=Nayra")} className='gfg sm:p-10 p-6   sm:pb-7 pb-3 border-2 rounded-lg hover:text-white hover:bg-red-500 hover:cursor-pointer '>
                        <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQgGzE4Fb4KBz5-cLpVckO-iEfgRRx9YjgLw&s"} alt="" style={{ height: "140px" , width:"100px"}} className='image'/>
                        <div className='flex justify-center pt-4'>
                            <h1>Nayra Set</h1>
                        </div>
                    </div>
                    <div onClick={()=> navigateTo("/product?category=Dupatta")} className='gfg sm:p-10 p-6   sm:pb-7 pb-3 border-2 rounded-lg hover:text-white hover:bg-red-500 hover:cursor-pointer ' >
                        <img src={"https://m.media-amazon.com/images/I/71IynTty97L._AC_UY1100_.jpg"} alt="" style={{ height: "140px", width:"100px"}} className='image'/>
                        <div className='flex justify-center pt-4'>
                            <h1>Dupatta</h1>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
