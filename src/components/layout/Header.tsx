import { useNavigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import { Button, Dropdown } from "antd";
import type { MenuProps } from "antd";

export default function Header({ onToggle }: { onToggle: () => void }) {
  const navigate = useNavigate();
  const { instance, accounts } = useMsal();

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleLogin = () => {
    instance.loginRedirect().catch((error) => {
      console.error(error);
    });
  };

  const handleLogout = () => {
    instance.logoutRedirect().catch((error) => {
      console.error(error);
    });
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <Button onClick={handleLogout}>Logout</Button>,
    },
  ];

  return (
    <header className="header">
      {/* <button className="menu-toggle" onClick={onToggle}>
        ≡
      </button> */}
      <div
        className="header-left"
        onClick={handleLogoClick}
        role="button"
        tabIndex={0}
      >
        Unknown Web Site
      </div>

      <div className="header-right">
        {accounts.length > 0 ? (
          <>
            <div>{accounts[0].username}</div>
            <Dropdown menu={{ items }} arrow>
            <div className="header-right-avatar" role="button" tabIndex={0}>
              {accounts[0].username.charAt(0).toUpperCase()}
            </div>
            </Dropdown>
          </>
        ) : (
          <div
            onClick={handleLogin}
            role="button"
            tabIndex={0}
            className="login-link"
          >
            Login
          </div>
        )}
        {/* <div className="header-right-avatar">x</div> */}
      </div>
    </header>
  );
}
