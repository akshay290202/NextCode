import { courseCategories } from "@/config";
import banner from "/banner.png"
import { Button } from "@/components/ui/button";
import { useContext, useEffect } from "react";
import { StudentContext } from "@/context/student-context";
import {
     checkCoursePurchaseInfoService,
     fetchStudentViewCourseListService,
} from "@/services";
import { AuthContext } from "@/context/auth-context";
import { useNavigate } from "react-router-dom";
import Carousel from "@/components/common-form/carousel";
import StudentViewCommonFooter from "@/components/student-view/footer";

function StudentHomePage() {
     const { studentViewCoursesList, setStudentViewCoursesList } =
          useContext(StudentContext);
     const { auth } = useContext(AuthContext);
     const navigate = useNavigate();

     function handleNavigateToCoursesPage(getCurrentId) {
          // console.log(getCurrentId);
          sessionStorage.removeItem("filters");
          const currentFilter = {
               category: [getCurrentId],
          };

          sessionStorage.setItem("filters", JSON.stringify(currentFilter));

          navigate("/courses");
     }

     // console.log(studentViewCoursesList);
     
     async function fetchAllStudentViewCourses() {
          const response = await fetchStudentViewCourseListService();
          if (response?.success) setStudentViewCoursesList(response?.data);

     }

     async function handleCourseNavigate(getCurrentCourseId) {
          const response = await checkCoursePurchaseInfoService(
               getCurrentCourseId,
               auth?.user?._id
          );

          if (response?.success) {
               if (response?.data) {
                    navigate(`/course-progress/${getCurrentCourseId}`);
               } else {
                    navigate(`/course/details/${getCurrentCourseId}`);
               }
          }
     }

     useEffect(() => {
          fetchAllStudentViewCourses();
     }, []);

     return (
          <div className="min-h-screen bg-white">
               <section className="flex flex-col lg:flex-row items-center justify-between py-8 px-4 lg:px-8">
                    <div className="lg:w-1/2 lg:pr-12 p-2">
                         <h1 className="text-4xl font-bold mb-4">NextCode - Learning that gets you moving !</h1>
                         <p className="text-l">
                              Unlock your career potential with our expert-led courses designed to help you ace placement
                              interviews and master coding. Whether you're an aspiring software
                              developer or preparing for your dream job, our comprehensive training programs provide the
                              skills and confidence you need to succeed.
                         </p>
                         <p></p>
                         <p className="mt-1">
                              Join us and take the first step towards securing your future in software development.
                         </p>
                    </div>
                    <div className="lg:w-full mb-8 lg:mb-0">
                         
                         <Carousel/>
                         {/* <img
                              src={banner}
                              width={600}
                              height={300}
                              className="w-full h-auto rounded-lg shadow-lg"
                         /> */}
                    </div>
               </section>
               <section className="py-8 px-4 lg:px-8 bg-gray-100">
                    <h2 className="text-2xl font-bold mb-6">Course Categories</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                         {courseCategories.map((categoryItem) => (
                              <Button
                                   className="justify-start"
                                   variant="outline"
                                   key={categoryItem.id}
                                   onClick={() => handleNavigateToCoursesPage(categoryItem.id)}
                              >
                                   {categoryItem.label}
                              </Button>
                         ))}
                    </div>
               </section>
               <section className="py-12 px-4 lg:px-8">
                    <h2 className="text-2xl font-bold mb-6">Featured Courses</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                         {studentViewCoursesList && studentViewCoursesList.length > 0 ? (
                              studentViewCoursesList.map((courseItem) => (
                                   <div
                                        onClick={() => handleCourseNavigate(courseItem?._id)}
                                        className="border rounded-lg overflow-hidden shadow cursor-pointer"
                                   >
                                        <img
                                             src={courseItem?.image}
                                             width={300}
                                             height={150}
                                             className="w-full h-40 object-cover"
                                        />
                                        <div className="p-4">
                                             <h3 className="font-bold mb-1 text-lg">{courseItem?.title}</h3>
                                             <p className="text-sm text-gray-700 font-semibold font-sans">
                                                  {courseItem?.instructorName.substr(0,1).toUpperCase()}{courseItem?.instructorName.substr(1)}
                                             </p>
                                        </div>
                                        <div className="font-semibold text-white text-[16px] p-2 font-sans text-lg text-center rounded-md bg-blue-700 hover:bg-blue-800 ">
                                             $ {courseItem?.pricing}
                                        </div>
                                   </div>
                              ))
                         ) : (
                              <h1>No Courses Found</h1>
                         )}
                    </div>
               </section>
          </div>
     );
}

export default StudentHomePage;