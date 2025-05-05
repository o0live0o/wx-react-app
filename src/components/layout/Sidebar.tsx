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
    label: "Dashboard",
    icon: "📊",
  },
  {
    key: "/backend/products",
    label: "Product",
    icon: "🛍️",
  },
  {
    key: "/backend/category",
    label: "Category",
    icon: "🛍️",
  }
];

export default function Sidebar({ collapsed }: { collapsed: boolean }) {

  const navigate = useNavigate();
  const location = useLocation();
  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <nav className="menu">
        {/* menu */}
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
