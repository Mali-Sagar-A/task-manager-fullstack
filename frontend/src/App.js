import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const [isRegistering, setIsRegistering] = useState(false);

  if (isLoggedIn) {
    return <Dashboard />;
  }

  return isRegistering ? (
    <RegisterPage onRegister={() => setIsRegistering(false)} />
  ) : (
    <LoginPage
      onLogin={() => setIsLoggedIn(true)}
      goToRegister={() => setIsRegistering(true)}
    />
  );
}

export default App;
