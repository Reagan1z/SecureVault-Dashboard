import React, { useMemo } from 'react';
import { useFiles } from '../context/FileContext';
import { findPath } from '../utils/treeUtils';
import data from '../../data.json';

const Breadcrumbs = () => {
  const { selectedItem } = useFiles();

  const path = useMemo(() => {
    if (!selectedItem) return [];
    return findPath(data, selectedItem.id) || [];
  }, [selectedItem]);

  if (path.length === 0) {
    return (
      <nav className="breadcrumbs-container">
        <span className="breadcrumb-item">Root</span>
      </nav>
    );
  }

  return (
    <nav className="breadcrumbs-container">
      <span className="breadcrumb-item">Root</span>
      {path.map((node, index) => (
        <React.Fragment key={node.id}>
          <span className="breadcrumb-separator">/</span>
          <span className={`breadcrumb-item ${index === path.length - 1 ? 'active' : ''}`}>
            {node.name.replace(/_/g, ' ')}
          </span>
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
