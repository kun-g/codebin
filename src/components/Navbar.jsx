import React from 'react';
import { resources } from '../data/resources';

const Navbar = ({ query, setQuery }) => {
  return (
    <header className="navbar">
      <div className="logo">
        <h1>开发者资源导航</h1>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="搜索资源..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <nav className="nav-links">
        {resources.map((category, index) => (
          <a key={index} href={`#${category.category.toLowerCase().replace(/\s+/g, '-')}`}>
            {category.category}
          </a>
        ))}
      </nav>
    </header>
  );
};

export default Navbar; 