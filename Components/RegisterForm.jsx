"use client";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link"
import { useState } from "react";
export default function Register() {
    const [first_name, setFirst_name] = useState('')
    const [last_name, setLast_name] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setconfirmPassword]=useState('')
    const [error, setError] = useState("")

    const checkPasswordStrength=(password)=>{
        const containsUpperCase = /[A-Z]/.test(password);
        const containsLowerCase = /[a-z]/.test(password);
        const containsNumbers = /[0-9]/.test(password);
        const containsSpecialChars = /[^A-Za-z0-9]/.test(password);
        const isLengthValid = password.length >= 8;
    
        return isLengthValid && containsUpperCase && containsLowerCase && containsNumbers && containsSpecialChars;
      };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const all_data = {
            first_name,
            last_name,
            email,
            password
        }


        if (!first_name || !last_name || !email || !password || !confirmPassword) {
            setError("all fields are required")
            toast.error(error);
            return;
        }
        if(password != confirmPassword){
            setError('Password Mismatch')
            toast.error(error);
            return;
        }
        if (!checkPasswordStrength(password)) {
            toast.error('Password is not strong enough. It must contain at least 8 characters including uppercase, lowercase, numbers, and special characters.');
            return;
          }
        
        try {
            const res = await fetch("http://localhost:5050/api/v1/authentication/register", {
                method: "POST",
                body: JSON.stringify(all_data),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (res.status == 200) {
                const form = e.target;
                form.reset();
                // Redirect or handle success scenario as needed
                window.location.href = "/";
            }
            else {
                setError("All fields are Required");


                // Handle failure scenario
            }
        } catch (error) {
            console.log("error", error);

            // Handle error scenario
        }

        console.log(all_data)
    }


    return <div className="flex items-center min-h-screen p-4 bg-gray-100 lg:justify-center">
        <div
            className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md"
        >
            <div
                className="p-4 py-6 text-white bg-green-500 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly"
            >
                <div className="my-3 text-4xl font-bold tracking-wider text-center">
                    <a href="#">SANDBOX</a>
                </div>
                <p className="mt-6 font-normal text-center text-gray-300 md:mt-0">
                    With the power of K-WD, you can now focus only on functionaries for your digital products, while leaving the
                    UI design on us!
                </p>
                <p className="flex flex-col items-center justify-center mt-10 text-center">
                    <span>Have an account?</span>
                    <a href="/" className="underline">Get Started!</a>
                </p>
                <p className="mt-6 text-sm text-center text-gray-300">
                    Read our <a href="#" className="underline">terms</a> and <a href="#" className="underline">conditions</a>
                </p>
            </div>
            <ToastContainer
             position="top-center"
             theme='dark'
        toastStyle={{ fontSize: '14px', borderRadius: '8px' }}
        progressStyle={{ background: 'green' }}
      />
            <div className="p-5 bg-white md:flex-1 text-center">
                <h3 className="my-4 text-2xl font-semibold text-gray-700">Account Creation</h3>

                <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
                    <div className="flex flex-col space-y-1">
                        <label htmlFor="first_name" className="text-sm font-semibold text-gray-500">First Name</label>
                        <input onChange={e => setFirst_name(e.target.value)} placeholder="First Name"
                            type="text"
                            id="first_name"
                            autoFocus
                            className="px-4 py-2 transition duration-300 border-b border-green-500 rounded focus:outline-none focus:border-green-700"
                        />
                    </div>
                    <div className="flex flex-col space-y-1">
                        <label htmlFor="last_name" className="text-sm font-semibold text-gray-500">Last Name</label>

                        <input onChange={e => setLast_name(e.target.value)} placeholder="Last Name"
                            type="text"
                            id="last_name"
                            autoFocus
                            className="px-4 py-2 transition duration-300 border-b border-green-500 rounded focus:outline-none focus:border-green-700"
                        />
                    </div>
                    <div className="flex flex-col space-y-1">

                        <label htmlFor="email" className="text-sm font-semibold text-gray-500">Email address</label>
                        <input onChange={e => setEmail(e.target.value)} placeholder="Email"
                            type="email"
                            id="email"
                            autoFocus
                            className="px-4 py-2 transition duration-300 border-b border-green-500 rounded focus:outline-none focus:border-green-700"
                        />
                    </div>
                    <div className="flex flex-col space-y-1">
                        <label htmlFor="password" className="text-sm font-semibold text-gray-500">Password</label>
                        <input onChange={e => setPassword(e.target.value)} placeholder="Password"
                            type="password"
                            id="password"
                            className="px-4 py-2 transition duration-300 border-b border-green-500 rounded focus:outline-none focus:border-green-700"
                        />
                    </div>
                    <div className="flex flex-col space-y-1">
                        <label htmlFor="password" className="text-sm font-semibold text-gray-500">Confirm Password</label>
                        <input onChange={e => setconfirmPassword(e.target.value)} placeholder="Confirm Password"
                            type="password"
                            id="confirmPassword"
                            className="px-4 py-2 transition duration-300 border-b border-green-500 rounded focus:outline-none focus:border-green-700"
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="remember"
                            className="w-4 h-4 transition duration-300 rounded focus:ring-2 focus:ring-offset-0 focus:outline-none focus:ring-blue-200"
                        />
                        <label htmlFor="remember" className="text-sm font-semibold text-gray-500">Remember me</label>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-green-500 rounded-lg shadow hover:bg-green-700 focus:outline-none focus:ring-blue-200 focus:ring-4"
                        >
                            Register
                        </button>
                    </div>
                    {/* <div className="flex flex-col space-y-5">
            <span className="flex items-center justify-center space-x-2">
              <span className="h-px bg-gray-400 w-14"></span>
              <span className="font-normal text-gray-500">or login with</span>
              <span className="h-px bg-gray-400 w-14"></span>
            </span>
            <div className="flex flex-col space-y-4">
              <a
                href="#"
                className="flex items-center justify-center px-4 py-2 space-x-2 transition-colors duration-300 border border-gray-800 rounded-md group hover:bg-gray-800 focus:outline-none"
              >
                <span>
                  <svg
                    className="w-5 h-5 text-gray-800 fill-current group-hover:text-white"
                    viewBox="0 0 16 16"
                    version="1.1"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                    ></path>
                  </svg>
                </span>
                <span className="text-sm font-medium text-gray-800 group-hover:text-white">Github</span>
              </a>
              <a
                href="#"
                className="flex items-center justify-center px-4 py-2 space-x-2 transition-colors duration-300 border border-blue-500 rounded-md group hover:bg-blue-500 focus:outline-none"
              >
                <span>
                  <svg className="text-blue-500 group-hover:text-white" width="20" height="20" fill="currentColor">
                    <path
                      d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"
                    ></path>
                  </svg>
                </span>
                <span className="text-sm font-medium text-blue-500 group-hover:text-white">Twitter</span>
              </a>
            </div>
          </div> */}
                </form>
            </div>
        </div>
    </div>
}








