import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import StudentViewCommonHeader from './header';
import StudentViewCommonFooter from './footer';

const StudentViewCommonLayout = () => {
     const location = useLocation();
     return (
          <div>
               {
                    !location.pathname.includes("course-progress") ? (
                         <StudentViewCommonHeader />
                    ) : null
               }

               <Outlet />

               {
                    !location.pathname.includes("course-progress") ? (
                         <StudentViewCommonFooter />
                    ) : null
               }
          </div>
     )
}

export default StudentViewCommonLayout