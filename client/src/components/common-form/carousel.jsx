import { StudentContext } from "@/context/student-context";
import { useContext, useState } from "react";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";
export default function Carousel() {
    const { studentViewCoursesList, setStudentViewCoursesList } =useContext(StudentContext);
    let [current, setCurrent] = useState(0);
  
    
  
    
  let previousSlide = () => {
    if (current === 0) setCurrent(studentViewCoursesList.length - 1);
    else setCurrent(current - 1);
  };

  let nextSlide = () => {
    if (current === studentViewCoursesList.length - 1) setCurrent(0);
    else setCurrent(current + 1);
  };

  setTimeout(() => {
    if (current === studentViewCoursesList.length - 1) setCurrent(0);
    else setCurrent(current + 1);
  }, 1500);

  return (
    <div className="overflow-hidden relative rounded">
      <div
        className={`flex transition ease-out duration-50`}
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {studentViewCoursesList.map((s) => {
          return <img src={s.image} key={s.id}/>;
        })}
      </div>

      {/* <div className="absolute top-0 h-full w-full justify-between items-center flex text-white px-10 text-3xl">
        <button onClick={previousSlide} className="bg-transparent">
          <BsFillArrowLeftCircleFill />
        </button>
        <button onClick={nextSlide} className="bg-transparent">
          <BsFillArrowRightCircleFill />
        </button>
      </div>

      <div className="absolute bottom-0 py-4 flex justify-center gap-3 w-full">
        {studentViewCoursesList.map((s, i) => {
            // console.log(i);
            
          return (
            <div
              onClick={() => {
                setCurrent(i);
              }}
              key={"circle" + i}
              className={`rounded-full w-2 h-2 cursor-pointer  ${
                i == current ? "bg-white" : "bg-gray-500"
              }`}
            ></div>
          );
        })}
      </div> */}
    </div>
  );
}