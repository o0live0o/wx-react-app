import { Link } from 'react-router-dom'
import './Backend.css';

function Backend() {
  return (
    <div className="admin-panel">
      {/* 顶部导航栏 */}
      <header className="admin-header">
        <div className="admin-header-left">
          <h2>后台管理系统</h2>
        </div>
        <div className="admin-header-right">
            <div className="admin-user-info">
              <span className="admin-username">管理员</span>
              <button className="logout-btn" onClick={() => window.location.href = '/login'}>
                登出
              </button>
            </div>
          </div>
      </header>

      {/* 主体内容 */}
      <div className="admin-body">
        {/* 左侧侧边栏 */}
        <aside className="admin-sidebar">
          <nav className="admin-nav">
            <ul className="admin-nav-list">
              <li className="admin-nav-item active">
                <a href="#" className="admin-nav-link">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                  </svg>
                  <span>仪表盘</span>
                </a>
              </li>
              <li className="admin-nav-item">
                <a href="#" className="admin-nav-link">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                  <span>用户管理</span>
                </a>
              </li>
              <li className="admin-nav-item">
                <a href="#" className="admin-nav-link">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                  <span>内容管理</span>
                </a>
              </li>
<li className="admin-nav-item">
                <a href="#" className="admin-nav-link">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                  <span>评论管理</span>
                </a>
              </li>
              <li className="admin-nav-item">
                <a href="#" className="admin-nav-link">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                  <span>系统设置</span>
                </a>
              </li>
              <li className="admin-nav-item">
                <Link to="/" className="admin-nav-link">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                  <span>回到主页</span>
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* 右侧内容区 */}
        <main className="admin-main">
          <div className="admin-content">
            <div className="admin-content-header">
              <h3>仪表盘</h3>
            </div>

            {/* 统计卡片 */}
            <div className="admin-stats-grid">
              <div className="admin-stat-card">
                <div className="admin-stat-icon blue">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <div className="admin-stat-info">
                  <div className="admin-stat-value">1,234</div>
                  <div className="admin-stat-label">总用户数</div>
                </div>
              </div>

              <div className="admin-stat-card">
                <div className="admin-stat-icon green">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </div>
                <div className="admin-stat-info">
                  <div className="admin-stat-value">567</div>
                  <div className="admin-stat-label">文章数量</div>
                </div>
              </div>

              <div className="admin-stat-card">
                <div className="admin-stat-icon orange">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
                <div className="admin-stat-info">
                  <div className="admin-stat-value">89</div>
                  <div className="admin-stat-label">待审核评论</div>
                </div>
              </div>

              <div className="admin-stat-card">
                <div className="admin-stat-icon purple">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                  </svg>
                </div>
                <div className="admin-stat-info">
                  <div className="admin-stat-value">12</div>
                  <div className="admin-stat-label">系统设置</div>
                </div>
              </div>
            </div>

            {/* 最近活动 */}
            <div className="admin-section">
              <h4>最近活动</h4>
              <div className="admin-activity-list">
                <div className="admin-activity-item">
                  <div className="admin-activity-time">2026-04-04 10:30</div>
                  <div className="admin-activity-content">
                    <span className="admin-activity-user">管理员</span>
                    <span>创建了新文章</span>
                  </div>
                </div>
                <div className="admin-activity-item">
                  <div className="admin-activity-time">2026-04-04 09:15</div>
                  <div className="admin-activity-content">
                    <span className="admin-activity-user">管理员</span>
                    <span>审核了评论</span>
                  </div>
                </div>
                <div className="admin-activity-item">
                  <div className="admin-activity-time">2026-04-03 18:45</div>
                  <div className="admin-activity-content">
                    <span className="admin-activity-user">管理员</span>
                    <span>更新了系统设置</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Backend