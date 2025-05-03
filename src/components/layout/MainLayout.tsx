import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import './index.css'

export default function MainLayout() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="app-container">
      <Header onToggle={() => setCollapsed(!collapsed)} />

      <div className="content-wrapper">
        <Sidebar collapsed={collapsed} />

        <main className="main-content">
          <Outlet /> {/* 子路由内容渲染位置 */}
        </main>
      </div>
    </div>
  );
}