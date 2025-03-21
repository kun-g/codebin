import React from 'react';
import ResourceCard from './ResourceCard';

const CategorySection = ({ category, items }) => {
  return (
    <section className="category-section" id={category.toLowerCase().replace(/\s+/g, '-')}>
      <h2>{category}</h2>
      <div className="resources-grid">
        {items.map((resource, index) => (
          <ResourceCard key={index} resource={resource} />
        ))}
      </div>
    </section>
  );
};

export default CategorySection; 