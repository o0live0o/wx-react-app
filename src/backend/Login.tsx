import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 这里可以添加实际的登录逻辑
    console.log('Login attempt with:', { username, password });
    
    // 模拟登录成功，跳转到后台管理页面
    navigate('/admin');
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>后台登录</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="username">用户名</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="请输入用户名"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">密码</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="请输入密码"
              required
            />
          </div>
          <button type="submit" className="login-btn">登录</button>
        </form>
      </div>
    </div>
  );
};

export default Login;