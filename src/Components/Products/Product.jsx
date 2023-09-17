import React, { useEffect, useState } from "react";
import { getproductsAsync } from "./ProductSlice";
import { addAsync } from "../Cart/CartSlice";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
export default function Product() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const [quantity, setQuantity]=useState(1)
    const prods = useSelector((state)=>state.product.products);
    const cartLength = useSelector((state)=>state.cart.items);
    useEffect(()=>{
      dispatch(getproductsAsync());
    }, [])
    return (
    <div className="container mx-auto max-w-full">
      {/* top list */}
      <h1 className="text-xl text-center font-bold p-5">Product List</h1>
      <div className="flex justify-end mr-10 hover:cursor-pointer" onClick={()=>navigate('/cart')}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap={"round"} strokeLinejoin={'round'} strokeWidth={"2"} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
      <p className="text-gray-600 relative bottom-5 right-2 text-lg font-semibold">{cartLength.length}</p>
      </div>
      <section
        id="Projects"
        className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
      >
       {
        prods && prods.map((product)=>{
          return(
          <div
          key={product.id}
          className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
        >
          <img
            src={product.thumbnail}
            alt="Product"
            className="h-80 w-auto object-cover rounded-t-xl"
          />
          <div className="px-4 py-3 w-72">
            <span className="text-gray-400 mr-3 uppercase text-xs">
              {product.brand}
            </span>
            <p className="text-lg font-bold text-black truncate block capitalize">
              {product.title}
            </p>
            <div className="flex items-center">
              <p className="text-lg font-semibold text-black cursor-auto my-3">
                ${product.price}
              </p>
              <div className="ml-auto">
                <button onClick={() =>dispatch(addAsync(product))} className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border-2 border-gray-900 font-semibold text-gray-800 hover:text-white hover:bg-gray-800 hover:border-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 transition-all text-sm dark:hover:bg-gray-900 dark:border-gray-900 dark:hover:border-gray-900dark:focus:ring-gray-900 dark:focus:ring-offset-gray-800">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
          )
        })
       }
      </section>
    </div>
  );
}
