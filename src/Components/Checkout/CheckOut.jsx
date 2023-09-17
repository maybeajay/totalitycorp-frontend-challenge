import React, { useEffect, useState } from 'react'
import { fetchCartAsync } from '../Cart/CartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom';
export default function CheckOut() {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchCartAsync())
  }, [])
  const cartItems = useSelector((state)=>state.cart.items)
  const subTotal = cartItems.reduce((acc, item)=>item.price*item.qunatity+acc, 0)
  const [placed, setPlaced]=useState(false);
  const [userDetails, setUserDetails]=useState({
    name: null,
    email: null,
    address: null,
    city: null,
    state: null,
    zip: null,
    country: null,
    cardDetails: null
  })
  const handleUserDetails = (e)=>{
    setUserDetails({...userDetails, [e.target.name]:e.target.value})
  }
  const handleRedirect =()=>{
    setPlaced(true)
  }
  return (
    <div className="h-screen grid grid-cols-3">
    <div className="lg:col-span-2 col-span-3 bg-indigo-50 space-y-8 px-12">
      <div className="mt-8 p-4 relative flex flex-col sm:flex-row sm:items-center bg-white shadow rounded-md">
        <div className="flex flex-row items-center border-b sm:border-b-0 w-full sm:w-auto pb-4 sm:pb-0">
          <div className="text-yellow-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 sm:w-5 h-6 sm:h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="text-sm font-medium ml-3">Checkout</div>
        </div>
        <div className="text-sm tracking-wide text-gray-500 mt-4 sm:mt-0 sm:ml-4">
          Complete your shipping and payment details below.
        </div>
        <div className="absolute sm:relative sm:top-auto sm:right-auto ml-auto right-4 top-4 text-gray-400 hover:text-gray-800 cursor-pointer">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>
      <div className="rounded-md">
          <section>
            <h2 className="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">
              Shipping &amp; Billing Information
            </h2>
            <fieldset className="mb-3 bg-white shadow-lg rounded text-gray-600">
              <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                <span className="text-right px-2">Name</span>
                <input
                  name="name"
                  className="focus:outline-none px-3"
                  placeholder="Try Odinsson"
                  required={true}
                  onChange={(e)=>handleUserDetails(e)}
                />
              </label>
              <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                <span className="text-right px-2">Email</span>
                <input
                  name="email"
                  type="email"
                  className="focus:outline-none px-3"
                  placeholder="try@example.com"
                  required={true}
                  onChange={(e)=>handleUserDetails(e)}
                />
              </label>
              <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                <span className="text-right px-2">Address</span>
                <input
                  name="address"
                  className="focus:outline-none px-3"
                  placeholder="10 Street XYZ 654"
                  onChange={(e)=>handleUserDetails(e)}
                />
              </label>
              <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                <span className="text-right px-2">City</span>
                <input
                  name="city"
                  className="focus:outline-none px-3"
                  placeholder="San Francisco"
                  onChange={(e)=>handleUserDetails(e)}
                />
              </label>
              <label className="inline-flex w-2/4 border-gray-200 py-3">
                <span className="text-right px-2">State</span>
                <input
                  name="state"
                  className="focus:outline-none px-3"
                  placeholder="HR"
                  onChange={(e)=>handleUserDetails(e)}
                />
              </label>
              <label className="xl:w-1/4 xl:inline-flex py-3 items-center flex xl:border-none border-t border-gray-200 py-3">
                <span className="text-right px-2 xl:px-0 xl:text-none">ZIP</span>
                <input
                  name="zip"
                  className="focus:outline-none px-3"
                  placeholder={98603}
                  onChange={(e)=>handleUserDetails(e)}
                />
              </label>
              <label className="flex border-t border-gray-200 h-12 py-3 items-center select relative">
                <span className="text-right px-2">Country</span>
                <div
                  id="country"
                  className="focus:outline-none px-3 w-full flex items-center"
                >
                  <input
                  name="Country"
                  className="focus:outline-none px-3"
                  placeholder={"India"}
                  onChange={(e)=>handleUserDetails(e)}
                />
                </div>
              </label>
            </fieldset>
          </section>
      </div>
      <div className="rounded-md">
        <section>
          <h2 className="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">
            Payment Information
          </h2>
          <fieldset className="mb-3 bg-white shadow-lg rounded text-gray-600">
            <label className="flex border-b border-gray-200 h-12 py-3 items-center">
              <span className="text-right px-2">Card</span>
              <input
                name="cardDetails"
                className="focus:outline-none px-3 w-full"
                placeholder="Card number MM/YY CVC"
                required={true}
                onChange={(e)=>handleUserDetails(e)}
              />
            </label>
          </fieldset>
        </section>
      </div>
      <div className="grid grid-cols-3">
      {
        placed ? <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md backdrop-filter bg-opacity-80 bg-gray-500">
        <div className="bg-white w-1/2 p-6 rounded-lg shadow-lg">
          <div className="text-center">
            <p className="text-3xl font-semibold">Order Placed</p>
            <p className="text-gray-600 mt-2">
              Your order has been successfully placed.
            </p>
          </div>
          <div className="text-right mt-4 flex justify-center">
          <Link to="/" className="px-4 py-2 bg-blue-200 text-dark-600 rounded hover:bg-blue-600">Go to Homepage</Link>
          </div>
        </div>
      </div>
      : null      
      }
      </div>
      <button className="submit-button px-4 py-3 rounded-full bg-indigo-400 text-white focus:ring focus:outline-none w-full text-xl font-semibold transition-colors" onClick={()=>handleRedirect()}>
        Pay ${(subTotal+4.99).toFixed(2)}
      </button>
    </div>
    <div className="col-span-1 bg-white lg:block hidden">
      <h1 className="py-6 border-b-2 text-xl text-gray-600 px-8">
        Order Summary
      </h1>
      <ul className="py-6 border-b space-y-6 px-8">
      {cartItems.map((item) => (
        <li key={item.id} className="grid grid-cols-6 gap-2 border-b-1">
          <div className="col-span-1 self-center">
            <img
              src={item.thumbnail}
              alt="Product"
              className="rounded w-full"
            />
          </div>
          <div className="flex flex-col col-span-3 pt-2">
            <span className="text-gray-600 text-md font-semi-bold">
              {item.title}
            </span>
            <span className="text-gray-400 text-sm inline-block pt-2">
              {item.description}
            </span>
          </div>
          <div className="col-span-2 pt-3">
            <div className="flex items-center space-x-2 text-sm justify-between">
              <span className="text-gray-400">Price</span>
              <span className="text-indigo-400 font-semibold inline-block">
                ${item.price}
              </span>
            </div>
          </div>
        </li>
      ))}
    </ul>

      <div className="px-8 border-b">
        <div className="flex justify-between py-4 text-gray-600">
          <span>Subtotal</span>
          <span className="font-semibold text-indigo-500">{subTotal}</span>
        </div>
        <div className="flex justify-between py-4 text-gray-600">
          <span>Shipping</span>
          <span className="font-semibold text-indigo-500">$4.99</span>
        </div>
      </div>
      <div className="font-semibold text-xl px-8 flex justify-between py-8 text-gray-600">
        <span>Total</span>
        <span>${(subTotal+4.99).toFixed(2)}</span>
      </div>
    </div>
  </div>
  
  )
}
