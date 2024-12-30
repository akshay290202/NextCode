import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { courseCurriculumInitialFormData, courseLandingInitialFormData } from '@/config'
import { InstructorContext } from '@/context/instructor-context'
import { Delete, Edit } from 'lucide-react'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

const InstructorCourses = ({ listOfCourses }) => {

     const navigate = useNavigate();
     const { setCurrentEditedCourseId, setCourseLandingFormData,
          setCourseCurriculumFormData, } =
          useContext(InstructorContext);


     return (
          <Card>
               <CardHeader className="flex justify-between flex-row items-center">
                    <CardTitle className='font-3xl font-bold text-lg'>All Courses</CardTitle>
                    <Button className='p-6' onClick={() => {
                         setCurrentEditedCourseId(null);
                         navigate('/instructor/create-new-course');
                         setCourseLandingFormData(courseLandingInitialFormData);
                         setCourseCurriculumFormData(courseCurriculumInitialFormData);
                    }}>
                         Create New Course
                    </Button>
               </CardHeader>
               <CardContent>
                    <div className="overflow-x-auto ">
                         <Table>
                              <TableHeader>
                                   <TableRow>
                                        <TableHead >Course</TableHead>
                                        <TableHead>Students</TableHead>
                                        <TableHead>Revenue</TableHead>
                                        <TableHead className="text-center">Actions</TableHead>
                                   </TableRow>
                              </TableHeader>
                              <TableBody>
                                   {
                                        listOfCourses && listOfCourses.length > 0 ?
                                             listOfCourses.map((course) =>
                                                  <TableRow>
                                                       <TableCell className="font-medium">{course?.title}</TableCell>
                                                       <TableCell>{course?.students?.length}</TableCell>
                                                       <TableCell>{course?.pricing}</TableCell>
                                                       <TableCell className="text-center">
                                                            <Button variant="ghost" size="sm" onClick={() => {
                                                                 navigate(`/instructor/edit-course/${course?._id}`);
                                                            }}>
                                                                 <Edit className='h-6 w-6' />
                                                            </Button>

                                                            {/* <Button variant="ghost" size="sm">
                                                                 <Delete className='h-6 w-6' />
                                                            </Button> */}
                                                       </TableCell>
                                                  </TableRow>
                                             ) : null
                                   }

                              </TableBody>
                         </Table>

                    </div>
               </CardContent>
          </Card>
     )
}

export default InstructorCourses