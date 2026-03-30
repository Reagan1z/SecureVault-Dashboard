import React, { createContext, useContext, useState, useMemo } from 'react';
import { findPath } from '../utils/treeUtils';
import data from '../../data.json';

import { mockActivities as initialActivities } from '../data/mockActivities';

const FileContext = createContext();

export const FileProvider = ({ children }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [focusedId, setFocusedId] = useState(null);
  const [collapsedIds, setCollapsedIds] = useState(new Set());
  const [activities, setActivities] = useState(initialActivities);

  const selectItem = (item) => {
    if (!item) {
      setSelectedItem(null);
      setFocusedId(null);
      return;
    }

    setSelectedItem(item);
    setFocusedId(item.id);

    const path = findPath(data, item.id);
    if (path && path.length > 1) {
      setCollapsedIds((prev) => {
        const next = new Set(prev);
        for (let i = 0; i < path.length - 1; i++) {
          next.delete(path[i].id);
        }
        return next;
      });
    }
  };

  const addActivity = (id, log) => {
    setActivities((prev) => ({
      ...prev,
      [id]: [log, ...(prev[id] || [])]
    }));
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

  const [searchQuery, setSearchQuery] = useState('');
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const results = [];
    const searchRecursive = (nodes) => {
      nodes.forEach(node => {
        if (node.name.toLowerCase().includes(searchQuery.toLowerCase())) {
          results.push(node);
        }
        if (node.children) searchRecursive(node.children);
      });
    };
    searchRecursive(data);
    return results;
  }, [searchQuery]);

  const value = useMemo(() => ({
    selectedItem,
    selectItem,
    focusedId,
    setFocusedId,
    collapsedIds,
    toggleNodeExpansion,
    searchQuery,
    setSearchQuery,
    searchResults,
    activities,
    addActivity
  }), [selectedItem, focusedId, collapsedIds, searchQuery, searchResults, activities]);

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
