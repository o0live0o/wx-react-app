import { useNavigate, Link } from "react-router-dom";
import "../styles/home.css";
export default function HomeHeader() {
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div className="header">
      <div
        className="logo"
        onClick={handleLogoClick}
        role="button"
        tabIndex={0}
      >
        Unknown Web Site
      </div>
      <div className="nav">
        <Link to="/backend">Backend</Link>
      </div>
    </div>
  );
}
