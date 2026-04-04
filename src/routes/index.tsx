import { Routes, Route } from 'react-router-dom';
import Frontend from '../frontend/Frontend';
import Backend from '../backend/Backend';
import Login from '../backend/Login';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Frontend />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Backend />} />
      {/* 可以在这里添加更多路由 */}
    </Routes>
  );
};

export default AppRoutes;