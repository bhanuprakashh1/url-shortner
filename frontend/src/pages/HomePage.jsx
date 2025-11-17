import React from 'react'
import UrlForm from '../components/UrlForm'

const HomePage = () => {
    return (
        <div className="h-full bg-gradient-to-br from-black via-[#111] to-gray-900 flex flex-col items-center justify-center p-4">

            <div className="bg-[#1a1a1a]/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-gray-800 w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
                    URL Shortener
                </h1>

                <UrlForm />
            </div>

        </div>
    )
}

export default HomePage
