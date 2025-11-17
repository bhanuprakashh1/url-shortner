import React, { useEffect, useState } from 'react';
import { getAllUserUrls } from '../api/user.api';

const UserUrl = () => {
    const [urls, setUrls] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState(null);
    const [copiedId, setCopiedId] = useState(null);

    const fetchUrls = async () => {
        try {
            setIsLoading(true);
            const response = await getAllUserUrls();
            setUrls(response.urls || []);
        } catch (err) {
            setIsError(true);
            setError(err);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch once on mount
    useEffect(() => {
        fetchUrls();

        // 🔥 Listen for URL creation event
        const listener = () => fetchUrls();
        window.addEventListener("url-added", listener);

        return () => window.removeEventListener("url-added", listener);
    }, []);

    const handleCopy = (url, id) => {
        navigator.clipboard.writeText(url);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center my-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="bg-red-900 border border-red-700 text-red-300 px-4 py-3 rounded my-4">
                Error loading your URLs: {error?.message}
            </div>
        );
    }

    if (!urls || urls.length === 0) {
        return (
            <div className="text-center text-gray-400 my-6 p-6 bg-zinc-900 rounded-lg border border-zinc-700">
                <svg className="w-12 h-12 mx-auto text-gray-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>

                <p className="text-lg font-medium">No URLs found</p>
                <p className="mt-1">You haven't created any shortened URLs yet.</p>
            </div>
        );
    }

    return (
        <div className="bg-black/40 backdrop-blur-xl border border-zinc-800 rounded-lg mt-8 shadow-xl overflow-hidden">
            <div className="overflow-x-auto h-60">
                <table className="min-w-full divide-y divide-zinc-800">
                    <thead className="bg-zinc-900">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Original URL</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Short URL</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Clicks</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="bg-black divide-y divide-zinc-800">
                        {[...urls].reverse().map((url) => (
                            <tr key={url._id} className="hover:bg-zinc-900 transition-colors duration-200">

                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-300 truncate max-w-xs">
                                        {url.full_url}
                                    </div>
                                </td>

                                <td className="px-6 py-4">
                                    <a
                                        href={`http://localhost:3000/${url.short_url}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-400 hover:text-blue-300 hover:underline"
                                    >
                                        {`localhost:3000/${url.short_url}`}
                                    </a>
                                </td>

                                <td className="px-6 py-4">
                                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-900 text-blue-300">
                                        {url.clicks} {url.clicks === 1 ? "click" : "clicks"}
                                    </span>
                                </td>

                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => handleCopy(`http://localhost:3000/${url.short_url}`, url._id)}
                                        className={`px-4 py-2 rounded-md text-xs font-medium shadow-md transition-all duration-200 cursor-pointer 
                                            ${copiedId === url._id
                                                ? "bg-green-600 text-white hover:bg-green-700"
                                                : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-[0_0_10px_rgba(0,122,255,0.6)]"
                                            }`}
                                    >
                                        {copiedId === url._id ? "Copied!" : "Copy URL"}
                                    </button>
                                </td>

                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default UserUrl;
