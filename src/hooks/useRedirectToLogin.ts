import { useNavigate } from "react-router-dom";

export const useRedirecToLogin = () => {
  const navegar = useNavigate();
  return navegar("/", { replace: true });
};
