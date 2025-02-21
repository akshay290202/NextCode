import { GraduationCap, TvMinimalPlay } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useContext } from "react";
import logo from "../../assets/logo.png";
import { AuthContext } from "@/context/auth-context";
import toast from "react-hot-toast";

function StudentViewCommonHeader() {
  const navigate = useNavigate();
  const { resetCredentials, auth } = useContext(AuthContext);

  function handleLogout() {
    resetCredentials();
    sessionStorage.clear();
    toast.success("Logout success !");
  }

  return (
    <header className="flex items-center justify-between p-2 border-b relative bg-white ">
      <div className="flex items-center space-x-4">
        <Link to="/home" className="flex items-center hover:text-black">
          <img src={logo} className="h-12 w-14 mr-2" alt="logo.png" />
          <span className="font-extrabold md:text-xl text-[14px]">
            NextCode
          </span>
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex gap-4 items-center">
          {auth.authenticate === true ? (
            <>
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  onClick={() => {
                    location.pathname.includes("/courses")
                      ? null
                      : navigate("/courses");
                  }}
                  className="text-[14px] md:text-[16px] font-medium hover:text-blue-600 bg-white"
                >
                  Explore Courses
                </Button>
              </div>
              <div className="flex items-center space-x-1 cursor-pointer">
                <Button
                  variant="ghost"
                  onClick={() => navigate("/student-courses")}
                  className="text-[14px] md:text-[16px] font-medium hover:text-blue-600 bg-white"
                >
                  My Courses
                </Button>
              </div>
              <Button
                className="bg-red-600 hover:bg-red-800"
                onClick={handleLogout}
              >
                Sign Out
              </Button>
            </>
          ) : null}
        </div>
      </div>
    </header>
  );
}

export default StudentViewCommonHeader;
