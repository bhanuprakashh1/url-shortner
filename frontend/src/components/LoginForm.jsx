import React, { useState } from 'react';
import { loginUser } from '../api/user.api';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/slice/authSlice.js';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ state }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const auth = useSelector((state) => state.auth)

    const handleSubmit = async () => {
        setLoading(true);
        setError('');

        try {
            const data = await loginUser(password, email);
            dispatch(login(data.user))
            navigate("/dashboard", { replace: true });
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setError(err.message || 'Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="w-full max-w-md mx-auto mt-10">
            <div className="bg-black/40 backdrop-blur-xl border border-zinc-800 rounded-2xl p-8 shadow-xl">

                <h2 className="text-3xl font-bold text-center mb-6 text-blue-400">Login to Your Account</h2>

                {error && (
                    <div className="mb-4 p-3 bg-red-900/40 text-red-300 border border-red-700 rounded-md">
                        {error}
                    </div>
                )}

                <div className="mb-4">
                    <label className="block text-gray-300 text-sm font-semibold mb-2">Enter your email</label>
                    <input
                        className="bg-zinc-900 border border-zinc-700 text-gray-200 rounded-lg w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                        type="email"
                        placeholder="Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-300 text-sm font-semibold mb-2">Enter your password</label>
                    <input
                        className="bg-zinc-900 border border-zinc-700 text-gray-200 rounded-lg w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                        type="password"
                        placeholder="Your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className={`w-full py-2.5 rounded-lg text-white font-semibold transition-all duration-200 shadow-md cursor-pointer
                        ${loading
                            ? 'bg-blue-800 opacity-50 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 hover:shadow-[0_0_10px_rgba(0,122,255,0.6)]'
                        }`}
                >
                    {loading ? 'Signing in...' : 'Sign In'}
                </button>

                <p className="text-center mt-4 text-sm text-gray-400">
                    Don't have an account?{" "}
                    <span
                        onClick={() => state(false)}
                        className="text-blue-400 hover:text-blue-300 cursor-pointer"
                    >
                        Register
                    </span>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;
