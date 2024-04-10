import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import UserTable from "../components/UserTable";

function PrivatePage() {
  const [users, setUsers] = useState([]);
  const [logout, setLogout] = useState(false);

  useEffect(() => {
    fetch(`https://randomuser.me/api/?results=50`)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.results);
      })
      .catch((error) => {
        console.error("Error al obtener los usuarios:", error);
      });
  }, []);

  const handleLogout = () => {
    setLogout(true);
  };

  const handleUpdateTable = () => {
    // Vuelve a realizar la solicitud fetch para obtener los usuarios actualizados
    fetch(`https://randomuser.me/api/?results=50`)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.results);
      })
      .catch((error) => {
        console.error("Error al obtener los usuarios:", error);
      });
  };

  if (logout) {
    return <Redirect to="/login" />;
  }

  return (
    <div style={styles.container}>
      <Sidebar onLogout={handleLogout} onUpdateTable={handleUpdateTable} />
      <div style={styles.content}>
        <h1>Página privada</h1>
        <h2>Usuarios aleatorios</h2>
        <UserTable users={users} setUsers={setUsers} />
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
  },
  content: {
    flex: "1",
    padding: "20px",
  },
};

export default PrivatePage;
