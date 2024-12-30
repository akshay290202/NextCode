import { GraduationCap, TvMinimalPlay } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useContext } from "react";
import logo from '../../assets/logo.png'
import { AuthContext } from "@/context/auth-context";
import toast from "react-hot-toast";

function StudentViewCommonHeader() {
     const navigate = useNavigate();
     const { resetCredentials } = useContext(AuthContext);

     function handleLogout() {
          resetCredentials();
          sessionStorage.clear();
          toast.success('Logout success !')
     }

     return (
          <header className="flex items-center justify-between p-2 border-b relative bg-amber-50">
               <div className="flex items-center space-x-4">
                    <Link to="/home" className="flex items-center hover:text-black">
                         <img src={logo} className='h-12 w-12 mr-2' alt='logo.png' />
                         <span className="font-extrabold md:text-xl text-[14px]">
                              NextCode
                         </span>
                    </Link>

               </div>

               <div className="flex items-center space-x-4">
                    <div className="flex gap-4 items-center">
                         <div className="flex items-center space-x-1">
                              <Button
                                   variant="ghost"
                                   onClick={() => {
                                        location.pathname.includes("/courses")
                                             ? null
                                             : navigate("/courses");
                                   }}
                                   className="text-[14px] md:text-[16px] font-medium hover:text-blue-600 bg-amber-50"
                              >
                                   Explore Courses
                              </Button>
                         </div>
                         <div className="flex items-center space-x-1 cursor-pointer">
                              <Button
                                   variant="ghost"
                                   onClick={() => navigate("/student-courses")}
                                   className="text-[14px] md:text-[16px] font-medium hover:text-blue-600 bg-amber-50"
                              >
                                   My Courses
                              </Button>
                         </div>
                         {/* <div
                              onClick={() => navigate("/student-courses")}
                              className="flex cursor-pointer items-center gap-3"
                         >
                              <span className=" md:text-xl text-[10px]">
                                   My Courses
                              </span>
                              <TvMinimalPlay className="w-6 h-6 cursor-pointer" />
                         </div> */}
                         <Button className="bg-red-600 hover:bg-red-800" onClick={handleLogout}>Sign Out</Button>
                    </div>
               </div>
          </header>
     );
}

export default StudentViewCommonHeader;