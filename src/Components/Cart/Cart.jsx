import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CartProduct from '../CartProduct/CartProduct';
import { Link } from 'react-router-dom';

export default function Cart() {
  
  const [cart, setCart] = useState({})
  const [timeOutId, setTimeOutId] = useState()
  const [isLoading, setIsLoading] = useState(true); 

  async function getLoggedInCartProducts() {
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
        headers: {
          token: localStorage.getItem('token')
        }
      })

      console.log(data);
      setCart(data)
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false); 
    }
  }

  useEffect(() => {
    getLoggedInCartProducts()
  }, [])

  async function removeProductFromCart(productId) {
    const { data } = await axios.delete('https://ecommerce.routemisr.com/api/v1/cart/' + productId, {
      headers: {
        token: localStorage.getItem("token")
      }
    })
    console.log(data);
    setCart(data);
  }
  
  async function clearCart() {
    const { data } = await axios.delete('https://ecommerce.routemisr.com/api/v1/cart', {
      headers: {
        token: localStorage.getItem("token")
      }
    })
    console.log(data);
    setCart(data);
    
  }

  function updateCartProductCount(productId, count) {
    clearTimeout(timeOutId)

    setTimeOutId(setTimeout(async () => {
      if (count === 0) {
        removeProductFromCart(productId)
      } else {
        const { data } = await axios.put('https://ecommerce.routemisr.com/api/v1/cart/' + productId, {
          count
        }, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        console.log(data);
        setCart(data);
      }
    }, 500))
    
  }

  return (
    <>
      {isLoading ? ( 
        <div className='d-flex align-items-center justify-content-center my-5 py-5'>
          <i className='fas fa-spin fa-spinner fa-2x'></i>
        </div>
      ) : (
        <>
          {cart.data && cart.data.products && cart.data.products.length > 0 ? (
            <div className='my-5'>
              <button onClick={clearCart} className='btn btn-outline-danger d-block ms-auto'>Clear Cart</button>
              {cart.data.products.map((cartProduct) => (
            <CartProduct
              key={cartProduct.productId}
              updateCartProductCount={updateCartProductCount}
              removeProductFromCart={removeProductFromCart}
              cartProduct={cartProduct}
            />
          ))}
              <div className='d-flex justify-content-between'>
                <Link to={`/address/${cart.data._id}`} className='btn bg-main text-white'>CheckOut</Link>
                <p>Total cart Price: {cart.data.totalCartPrice} EGP</p>
              </div>
            </div>
          ) : (
            <h2 className='alert alert-warning text-center my-5'>No products in your cart</h2>
          )}
        </>
      )}
    </>
  );
}
