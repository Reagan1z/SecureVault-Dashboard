import React, { useState } from 'react';
import TreeNode from './TreeNode';
import data from '../../../data.json';
import './FileExplorer.css';

const FileExplorer = () => {
  const [selectedId, setSelectedId] = useState(null);

  const handleSelect = (item) => {
    setSelectedId(item.id);
    console.log('Selected:', item);
  };

  return (
    <div className="file-explorer" role="tree" aria-label="SecureVault File Explorer">
      {data.map((item) => (
        <TreeNode
          key={item.id}
          item={item}
          onSelect={handleSelect}
          selectedId={selectedId}
        />
      ))}
    </div>
  );
};

export default FileExplorer;
