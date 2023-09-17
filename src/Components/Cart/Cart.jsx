import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { fetchCartAsync, updateAsync, deleteAsync } from './CartSlice'
export default function Cart() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cartItems = useSelector((state)=>state.cart.items);
    useEffect(()=>{
      dispatch(fetchCartAsync())
    }, [])
    const handleChange =(e, id)=>{
      dispatch(updateAsync({id, change:{qunatity:+e.target.value}}))
    }
    const subTotal = cartItems.reduce((acc, item)=>item.price*item.qunatity+acc, 0)
  return (
    <div className='container mx-auto max-w-full'>
        <div className="h-screen bg-gray-100 pt-20">
  <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
  <Link to="/" className="flex font-semibold text-indigo-600 text-sm mt-10 ml-10 mb-8">
      
          <svg class="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z"/></svg>
          Continue Shopping
        </Link>
  <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
    <div className="rounded-lg md:w-2/3">
    {cartItems.map((item) => (
        <div
          key={item.id}
          className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
        >
          <img
            src={item.thumbnail}
            alt="product-image"
            className="w-full rounded-lg sm:w-40"
          />
          <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
            <div className="mt-5 sm:mt-0">
              <h2 className="text-lg font-bold text-gray-900">{item.title}</h2>
            </div>
            <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
              <div className="flex items-center border-gray-100">
                <p className='text-gray-500'>Quantity</p>
                <select onChange={(e)=>handleChange(e, item.id)} value={item.qunatity} defaultValue={1}>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                </select>
              </div>
              <div className="flex items-center space-x-4">
                <p className="text-sm">$ {item.price}</p>
                <button onClick={()=>dispatch(deleteAsync(item.id))}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    {/* Sub total */}
    <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
      <div className="mb-2 flex justify-between">
        <p className="text-gray-700">Subtotal</p>
        <p className="text-gray-700">${subTotal}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-gray-700">Shipping</p>
        <p className="text-gray-700">$4.99</p>
      </div>
      <hr className="my-4" />
      <div className="flex justify-between">
        <p className="text-lg font-bold">Total</p>
        <div className="">
          <p className="mb-1 text-lg font-bold">$ {(subTotal + 4.99).toFixed(2)}</p>
        </div>
      </div>
      <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600" onClick={()=>navigate('/checkout')}>
        Check out
      </button>
    </div>
  </div>
</div>

    </div>
  )
}
