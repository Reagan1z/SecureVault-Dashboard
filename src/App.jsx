import React from 'react'
import './App.css'

function App() {
  return (
    <div className="securevault-app">
      <header className="app-header">
        <h1>SecureVault <span>Explorer</span></h1>
        {/* Breadcrumb will go here */}
      </header>
      
      <main className="app-main">
        <aside className="sidebar">
          {/* SearchBar and Recursive FileTree will go here */}
          <div className="placeholder-text">File Tree Placeholder</div>
        </aside>
        
        <section className="properties-panel">
          {/* File Details will go here */}
          <div className="placeholder-text">Properties Panel Placeholder</div>
        </section>
      </main>
    </div>
  )
}

export default App
