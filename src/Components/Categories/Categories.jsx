import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
        console.log(data.data);
        setCategories(data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return (
    <>
      {loading ? (
        <div className='d-flex align-items-center justify-content-center my-5 py-5'>
          <i className='fas fa-spin fa-spinner fa-2x'></i>
        </div>
      ) : (
        <div className='row'>
          
          {categories.map((category, index) => (
            <div key={index} className="col-md-3">
              {category.image && (
                <img style={{ height: 200 }} src={category.image} className='w-100' alt='' />
              )}
              <h5 className='font-sm text-main'>{category.name}</h5>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
