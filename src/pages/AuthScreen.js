import React, { useState } from 'react';
import { FaBook } from 'react-icons/fa';
import SignUpForm from '../components/SignUpForm';
import SignInForm from '../components/SignInForm';

const AuthScreen = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => {
    setIsSignUp((prevState) => !prevState);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="bg-indigo-600 p-4 rounded-lg flex items-center">
            <FaBook className="h-8 w-8 text-white" />
            <h2 className="ml-2 text-2xl font-bold text-white">BookAdvisor</h2>
          </div>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {isSignUp ? <SignUpForm /> : <SignInForm />}
          
          <div className="mt-6">
            <button
              onClick={toggleForm}
              className="w-full flex justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen; 