import React from 'react'
import notfound from '../../assets/notfound.png';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import StudentViewCommonHeader from '@/components/student-view/header';

const NotFoundPage = () => {
     return (
          <div className='flex flex-col min-h-screen'>
               <StudentViewCommonHeader/>
               <div className="flex items-center justify-center mx-auto my-auto">
                    <img src={notfound} alt='not found img' />
               </div>
          </div>
     )
}

export default NotFoundPage