import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AuthContext } from "@/context/auth-context";
import { StudentContext } from "@/context/student-context";
import { fetchStudentBoughtCoursesService } from "@/services";
import { Watch } from "lucide-react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function StudentCoursesPage() {
     const { auth } = useContext(AuthContext);
     const { studentBoughtCoursesList, setStudentBoughtCoursesList } =
          useContext(StudentContext);
     const navigate = useNavigate();

     async function fetchStudentBoughtCourses() {
          const response = await fetchStudentBoughtCoursesService(auth?.user?._id);
          if (response?.success) {
               setStudentBoughtCoursesList(response?.data);
          }
          // console.log(response);
     }
     useEffect(() => {
          fetchStudentBoughtCourses();
     }, []);

     return (
          <div className="p-4 min-h-screen">
               <h1 className="text-4xl w-full text-center font-bold mb-8">My Courses</h1>
               {studentBoughtCoursesList && studentBoughtCoursesList.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">

                         {studentBoughtCoursesList.map((course) => (
                              <Card key={course.id} className="flex flex-col">
                                   <CardContent className="p-4 flex-grow">
                                        <img
                                             src={course?.courseImage}
                                             alt={course?.title}
                                             className="h-52 w-full object-cover rounded-md mb-4"
                                        />
                                        <h3 className="font-bold mb-1 pl-1">{course?.title.toUpperCase()}</h3>
                                        <p className="text-sm text-gray-700 mb-2 pl-1">
                                             {course?.instructorName.substr(0,1).toUpperCase()}{course?.instructorName.substr(1)}
                                        </p>
                                   </CardContent>
                                   <CardFooter>
                                        <Button
                                             onClick={() =>
                                                  navigate(`/course-progress/${course?.courseId}`)
                                             }
                                             className="flex-1 bg-blue-700 hover:bg-blue-800"
                                        >
                                             <Watch className="mr-2 h-4 w-4" />
                                             Start Watching
                                        </Button>
                                   </CardFooter>
                              </Card>
                         ))
                         }
                    </div>
               ) : (
                    <div className="text-3xl font-semibold flex w-full text-center justify-center items-center pt-5">No Courses found</div>
               )}
          </div>
     );
}

export default StudentCoursesPage;