import { useNavigate, useLocation } from "react-router-dom";
import "./index.css";

interface MenuItem {
  key: string;
  label: string;
  icon?: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    key: "/backend/dashboard",
    label: "仪表盘",
    icon: "📊",
  },
  {
    key: "/backend/users",
    label: "用户管理",
    icon: "👥",
  },
  {
    key: "/backend/products",
    label: "商品管理",
    icon: "🛍️",
  },
  {
    key: "/backend/category",
    label: "分类管理",
    icon: "🛍️",
  },
  {
    key: "/backend/orders",
    label: "订单管理",
    icon: "📝",
  },
];

export default function Sidebar({ collapsed }: { collapsed: boolean }) {

  const navigate = useNavigate();
  const location = useLocation();
  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <nav className="menu">
        {/* 菜单项内容 */}
        {menuItems.map((item) => (
          <div
            key={item.key}
            className={`menu-item ${
              location.pathname === item.key ? "active" : ""
            }`}
            onClick={() => navigate(item.key)}
          >
            <span className="menu-icon">{item.icon}</span>
            {!collapsed && <span className="menu-label">{item.label}</span>}
          </div>
        ))}
      </nav>
    </aside>
  );
}
