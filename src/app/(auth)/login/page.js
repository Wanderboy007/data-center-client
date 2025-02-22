"use client"
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaUser, FaLock } from 'react-icons/fa';

const LoginPage = () => {
    const router = useRouter()

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const username = formData.get('username');
        const password = formData.get('password');

        // Perform login logic here (e.g., API call, validation)
        if (username === "admin" && password === "admin123") {
            router.push("./overview");
        }

        // Example: Redirect or show success message
        // alert(`Logged in as ${username}`);
    };

    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="bg-[#2A3E6F] p-8 rounded-lg shadow-md w-full max-w-md min-h-[450px] flex flex-col justify-center">
                <h1 className="text-5xl font-bold mb-3 text-white tracking-wider text-center">DataCenter</h1>
                <h2 className="text-3xl font-bold mb-10 text-white text-center">Login</h2>
                <form onSubmit={handleSubmit}>

                    <div className="mb-4">
                        <div className="relative mt-1">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaUser className="h-4 w-4 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your username"
                                required
                            />
                        </div>
                    </div>


                    <div className="mb-6">
                        <div className="relative mt-1">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaLock className="h-4 w-4 text-gray-400" /> {/* Lock Icon */}
                            </div>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                    </div>

                    {/* Login Button */}
                    <div className="flex justify-center items-center">
                        <button
                            type="submit"
                            className="w-full max-w-xs bg-white text-black py-1.5 px-4 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Login
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default LoginPage;