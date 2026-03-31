import React, { useEffect, useRef } from 'react';
import { useFiles } from '../../context/FileContext';
import './FileExplorer.css';

const TreeNode = ({ item, level = 0 }) => {
  const { selectedItem, selectItem, focusedId, setFocusedId, collapsedIds, toggleNodeExpansion } = useFiles();
  const nodeRef = useRef(null);
  
  const isFolder = item.type === 'folder';
  const isSelected = selectedItem?.id === item.id;
  const isFocused = focusedId === item.id;
  const isOpen = isFolder && !collapsedIds.has(item.id);
  const isVault = item.id === 'root_1' || item.name === 'Vault';

  useEffect(() => {
    if (isFocused && nodeRef.current) {
      nodeRef.current.focus();
    }
  }, [isFocused]);

  const handleClick = (e) => {
    e.stopPropagation();
    if (isFolder) {
      toggleNodeExpansion(item.id);
    }
    selectItem(item);
  };

  const handleFocus = () => {
    setFocusedId(item.id);
  };

  const getIcon = () => {
    if (isVault) {
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#58A6FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="node-icon vault-icon">
          <path d="M17.5 19c2.5 0 4.5-2 4.5-4.5 0-2.3-1.7-4.2-3.9-4.5-.6-3.1-3.3-5.5-6.6-5.5-2.6 0-4.8 1.5-5.9 3.7C3.4 8.7 2 10.7 2 13c0 3.3 2.7 6 6 6h9.5z" />
        </svg>
      );
    }

    if (isFolder) {
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isSelected ? "#A2C9FF" : "#DFE2EB"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="node-icon folder-icon">
          <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
        </svg>
      );
    }

    const isPdf = item.name?.toLowerCase().endsWith('.pdf');
    const fileStroke = isPdf ? '#FF8B8B' : '#B0B5BE';

    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={fileStroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="node-icon file-icon">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
        {isPdf && <line x1="8" y1="13" x2="16" y2="13" strokeWidth="1.2" />}
        {isPdf && <line x1="8" y1="17" x2="12" y2="17" strokeWidth="1.2" />}
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
        ref={nodeRef}
        className={`tree-node ${isSelected && isFolder ? 'active-folder' : ''} ${isSelected && !isFolder ? 'selected-file' : ''} ${isFocused ? 'focused' : ''}`}
        style={{ paddingLeft: `${16 + level * 16}px` }}
        onClick={handleClick}
        onFocus={handleFocus}
        role="treeitem"
        aria-expanded={isFolder ? isOpen : undefined}
        aria-selected={isSelected}
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
