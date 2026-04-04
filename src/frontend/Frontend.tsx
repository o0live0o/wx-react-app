import { Link } from 'react-router-dom'
import { useState } from 'react';
import Home from './components/Home';
import ExchangeRate from './components/ExchangeRate';
import Telegram from './components/Telegram';
import Simulation from './components/Simulation';
import './Frontend.css'

function Frontend() {
  const [activeTab, setActiveTab] = useState('home');
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="home-container">
      {/* 导航栏 */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">Finance</div>
          <ul className="nav-menu">
            <li className="nav-item"><a href="#" className={`nav-link ${activeTab === 'home' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('home'); }}>首页</a></li>
            <li className="nav-item"><a href="#" className={`nav-link ${activeTab === 'exchange-rate' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('exchange-rate'); }}>汇率</a></li>
            <li className="nav-item"><a href="#" className={`nav-link ${activeTab === 'telegram' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('telegram'); }}>电报</a></li>
            <li className="nav-item"><a href="#" className={`nav-link ${activeTab === 'simulation' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('simulation'); }}>模拟</a></li>
          </ul>
          <Link to="/admin" className="admin-link" aria-label="Admin">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="3" y1="9" x2="21" y2="9"></line>
              <line x1="9" y1="21" x2="9" y2="9"></line>
            </svg>
          </Link>
        </div>
      </nav>

      {/* 主内容区域 */}
      <main className="main-content">
        <section id="center">
          {activeTab === 'home' && <Home />}
          {activeTab === 'exchange-rate' && <ExchangeRate />}
          {activeTab === 'telegram' && <Telegram />}
          {activeTab === 'simulation' && <Simulation />}
        </section>
      </main>
      {/* 悬浮按钮 */}
      <button className="floating-button" aria-label="Go to top" onClick={scrollToTop}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="19" x2="12" y2="5"></line>
          <polyline points="5 12 12 5 19 12"></polyline>
        </svg>
      </button>
    </div>
  )
}

export default Frontend