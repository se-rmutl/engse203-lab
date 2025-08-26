import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [term, setTerm] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(term);
    };

    return (
        <form id="search-form" onSubmit={handleSubmit}>
            <input
                type="text"
                id="search-input"
                placeholder="e.g., Chicken, Pasta, Thai..."
                value={term}
                onChange={(e) => setTerm(e.target.value)}
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchBar;