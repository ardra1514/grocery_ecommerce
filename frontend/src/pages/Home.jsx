import React from 'react'
import Mainbanner from '../components/Mainbanner'
import Categories from '../components/Categories'
import Bestseller from '../components/Bestseller'
import Bottombanner from '../components/Bottombanner'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'


const Home = () => {
  return (
    <div className='mt-10'>
        
<Mainbanner/>
<Categories/>
<Bestseller/>
<Bottombanner/>
<Newsletter/>

    </div>
  )
}

export default Home