import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    

    async function addProductToCart(productId){
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }
            const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/cart', {
                productId
            }, {
                headers: {
                    token: token
                }
            });
            console.log(data);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error('Unauthorized: Token is invalid or missing');
            } else {
                console.error('Error adding product to cart:', error);
            }
        }
    }

    useEffect(() => {
        async function fetchProducts() {
            try {
                const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
                console.log(data.data);
                setProducts(data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    return (
        <>
            {loading ? (
                <div className='d-flex align-items-center justify-content-center my-5 py-5'>
                    <i className='fas fa-spin fa-spinner fa-2x'></i>
                </div>
            ) : (
                <div className='row'> 
                    {products.map((product, index) => (
                        <div key={index} className="product col-md-3 px-2 py-3 cursor-pointer mt-5">
                            {product.imageCover && (
                                <img style={{ height: 200 }} src={product.imageCover} className='w-100' alt='' />
                            )}
                            <h5 className='font-sm text-main'>{product.category.name}</h5>
                            <h4>{product.title.split(" ").slice(0, 2).join(" ")}</h4>
                            <p className='d-flex justify-content-between'>
                                <span >{product.price} EGP</span>
                                <span>
                                    <i className='fas fa-star rating-color me-1'></i>
                                    {product.ratingsAverage}
                                </span>
                            </p>
                            <button onClick={() => addProductToCart(product.id)} className='btn bg-main text-white w-100 '>+Add To Cart</button>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
