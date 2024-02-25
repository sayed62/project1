import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import * as Yup from 'yup'

function Address() {
    const [errorMsg, setErrorMsg] = useState('')
    const [isloading, setIsloading] = useState(false)
    let {cartId} = useParams()



    const validationSchema = Yup.object({
        details : Yup.string().required('Details is required'),
        city : Yup.string().required('city is required'),
        phone : Yup.string().required('phone is required').matches(/^01[0125][0-9]{8}$/,"enter valid egyption phone number")
    })

    async function onSubmit(){
        setIsloading(true)
        setErrorMsg('');
        try{
            console.log(values)
            let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`, {
                shippingAddress: values
            },{
                headers: {
                    token : localStorage.getItem('token')
                },
                params:{
                    url: `http://localhost:3000`
                }
            })

            window.open(data.session.url, `_self` )

        } catch(error) {
            setErrorMsg(error.response.data.messagee);

        }
        setIsloading(false)
    }
    const { handleSubmit, values, handleChange, errors, touched, handleBlur, isvalid} = useFormik({
        initialValues:{
            details:'',
            city:'',
            phone:'',
        },
        onSubmit,
        validationSchema
    })
    return (
        <div className="w-75 m-auto my-5">
        <h2>Address :</h2>
        <form onSubmit={handleSubmit} >
            <label htmlFor="details" className='my-1'>Details:</label>
            <input onChange={handleChange} onBlur={handleBlur} value={isvalid.details} type="details" className='form-control mb-3' id='details' name='details' />
            {errors.details && touched.details && <p className='alert alert-danger'>{errors.details}</p>}

            <label htmlFor="phone" className='my-1'>Phone:</label>
            <input onChange={handleChange} onBlur={handleBlur} value={isvalid.phone} type="phone" className='form-control mb-3' id='phone' name='phone' />
        {errors.phone && touched.phone && <p className='alert alert-danger'>{errors.phone}</p>}


            <label htmlFor="city" className='my-1'>City:</label>
            <input onChange={handleChange} onBlur={handleBlur} value={isvalid.city} type="city" className='form-control mb-3' id='city' name='city' />
        {errors.city && touched.city && <p className='alert alert-danger'>{errors.city}</p>}

            <button type='submit' className='btn bg-main px-3 text-white ms-auto d-block'>CheckOut</button>
        </form>
        </div>
    )
}

export default Address