import React, { useState, useEffect } from 'react';

interface SearchInputProps {
  onSearch: (query: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  const [input, setInput] = useState('');

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (input) {
        onSearch(input);
      }
    }, 800);

    return () => clearTimeout(delayDebounce);
  }, [input, onSearch]);

  return (
    <input
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Search for images..."
      aria-label="Search for images"
      className="w-full p-2 border border-gray-300 rounded"
    />
  );
};

export default SearchInput;
