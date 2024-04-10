import React, { useState } from 'react';
import { users } from '../data'; // Importa la constante users desde el archivo data.js

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const foundUser = users.find(user => user.username === username && user.password === password);

    if (foundUser) {
      console.log('Inicio de sesión exitoso');
      onLogin(); // Llama a la función onLogin pasada desde LoginFormPage
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <form style={styles.form} onSubmit={handleSubmit}>
      <div style={styles.inputContainer}>
        <label style={styles.label}>
          Usuario:
          <input style={styles.input} type="text" value={username} onChange={handleUsernameChange} />
        </label>
      </div>
      <div style={styles.inputContainer}>
        <label style={styles.label}>
          Contraseña:
          <input style={styles.input} type="password" value={password} onChange={handlePasswordChange} />
        </label>
      </div>
      <button style={styles.button} type="submit">Iniciar sesión</button>
      {error && <div style={styles.error}>{error}</div>}
    </form>
  );
}

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  inputContainer: {
    width: "100%",
    marginBottom: "10px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  error: {
    marginTop: "10px",
    color: "red",
  },
};

export default LoginForm;
