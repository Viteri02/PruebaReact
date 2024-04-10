import React, { useState } from "react";

function Sidebar({ onLogout, onUpdateTable }) {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleLogout = () => {
    if (typeof onLogout === "function") {
      onLogout();
    }
  };

  const handleUpdateTable = () => {
    if (typeof onUpdateTable === "function") {
      onUpdateTable();
    }
  };

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div style={isExpanded ? styles.containerExpanded : styles.containerCollapsed}>
      {isExpanded ? (
        <div>
          <button style={styles.toggleButton} onClick={toggleSidebar}>
            {"<<"}
          </button>
          <div style={styles.content}>
            <button style={styles.button} onClick={handleUpdateTable}>
              Actualizar Tabla
            </button>
            <button style={styles.button} onClick={handleLogout}>
              Logout
            </button>
            { }
          </div>
        </div>
      ) : (
        <button style={styles.toggleButtonCollapsed} onClick={toggleSidebar}>
          {">>"}
        </button>
      )}
    </div>
  );
}

const styles = {
  containerExpanded: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "200px",
    backgroundColor: "#333",
    padding: "20px",
  },
  containerCollapsed: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "50px",
    backgroundColor: "#333",
    padding: "20px",
  },
  toggleButton: {
    alignSelf: "flex-start",
    marginBottom: "20px",
    backgroundColor: "#555",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  toggleButtonCollapsed: {
    alignSelf: "flex-end",
    marginTop: "20px",
    backgroundColor: "#555",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  content: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Sidebar;
