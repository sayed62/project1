import axios from 'axios';
import React, { useState, useEffect } from 'react';

function Brands() {
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
        if (Array.isArray(data.data)) {
          setBrands(data.data);
        } else {
          throw new Error('Response data is not an array');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBrands();
  }, []);

  console.log('brands:', brands);

  if (isLoading) {
    return (
      <div className='d-flex align-items-center justify-content-center my-5 py-5'>
        <i className='fas fa-spin fa-spinner fa-2x'></i>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div >
    <ul className='row'>
      {brands.map((brand) => (
        <div key={brand.id} className="col-md-3 px-2 py-3 cursor-pointer mt-5">
          <img src={brand.image} alt={brand.name} style={{ width: '50px', marginRight: '10px' }} />
          {brand.name}
        </div>
      ))}
    </ul>
  </div>
  
  );
}

export default Brands;
