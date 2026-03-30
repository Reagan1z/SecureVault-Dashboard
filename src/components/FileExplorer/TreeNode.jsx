import React, { useState } from 'react';
import { useFiles } from '../../context/FileContext';
import './FileExplorer.css';

const TreeNode = ({ item, level = 0 }) => {
  const { selectedItem, selectItem } = useFiles();
  const [isOpen, setIsOpen] = useState(level === 0); // Root starts open
  const isFolder = item.type === 'folder';
  const isSelected = selectedItem?.id === item.id;
  const isVault = item.id === 'root_1' || item.name === 'Vault';

  const handleClick = (e) => {
    e.stopPropagation();
    if (isFolder) {
      setIsOpen(!isOpen);
    }
    selectItem(item);
  };

  const getIcon = () => {
    if (isVault) {
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="node-icon vault-icon">
          <path d="M12 1v22M12 1l-5 5M12 1l5 5M12 23l-5-5M12 23l5 5" stroke="#58A6FF" strokeWidth="2" strokeLinecap="round"/>
          <path d="M12 12C12 12 7 9 7 6C7 3 9 1 12 1C15 1 17 3 17 6C17 9 12 12 12 12Z" fill="#58A6FF" opacity="0.4"/>
        </svg>
      );
    }
    if (isFolder) {
      return (
        <svg width="18" height="14" viewBox="0 0 18 14" fill="none" className="node-icon folder-icon">
          <path d="M1.66667 0.666656C0.75 0.666656 0 1.41666 0 2.33332V11.6667C0 12.5833 0.75 13.3333 1.66667 13.3333H16.3333C17.25 13.3333 18 12.5833 18 11.6667V4.33332C18 3.41666 17.25 2.66666 16.3333 2.66666H9.16667L7.5 0.666656H1.66667Z" fill={isSelected && isFolder ? '#A2C9FF' : '#58A6FF'} />
        </svg>
      );
    }
    return (
      <svg width="14" height="17" viewBox="0 0 14 17" fill="none" className="node-icon file-icon">
        <path d="M0.666667 0.666656C0.3 0.666656 0 0.966656 0 1.33332V15.6667C0 16.0333 0.3 16.3333 0.666667 16.3333H13.3333C13.7 16.3333 14 16.0333 14 15.6667V4.66666L10 0.666656H0.666667ZM9.33333 5.33332V1.33332L13.3333 5.33332H9.33333Z" fill="#8B919D" />
      </svg>
    );
  };

  const getChevron = () => {
    if (!isFolder || !item.children || item.children.length === 0) {
      return <div className="chevron-placeholder" />;
    }
    return (
      <svg width="9" height="10" viewBox="0 0 9 10" fill="none" className={`chevron ${isOpen ? 'open' : ''}`}>
        <path d="M3 2.5L6.5 5L3 7.5" stroke={isOpen ? '#58A6FF' : '#B0B5BE'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  };

  return (
    <div className="tree-node-wrapper">
      <div 
        className={`tree-node ${isSelected && isFolder ? 'active-folder' : ''} ${isSelected && !isFolder ? 'selected-file' : ''}`}
        style={{ paddingLeft: `${16 + level * 16}px` }}
        onClick={handleClick}
        role="treeitem"
        aria-expanded={isFolder ? isOpen : undefined}
        tabIndex="0"
      >
        {isSelected && isFolder && <div className="active-indicator" />}
        <div className="node-content">
          {getChevron()}
          {getIcon()}
          <span className="node-name">{item.name}</span>
        </div>
      </div>

      {isFolder && isOpen && item.children && (
        <div className="node-children" role="group">
          {item.children.map((child) => (
            <TreeNode
              key={child.id}
              item={child}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
