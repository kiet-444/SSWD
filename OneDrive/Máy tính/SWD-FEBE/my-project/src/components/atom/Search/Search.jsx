// src/components/Search.js
import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
        className="px-4 py-2 border rounded"
      />
      <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">
        Search
      </button>
    </form>
  );
};

export default Search;
