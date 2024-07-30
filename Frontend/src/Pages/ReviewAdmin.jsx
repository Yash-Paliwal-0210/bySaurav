import React from 'react'

const ReviewAdmin = () => {
  return (
    <div className='flex'>
    <div className='flex flex-col p-8 gap-4'>
                  <div className='flex gap-2 items-center px-4'>
                      <div className='w-[20px]'>
                          <i class="fa-solid fa-qrcode"></i>
                      </div>
                      <div className=' font-semibold'>
                          <a href=""><span className='text-2xl'>Dashboard</span></a>
                      </div>
                  </div>

                  <div className='flex gap-2 items-center px-4'>
                      <div className='w-[20px]'>
                          <i class="fa-solid fa-cart-shopping"></i>
                      </div>
                      <div className='flex space-x-2 font-semibold'>
                          <a href=""><span className='text-2xl'>Products</span></a>
                          <select name="" id="" border-none>
                              {/* <option value="" fixed disabled>Products</option> */}
                              <option value="">All</option>
                              <option value="">New</option>
                          </select>
                      </div>
                  </div>

                  <div className='flex gap-2 items-center px-4'>
                      <div  className='w-[20px]'>
                          {/* <i class="fa-solid fa-cart-shopping"></i> */}
                          <a href="/admin/dashboard"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-1zm0 4a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5v-1zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm8 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-4 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm8 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-4-4a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5v-1z"></path></svg></a>
                      </div>
                      <div className=' font-semibold'>
                         <a href=""> <span className='text-2xl'>Orders</span></a>
                      </div>

                  </div>
                  <div className='flex gap-2 items-center px-4'>
                      <div  className='w-[20px]'>
                          <a href="/admin/dashboard"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path></svg></a>
                      </div>
                      <div className=' font-semibold'>
                        <a href=""> <span className='text-2xl'>Users</span></a> 
                      </div>

                  </div>
                  <div className='flex gap-2 items-center px-4'>
                      <div  className='w-[20px]'>
                          <a href="/admin/dashboard"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17l-.59.59-.58.58V4h16v12zm-9.5-2H18v-2h-5.5zm3.86-5.87c.2-.2.2-.51 0-.71l-1.77-1.77c-.2-.2-.51-.2-.71 0L6 11.53V14h2.47l5.89-5.87z"></path></svg></a>
                      </div>
                      <div className=' font-semibold'>
                          <a href=""><span className='text-2xl'>Review</span></a>
                      </div>

                  </div>
              </div>
              <div>


              </div>
              <div className='w-full shadow-md sm:rounded-lg'>
  <div className='text-4xl text-center py-4 font-semibold'>Review</div>
<div class="w-full shadow-md sm:rounded-lg">
  <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
              <th scope="col" class="px-6 py-3">
                  Product Id
              </th>
              <th scope="col" class="px-6 py-3">
                  Name
              </th>
              <th scope="col" class="px-6 py-3">
                  No. of Reviews
              </th>
              <th scope="col" class="px-6 py-3">
                  Ratings
              </th>
             
          </tr>
      </thead>
      <tbody>
          <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Apple MacBook Pro 17"
              </th>
              <td class="px-6 py-4">
                  Silver
              </td>
              <td class="px-6 py-4">
                  Laptop
              </td>
              <td class="px-6 py-4">
                  $2999
              </td>
              
          </tr>
          <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Microsoft Surface Pro
              </th>
              <td class="px-6 py-4">
                  White
              </td>
              <td class="px-6 py-4">
                  Laptop PC
              </td>
              <td class="px-6 py-4">
                  $1999
              </td>
             
          </tr>
          <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Magic Mouse 2
              </th>
              <td class="px-6 py-4">
                  Black
              </td>
              <td class="px-6 py-4">
                  Accessories
              </td>
              <td class="px-6 py-4">
                  $99
              </td>
             
          </tr>
          <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Google Pixel Phone
              </th>
              <td class="px-6 py-4">
                  Gray
              </td>
              <td class="px-6 py-4">
                  Phone
              </td>
              <td class="px-6 py-4">
                  $799
              </td>
              
          </tr>
          <tr>
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Apple Watch 5
              </th>
              <td class="px-6 py-4">
                  Red
              </td>
              <td class="px-6 py-4">
                  Wearables
              </td>
              <td class="px-6 py-4">
                  $999
              </td>
              
          </tr>
      </tbody>
  </table>
</div>
              </div>

  </div>
  )
}

export default ReviewAdmin
