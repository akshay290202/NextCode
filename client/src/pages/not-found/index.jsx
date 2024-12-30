import React from 'react'
import notfound from '../../assets/notfound.jpg';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
     return (
          <div className='flex flex-col min-h-screen'>
               <header className='px-4 lg:px-6 h-14 flex items-center border-b bg-amber-50'>
                    <Link to={'/'} className='flex items-center justify-center'>
                         <img src={logo} className='h-12 w-12 mr-2' alt='logo.png' />
                         <span className='font-extrabold text-xl'>NextCode</span>
                    </Link>
               </header>
               <div className="flex items-center justify-center">
                    <img src={notfound} alt='not found img' />
               </div>
          </div>
     )
}

export default NotFoundPage