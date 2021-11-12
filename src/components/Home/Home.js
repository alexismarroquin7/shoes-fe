import { Button } from "@material-ui/core";
import { useNavigate } from "react-router";

export const Home = () => {
  const navigate = useNavigate();
  
  const handleNavigateToRegister = () => navigate('/register');
  const handleNavigateToLogin = () => navigate('/login');
  const handleNavigateToShoes = () => navigate('/shoes');

  return (
  <div>
    <div>
      <Button onClick={handleNavigateToRegister}>Sign-up</Button>
      <Button onClick={handleNavigateToLogin}>Login</Button>
    </div>
    
    <Button onClick={handleNavigateToShoes}>Shop Now</Button>
  </div>
  );
};