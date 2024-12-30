import { Skeleton } from "@/components/ui/skeleton";
import { initialSignInFormData, initialSignUpFormData } from "@/config";
import { checkAuthService, loginService, registerService } from "@/services/index";
import { createContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
     const [signInFormData, setsignInFormData] = useState(initialSignInFormData);
     const [signUpFormData, setsignUpFormData] = useState(initialSignUpFormData);
     const [auth, setAuth] = useState({
          authenticate: false,
          user: null,
     });

     const [loading, setLoading] = useState(true);
     const navigate = useNavigate();

     async function handleRegisterUser(event) {
          event.preventDefault();
          try {
               const data = await registerService(signUpFormData);
               console.log(data);

               if (data.success) {
                    toast.success('Sign up successful !');
               }
               else {
                    toast.error(data?.message);
               }
          }
          catch (err) {
               // console.log(err);
               toast.error(err?.response?.data?.message);
          }
     }

     async function handleLoginUser(event) {
          event.preventDefault();
          try {
               const data = await loginService(signInFormData);
               if (data.success) {
                    sessionStorage.setItem('accessToken', JSON.stringify(data.data.accessToken))
                    setAuth({
                         authenticate: true,
                         user: data.data.user
                    })

                    toast.success('Login successful !');
               }
               else {
                    setAuth({
                         authenticate: false,
                         user: null,
                    })
                    // console.log(data, 'data');
                    toast.error('something went wrong');
               }
          }
          catch (err) {
               // console.log(err, 'err');
               toast.error(err?.response?.data?.message);
          }
     }

     // check Auth user

     async function checkAuthUser() {
          try {
               const data = await checkAuthService();
               if (data.success) {
                    setAuth({
                         authenticate: true,
                         user: data.data.user
                    });
                    setLoading(false);
               }
               else {
                    setAuth({
                         authenticate: false,
                         user: null,
                    });
                    setLoading(false);
               }
          } catch (error) {
               console.log(error);
               if (!error?.response?.data?.success) {
                    setAuth({
                         authenticate: false,
                         user: null,
                    });
                    setLoading(false);
               }
          }
     }

     function resetCredentials() {
          setAuth({
               authenticate: false,
               user: null,
          });
     }

     useEffect(() => {
          checkAuthUser();
     }, [])


     return (<AuthContext.Provider value={{
          signInFormData, setsignInFormData,
          signUpFormData, setsignUpFormData,
          handleRegisterUser, handleLoginUser,
          auth, resetCredentials
     }}>
          {
               loading ? <Skeleton /> : children
          }
     </AuthContext.Provider>)

}

