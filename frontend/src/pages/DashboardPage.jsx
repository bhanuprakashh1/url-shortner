import React, { useState } from 'react';
import UrlForm from '../components/UrlForm';
import UserUrl from '../components/UserUrl';

const DashboardPage = () => {
    const [refresh, setRefresh] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-[#0f0f0f] to-gray-900 flex flex-col items-center justify-start p-4">

            <div className="bg-[#1a1a1a]/80 backdrop-blur-xl p-8 mt-10 mb-10 rounded-2xl shadow-xl border border-gray-800 w-full max-w-5xl">

                <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
                    Dashboard
                </h1>

                <UrlForm onUrlCreated={() => setRefresh(!refresh)} />

                <div className="mt-10">
                    <UserUrl refresh={refresh} />
                </div>

            </div>

        </div>
    );
}

export default DashboardPage;

