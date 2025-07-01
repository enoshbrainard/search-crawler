"use client";
import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [depth, setdepth] = useState(2);
  const [results, setresults] = useState([]);
  const [loading, setloading] = useState(false);

  const handleclick = async () => {
    if (!query.trim()) return;
    setloading(true);
    try {
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/api/search?query=${encodeURIComponent(query)}&depth=${depth}`
      );
      const data = await res.json();
      setresults(data);
    } catch (e) {
      console.error("Error:", e.message);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-start px-4 pt-16">
      <h1 className="text-3xl font-bold mb-6 text-center">Web Crawler</h1>

      <div className="w-full max-w-xl">
        <input
          className="w-full p-3 mb-4 rounded-lg border border-gray-600 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Type your search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
          onClick={handleclick}
        >
          🔍 Search
        </button>
      </div>

      {loading && (
        <div className="flex items-center justify-center mt-6">
          <div className="w-6 h-6 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-3 text-blue-300">Crawling links...</span>
        </div>
      )}

      <div className="mt-8 w-full max-w-2xl space-y-4">
        {!loading &&
          results.map((item, index) => (
            <div
              key={index}
              className="p-4 bg-gray-800 rounded-lg shadow hover:shadow-md transition duration-200"
            >
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline break-all"
              >
                {item.title || item.url}
              </a>
            </div>
          ))}
      </div>
    </div>
  );
}
