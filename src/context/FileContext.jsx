import React, { createContext, useContext, useState, useMemo } from 'react';
import { findPath } from '../utils/treeUtils';
import data from '../../data.json';

const FileContext = createContext();

export const FileProvider = ({ children }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [focusedId, setFocusedId] = useState(null);
  const [collapsedIds, setCollapsedIds] = useState(new Set());

  const selectItem = (item) => {
    if (!item) {
      setSelectedItem(null);
      setFocusedId(null);
      return;
    }

    setSelectedItem(item);
    setFocusedId(item.id);

    // Auto-expand ancestors
    const path = findPath(data, item.id);
    if (path && path.length > 1) {
      setCollapsedIds((prev) => {
        const next = new Set(prev);
        // All nodes in path except the last one (the item itself) are ancestors
        for (let i = 0; i < path.length - 1; i++) {
          next.delete(path[i].id);
        }
        return next;
      });
    }
  };

  const toggleNodeExpansion = (id) => {
    setCollapsedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const value = useMemo(() => ({
    selectedItem,
    selectItem,
    focusedId,
    setFocusedId,
    collapsedIds,
    toggleNodeExpansion
  }), [selectedItem, focusedId, collapsedIds]);

  return (
    <FileContext.Provider value={value}>
      {children}
    </FileContext.Provider>
  );
};

export const useFiles = () => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error('useFiles must be used within a FileProvider');
  }
  return context;
};
