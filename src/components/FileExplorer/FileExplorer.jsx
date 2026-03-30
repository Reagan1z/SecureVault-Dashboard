import React, { useMemo } from 'react';
import TreeNode from './TreeNode';
import data from '../../../data.json';
import { useFiles } from '../../context/FileContext';
import './FileExplorer.css';

const FileExplorer = () => {
  const { 
    focusedId, 
    setFocusedId, 
    collapsedIds, 
    toggleNodeExpansion, 
    selectItem,
    selectedItem
  } = useFiles();

  // Helper to flatten only visible nodes for linear keyboard navigation
  const visibleNodes = useMemo(() => {
    const flattened = [];
    const traverse = (nodes) => {
      nodes.forEach((node) => {
        flattened.push(node);
        if (node.type === 'folder' && !collapsedIds.has(node.id) && node.children) {
          traverse(node.children);
        }
      });
    };
    traverse(data);
    return flattened;
  }, [collapsedIds]);

  const handleKeyDown = (e) => {
    const currentIndex = visibleNodes.findIndex((node) => node.id === focusedId);
    if (currentIndex === -1 && visibleNodes.length > 0) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        setFocusedId(visibleNodes[0].id);
      }
      return;
    }

    const currentNode = visibleNodes[currentIndex];

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (currentIndex < visibleNodes.length - 1) {
          setFocusedId(visibleNodes[currentIndex + 1].id);
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (currentIndex > 0) {
          setFocusedId(visibleNodes[currentIndex - 1].id);
        }
        break;
      case 'ArrowRight':
        e.preventDefault();
        if (currentNode.type === 'folder') {
          if (collapsedIds.has(currentNode.id)) {
            toggleNodeExpansion(currentNode.id);
          } else if (currentNode.children?.length > 0) {
            setFocusedId(currentNode.children[0].id);
          }
        }
        break;
      case 'ArrowLeft':
        e.preventDefault();
        if (currentNode.type === 'folder' && !collapsedIds.has(currentNode.id)) {
          toggleNodeExpansion(currentNode.id);
        } else {
          // Find parent and focus it
          const findParent = (nodes, targetId, parent = null) => {
            for (const node of nodes) {
              if (node.id === targetId) return parent;
              if (node.children) {
                const found = findParent(node.children, targetId, node);
                if (found) return found;
              }
            }
            return null;
          };
          const parent = findParent(data, focusedId);
          if (parent) setFocusedId(parent.id);
        }
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        selectItem(visibleNodes[currentIndex]);
        break;
      default:
        break;
    }
  };

  return (
    <div 
      className="file-explorer" 
      role="tree" 
      aria-label="SecureVault File Explorer"
      onKeyDown={handleKeyDown}
    >
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
