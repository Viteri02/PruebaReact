import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import LoginForm from "../components/LoginForm";

function LoginFormPage({ setAuthenticated }) {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    console.log("Inicio de sesión exitoso");
    setAuthenticated(true);
    setLoggedIn(true); // Establece loggedIn a true después del inicio de sesión exitoso
  };

  // Redirige al usuario a la página privada si está autenticado
  if (loggedIn) {
    return <Redirect to="/private" />;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Página de inicio de sesión</h1>
      <div style={styles.formContainer}>
        <LoginForm onLogin={handleLogin} />
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f0f0f0",
  },
  title: {
    marginBottom: "20px",
    color: "#333",
  },
  formContainer: {
    width: "300px",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
  },
};

export default LoginFormPage;
