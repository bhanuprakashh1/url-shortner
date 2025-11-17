import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../store/slice/authSlice';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/auth", { replace: true });
    };

    return (
        <nav className="bg-gradient-to-br from-black via-[#0f0f0f] to-gray-900 backdrop-blur-md border-b border-gray-800 shadow-lg">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">

                    <Link
                        to={isAuthenticated ? "/dashboard" : "/"}
                        className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text"
                    >
                        URL Shortener
                    </Link>

                    {!isAuthenticated ? (
                        <Link
                            to="/auth"
                            className="px-4 py-2 rounded-md text-sm font-medium bg-gradient-to-r from-purple-500 to-blue-500 
                            hover:opacity-90 text-white shadow-md transition"
                        >
                            Login
                        </Link>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 rounded-md text-sm font-medium bg-red-600 
                            hover:bg-red-700 text-white shadow-md transition"
                        >
                            Logout
                        </button>
                    )}

                </div>
            </div>
        </nav>
    );
};

export default Navbar;
