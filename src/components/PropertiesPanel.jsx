import React from 'react';
import { useFiles } from '../context/FileContext';
import { mockActivities } from '../data/mockActivities';

const PropertiesPanel = () => {
  const { selectedItem, activities, addActivity } = useFiles();

  if (!selectedItem) {
    return (
      <section className="properties-panel">
        <h2 className="section-title">Properties</h2>
        <div className="placeholder-content">
          <div className="placeholder-text">Select a folder or file to see its metadata.</div>
        </div>
      </section>
    );
  }

  const itemActivities = activities[selectedItem.id] || [];

  const handleAction = (action) => {
    const timestamp = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(new Date());
    
    addActivity(selectedItem.id, {
      user: "Current User (You)",
      action: action,
      timestamp: `Today, ${timestamp}`
    });
  };

  return (
    <section className="properties-panel">
      <h2 className="section-title">Properties</h2>
      <div className="placeholder-content">
        <div className="preview-placeholder">
           <div className="preview-inner">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeOpacity="0.2">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
                {selectedItem.type === 'file' && <path d="M12 11l3 3-3 3" strokeOpacity="1"/>}
              </svg>
              <div className="preview-text">SECURITY VAULT</div>
           </div>
        </div>
        <h3 className="properties-filename">{selectedItem.name}</h3>
        
        <div className="properties-details">
          <h4 className="detail-heading">Details</h4>
          <div className="detail-row">
            <span className="detail-label">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>
              Type
            </span>
            <span className="type-badge">{selectedItem.type === 'folder' ? 'Directory' : 'File'}</span>
          </div>
          {selectedItem.type === 'file' && (
            <div className="detail-row">
              <span className="detail-label">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                Size
              </span>
              <span className="detail-value">{selectedItem.size || 'N/A'}</span>
            </div>
          )}
          <div className="detail-row">
            <span className="detail-label">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              ID
            </span>
            <span className="detail-value">{selectedItem.id}</span>
          </div>
        </div>

        <div className="properties-actions">
          <h4 className="detail-heading">Actions</h4>
          <button className="action-row-button" onClick={() => handleAction('Shared')}>
            <span>Share</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
          </button>
          <button className="action-row-button" onClick={() => handleAction('Downloaded')}>
            <span>Download</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          </button>
        </div>

        {itemActivities.length > 0 && (
          <div className="properties-activity">
            <h4 className="detail-heading">Recent Activity</h4>
            <div className="activity-list">
              {itemActivities.map((activity, index) => (
                <div key={index} className="activity-item">
                  <div className="activity-dot" />
                  <div className="activity-header">
                    <span className="activity-action">{activity.action}</span>
                    <span className="activity-time">{activity.timestamp}</span>
                  </div>
                  <div className="activity-user">{activity.user}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertiesPanel;
