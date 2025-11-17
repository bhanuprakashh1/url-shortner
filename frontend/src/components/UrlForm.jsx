import React, { useState } from 'react';
import { createShortUrl } from '../api/shortUrl.api';
import { useSelector } from 'react-redux';

const UrlForm = ({ onUrlCreated }) => {
    const [url, setUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState(null);
    const [customSlug, setCustomSlug] = useState("");

    const { isAuthenticated } = useSelector((state) => state.auth);

    const handleSubmit = async () => {
        try {
            const shortUrl = await createShortUrl(url, customSlug);
            setShortUrl(shortUrl);

            // Notify UserUrl to refresh instantly
            window.dispatchEvent(new Event("url-added"));

            setError(null);
        } catch (err) {
            setError(err.message);
        }
    };


    const handleCopy = () => {
        navigator.clipboard.writeText(shortUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-5">

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                    Enter your URL
                </label>
                <input
                    type="url"
                    value={url}
                    onInput={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full px-4 py-2 rounded-md bg-[#111] border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
            </div>

            <button
                onClick={handleSubmit}
                className="w-full py-2 px-4 rounded-md text-white font-medium bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 transition shadow-lg cursor-pointer"
            >
                Shorten URL
            </button>

            {error && (
                <div className="p-3 bg-red-600/30 text-red-300 rounded-md border border-red-700">
                    {error}
                </div>
            )}

            {isAuthenticated && (
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                        Custom URL (optional)
                    </label>
                    <input
                        type="text"
                        value={customSlug}
                        onChange={(e) => setCustomSlug(e.target.value)}
                        placeholder="example123"
                        className="w-full px-4 py-2 rounded-md bg-[#111] border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                </div>
            )}

            {shortUrl && (
                <div className="mt-6">
                    <h2 className="text-lg font-semibold text-gray-200 mb-2">
                        Your shortened URL:
                    </h2>

                    <div className="flex">
                        <input
                            readOnly
                            value={shortUrl}
                            className="flex-1 p-2 bg-[#111] border border-gray-700 text-gray-300 rounded-l-md"
                        />

                        <button
                            onClick={handleCopy}
                            className={`px-4 py-2 rounded-r-md transition ${copied
                                ? 'bg-green-600 text-white'
                                : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                                }`}
                        >
                            {copied ? 'Copied!' : 'Copy'}
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default UrlForm;
