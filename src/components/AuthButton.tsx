import { useMsal } from "@azure/msal-react";
import { Button, ButtonProps, Tooltip } from "antd";

interface AuthButtonProps extends ButtonProps {
  tooltipTitle?: string;
}
export const AuthButton: React.FC<AuthButtonProps> = ({
  tooltipTitle = "Please Login",
  ...props
}) => {
  const { accounts } = useMsal();
  const isLoggedIn = accounts.length > 0;

  const button = <Button {...props} disabled={!isLoggedIn || props.disabled} />;

  if (!isLoggedIn) {
    return <Tooltip title={tooltipTitle}>{button}</Tooltip>;
  }

  return button;
};