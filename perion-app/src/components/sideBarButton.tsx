// SidebarToggleButton.jsx
import React from 'react'

const SidebarToggleButton = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <button className="text-white focus:outline-none" onClick={toggleSidebar}>
      {isSidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}
    </button>
  )
}

export default SidebarToggleButton
