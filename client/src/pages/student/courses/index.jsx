import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
     DropdownMenu,
     DropdownMenuContent,
     DropdownMenuRadioGroup,
     DropdownMenuRadioItem,
     DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { filterOptions, sortOptions } from "@/config";
import { AuthContext } from "@/context/auth-context";
import { StudentContext } from "@/context/student-context";
import { checkCoursePurchaseInfoService, fetchStudentViewCourseListService } from "@/services";
import { ArrowUpDownIcon } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function createSearchParamsHelper(filterParams) {
     const queryParams = [];

     for (const [key, value] of Object.entries(filterParams)) {
          if (Array.isArray(value) && value.length > 0) {
               const paramValue = value.join(",");

               queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
          }
     }

     return queryParams.join("&");
}

function StudentViewCoursesPage() {
     const [sort, setSort] = useState("price-lowtohigh");
     const [filters, setFilters] = useState({});
     const [searchParams, setSearchParams] = useSearchParams();
     const {
          studentViewCoursesList,
          setStudentViewCoursesList,
          loadingState,
          setLoadingState,
     } = useContext(StudentContext);
     const navigate = useNavigate();
     const { auth } = useContext(AuthContext);

     function handleFilterOnChange(getSectionId, getCurrentOption) {
          let cpyFilters = { ...filters };
          const indexOfCurrentSeection =
               Object.keys(cpyFilters).indexOf(getSectionId);

          // console.log(indexOfCurrentSeection, getSectionId);
          if (indexOfCurrentSeection === -1) {
               cpyFilters = {
                    ...cpyFilters,
                    [getSectionId]: [getCurrentOption.id],
               };

               // console.log(cpyFilters);
          } else {
               const indexOfCurrentOption = cpyFilters[getSectionId].indexOf(
                    getCurrentOption.id
               );

               if (indexOfCurrentOption === -1)
                    cpyFilters[getSectionId].push(getCurrentOption.id);
               else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
          }

          // console.log(cpyFilters);
          
          setFilters(cpyFilters);
          sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
     }

     async function fetchAllStudentViewCourses(filters, sort) {
          const query = new URLSearchParams({
               ...filters,
               sortBy: sort,
          });
          // console.log(query);
          
          const response = await fetchStudentViewCourseListService(query);
          // console.log(response);
          
          if (response?.success) {
               setStudentViewCoursesList(response?.data);
               setLoadingState(false);
          }

          // console.log('last',filters);
          
     }

     async function handleCourseNavigate(getCurrentCourseId) {
          const response = await checkCoursePurchaseInfoService(
               getCurrentCourseId,
               auth?.user?._id
          );

          // console.log(response, 'handleCourseNavigate');

          if (response?.success) {
               if (response?.data) {
                    navigate(`/course-progress/${getCurrentCourseId}`);
               } else {
                    navigate(`/course/details/${getCurrentCourseId}`);
               }
          }
     }

     useEffect(() => {
          setSort("price-lowtohigh");
          setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
     }, []);

     useEffect(() => {
          // console.log(filters);
          const buildQueryStringForFilters = createSearchParamsHelper(filters);
          setSearchParams(new URLSearchParams(buildQueryStringForFilters));
          // console.log('4');
     }, [filters]);


     useEffect(() => {
          // console.log('last',filters);
          if (filters?.category){
               // console.log('last',filters);
               fetchAllStudentViewCourses(filters, sort);
          }
     }, [filters, sort]);

     

     return (
          <div className="container p-2 mx-auto">
               {/* <h5 className="text-3xl font-semibold mb-4">Filter By :</h5> */}

               <div className="flex flex-col md:flex-row gap-4 ">
                    <aside className="w-full md:w-64 space-y-4 rounded-sm p-2">

                         <div>
                              <div className="pr-4 pl-4 font-semibold pt-1">Filter Courses By :</div>
                              {Object.keys(filterOptions).map((ketItem) => (
                                   <div className="p-4 border-b ">
                                        <h3 className="font-bold mb-3">{ketItem[0].toUpperCase()}
                                             {ketItem.substring(1)}</h3>
                                        <div className="grid gap-2 mt-2">
                                             {filterOptions[ketItem].map((option) => (
                                                  <Label className="flex font-medium items-center gap-3">
                                                       <Checkbox
                                                            checked={
                                                                 filters &&
                                                                 Object.keys(filters).length > 0 &&
                                                                 filters[ketItem] &&
                                                                 filters[ketItem].indexOf(option.id) > -1
                                                            }
                                                            onCheckedChange={() =>
                                                                 handleFilterOnChange(ketItem, option)
                                                            }
                                                       />
                                                       {option.label}
                                                  </Label>
                                             ))}
                                        </div>
                                   </div>
                              ))}
                         </div>
                    </aside>
                    <main className="flex-1">
                         <div className="flex justify-end items-center mb-4 gap-5">
                              <DropdownMenu>
                                   <DropdownMenuTrigger asChild>
                                        <Button
                                             variant="outline"
                                             size="sm"
                                             className="flex items-center gap-2 p-5 "
                                        >
                                             <ArrowUpDownIcon className="h-4 w-4 " />
                                             <span className="text-[16px] font-medium ">Sort By</span>
                                        </Button>
                                   </DropdownMenuTrigger>
                                   <DropdownMenuContent align="end" className="w-[180px]">
                                        <DropdownMenuRadioGroup
                                             value={sort}
                                             onValueChange={(value) => setSort(value)}
                                        >
                                             {sortOptions.map((sortItem) => (
                                                  <DropdownMenuRadioItem
                                                       value={sortItem.id}
                                                       key={sortItem.id}
                                                  >
                                                       {sortItem.label}
                                                  </DropdownMenuRadioItem>
                                             ))}
                                        </DropdownMenuRadioGroup>
                                   </DropdownMenuContent>
                              </DropdownMenu>
                              {/* <span className="text-sm text-black font-bold">
                                   {studentViewCoursesList.length} Results
                              </span> */}
                         </div>
                         <div className="space-y-4">
                              {studentViewCoursesList && studentViewCoursesList.length > 0 ? (
                                   studentViewCoursesList.map((courseItem) => (
                                        <Card
                                             onClick={() => handleCourseNavigate(courseItem?._id)}
                                             className="cursor-pointer"
                                             key={courseItem?._id}
                                        >
                                             <CardContent className="flex gap-4 p-4">
                                                  <div className="w-48 h-32 flex-shrink-0">
                                                       <img
                                                            src={courseItem?.image}
                                                            className="w-full h-full object-cover rounded-sm"
                                                       />
                                                  </div>
                                                  <div className="flex-1">
                                                       <div className="text-xl mb-2 font-bold tracking-wide">
                                                            {courseItem?.title.toUpperCase()}
                                                       </div>
                                                       <p className="text-sm text-gray-600 mb-1">
                                                            Instructor{" : "}
                                                            <span className="font-semibold">
                                                            {courseItem?.instructorName.substr(0,1).toUpperCase()}{courseItem?.instructorName.substr(1)}
                                                            </span>
                                                       </p>
                                                       <p className="text-sm text-gray-600 mb-1">
                                                            Level{" : "}
                                                            <span className="font-semibold">
                                                                 {courseItem?.level[0].toUpperCase()}
                                                                 {courseItem?.level.substring(1)}
                                                            </span>
                                                       </p>
                                                       <p className="text-sm text-gray-600 mb-1">
                                                            Lectures{" : "}
                                                            <span className="font-semibold">
                                                                 {courseItem?.curriculum?.length}
                                                            </span>
                                                       </p>
                                                       <p className="font-bold text-lg">
                                                            $ {courseItem?.pricing}
                                                       </p>
                                                  </div>
                                             </CardContent>
                                        </Card>
                                   ))
                              ) : loadingState ? (
                                   <Skeleton />
                              ) : (
                                   <div className="flex flex-col items-center justify-center ">
                                        <h2 className="font-bold text-4xl">No Courses Found</h2>
                                        <div className="mt-1">We will be adding some soon ... !!!</div>
                                   </div>
                              )}
                         </div>
                    </main>
               </div>
          </div>
     );
}

export default StudentViewCoursesPage;