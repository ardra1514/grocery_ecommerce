import React from 'react'
import { useAppContext } from '../context/Appcontex'
import { useParams } from 'react-router-dom'
import { categories } from '../assets/assets'
import Productcard from '../components/Productcard'

const Productcategory = () => {
    const {products}=useAppContext()
    const {category}=useParams()


const searchcategory = categories.find(
  (item) => item.path.toLowerCase() === category.toLowerCase()
);

const filteredproduct = products.filter(
  (product) => product.category.toLowerCase() === category.toLowerCase()
);


  return (
    <div className='mt-16'>
        
    {searchcategory && (
        <div className='flex flex-col items-end w-max'>
            <p className='text-2xl font-medium'>{searchcategory.text.toUpperCase()}</p>
            <div className='w-16 h-0.5 bg-primary rounded-full'>

            </div>
        </div>
    )}
    {filteredproduct.length>0?(
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 mt-6'>
            {filteredproduct.map((product)=>(
                <Productcard key={product._id} product={product}/>
            ))}
        </div>
    ):(<div className='flex items-center justify-center h-[60vh'>
        <p className='text-2xl font-medium text-primary'>no products found this catogory</p>
    </div>)}
    </div>
  )
}

export default Productcategory