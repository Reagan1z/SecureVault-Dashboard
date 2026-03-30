import React from 'react';
import TreeNode from './TreeNode';
import data from '../../../data.json';
import './FileExplorer.css';

const FileExplorer = () => {
  return (
    <div className="file-explorer" role="tree" aria-label="SecureVault File Explorer">
      {data.map((item) => (
        <TreeNode
          key={item.id}
          item={item}
        />
      ))}
    </div>
  );
};

export default FileExplorer;
