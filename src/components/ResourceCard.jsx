import React from 'react';
import Link from 'next/link';

const ResourceCard = ({ resource }) => {
  return (
    <div className="resource-card">
      <h3>{resource.name}</h3>
      <p>{resource.description}</p>
      <Link href={resource.url} target="_blank" rel="noopener noreferrer">
        访问 →
      </Link>
    </div>
  );
};

export default ResourceCard; 