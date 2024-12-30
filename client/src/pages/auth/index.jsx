import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CommonForm from '@/components/common-form'
import { signInFromControls, signUpFromControls } from '@/config'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useContext } from 'react'
import { AuthContext } from '@/context/auth-context'

const AuthPage = () => {
    const [activeTab, setActiveTab] = useState('signin');
    const { signInFormData, setsignInFormData,
        signUpFormData, setsignUpFormData, handleRegisterUser, handleLoginUser } = useContext(AuthContext);

    function handleTabChange(value) {
        setActiveTab(value);
    };

    function checkIfSignInFormIsValid() {
        return (signInFormData && signInFormData.userEmail !== '' && signInFormData.password !== '');
    };

    function checkIfSignUpFormIsValid() {
        return (signUpFormData && signUpFormData.userName !== '' &&
            signUpFormData.userEmail !== ''
            && signUpFormData.password !== '');
    };

    // console.log(signUpFormData);


    return (
        <div className="flex flex-col min-h-screen">
            <header className='px-4 lg:px-6 h-14 flex items-center border-b bg-amber-50'>
                <Link to={'/'} className='flex items-center justify-center'>
                    <img src={logo} className='h-12 w-12 mr-2' alt='logo.png' />
                    <span className='font-extrabold text-xl'>NextCode</span>
                </Link>
            </header>
            <div className="flex items-center justify-center min-h-screen bg-background">
                <Tabs value={activeTab} defaultValue="signin" onValueChange={handleTabChange} className='w-full max-w-md'>
                    <TabsList className='grid w-full grid-cols-2'>
                        <TabsTrigger value='signin'>Sign In</TabsTrigger>
                        <TabsTrigger value='signup'>Sign Up</TabsTrigger>
                    </TabsList>

                    <TabsContent value='signin'>
                        <Card className='p-6 space-y-4'>
                            <CardHeader>
                                <CardTitle className='flex justify-center items-center'>
                                    Sign in to your Account
                                </CardTitle>
                                <CardDescription className='flex justify-center items-center'>
                                    Enter your email and password
                                    to access your account
                                </CardDescription>
                            </CardHeader>
                            <CardContent className='space-y-2'>
                                <CommonForm formControls={signInFromControls}
                                    formData={signInFormData}
                                    setFormData={setsignInFormData}
                                    buttonText={'Sign In'}
                                    isButtonDisabled={!checkIfSignInFormIsValid()}
                                    handleSubmit={handleLoginUser}
                                />
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value='signup'>
                        <Card className='p-6 space-y-4'>
                            <CardHeader>
                                <CardTitle className='flex justify-center items-center'>
                                    Create a new account
                                </CardTitle>
                                <CardDescription className='flex justify-center items-center'>
                                    Enter your details to get started
                                </CardDescription>
                            </CardHeader>
                            <CardContent className='space-y-2'>
                                <CommonForm formControls={signUpFromControls}
                                    formData={signUpFormData}
                                    setFormData={setsignUpFormData}
                                    buttonText={'Sign Up'}
                                    isButtonDisabled={!checkIfSignUpFormIsValid()}
                                    handleSubmit={handleRegisterUser}
                                />
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

export default AuthPage