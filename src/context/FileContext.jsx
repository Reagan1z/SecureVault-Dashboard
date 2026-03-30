import React, { createContext, useContext, useState, useMemo } from 'react';

const FileContext = createContext();

export const FileProvider = ({ children }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [focusedId, setFocusedId] = useState(null);
  const [collapsedIds, setCollapsedIds] = useState(new Set());

  const selectItem = (item) => {
    setSelectedItem(item);
    setFocusedId(item.id);
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
