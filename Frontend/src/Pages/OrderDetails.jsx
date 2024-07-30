import React from 'react'

const OrderDetails = () => {
  return (
    <div className='p-10'>
      <div className='font-semibold text-2xl pb-3'>Transaction Id</div>

      <div className='font-semibold text-2xl '>Shipping Info</div>
      <div className='pb-3'> 
        <div>Name : </div>
        <div>Phone :</div>
        <div>Address :</div>
      </div>

      <div className='font-semibold text-2xl '>Payment</div>
      <div className='pb-3'>

      <div >Payment Status</div>
      <div >Amount</div>
      </div>

      <div className='font-semibold text-2xl'>Order Status</div>
      <div className='pb-3'>Processing </div>

      <div className='font-semibold text-2xl '>Order Items</div>

    </div>
  )
}

export default OrderDetails
