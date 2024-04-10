import React, { useState } from "react";
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

function UserTable({ users }) {
  // Función para obtener el valor de la columna
  const getColumnValue = (user, column) => {
    switch (column) {
      case "name":
        return `${user.name.first} ${user.name.last}`;
      case "email":
        return user.email;
      case "dob":
        return new Date(user.dob.date).getTime();
      default:
        return "";
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(5);
  const [sortOrder, setSortOrder] = useState({
    column: null,
    direction: "asc",
  });

  // Función para manejar el cambio de página
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  // Función para cambiar la cantidad de usuarios por página
  const handlePerPageChange = (e) => {
    setUsersPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  // Función para manejar la ordenación
  const handleSort = (column) => {
    let direction = "asc";
    if (sortOrder.column === column && sortOrder.direction === "asc") {
      direction = "desc";
    }
    setSortOrder({ column, direction });
  };

  // Ordenar los usuarios según la columna y la dirección de ordenación
  const sortedUsers = [...users].sort((a, b) => {
    const columnA = getColumnValue(a, sortOrder.column);
    const columnB = getColumnValue(b, sortOrder.column);
    if (columnA < columnB) {
      return sortOrder.direction === "asc" ? -1 : 1;
    }
    if (columnA > columnB) {
      return sortOrder.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Calcular los índices de los usuarios a mostrar en la página actual
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <div style={styles.container}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th onClick={() => handleSort("name")} style={styles.header}>
              Nombre
              {sortOrder.column === "name" && (
                sortOrder.direction === "asc" ? <FaSortUp /> : <FaSortDown />
              )}
            </th>
            <th onClick={() => handleSort("email")} style={styles.header}>
              Email
              {sortOrder.column === "email" && (
                sortOrder.direction === "asc" ? <FaSortUp /> : <FaSortDown />
              )}
            </th>
            <th onClick={() => handleSort("dob")} style={styles.header}>
              Fecha de Nacimiento
              {sortOrder.column === "dob" && (
                sortOrder.direction === "asc" ? <FaSortUp /> : <FaSortDown />
              )}
            </th>
            <th style={styles.header}>Imagen</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <tr key={index} style={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
              <td style={styles.cell}>{`${user.name.first} ${user.name.last}`}</td>
              <td style={styles.cell}>{user.email}</td>
              <td style={styles.cell}>{new Date(user.dob.date).toLocaleDateString()}</td>
              <td style={styles.cell}>
                <img
                  src={user.picture.thumbnail}
                  alt={`${user.name.first} ${user.name.last}`}
                  style={styles.image}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={styles.controls}>
        <button onClick={handlePrevPage} disabled={currentPage === 1} style={styles.button}>
          Anterior
        </button>
        <span style={styles.pageText}>Página {currentPage} de {totalPages}</span>
        <button
          onClick={handleNextPage}
          disabled={indexOfLastUser >= users.length}
          style={styles.button}
        >
          Siguiente
        </button>
        <label htmlFor="usersPerPage" style={styles.label}>Usuarios por página: </label>
        <select id="usersPerPage" value={usersPerPage} onChange={handlePerPageChange} style={styles.select}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          { }
        </select>
      </div>
    </div>
  );
}

const styles = {
  container: {
    margin: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  header: {
    backgroundColor: "#f2f2f2",
    padding: "8px",
    textAlign: "left",
    cursor: "pointer",
    borderBottom: "1px solid #ddd",
  },
  cell: {
    padding: "8px",
    borderBottom: "1px solid #ddd",
  },
  evenRow: {
    backgroundColor: "#f9f9f9",
  },
  oddRow: {
    backgroundColor: "#ffffff",
  },
  image: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
  },
  button: {
    margin: "5px",
    padding: "5px 10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  pageText: {
    margin: "5px",
  },
  label: {
    marginRight: "5px",
  },
  select: {
    padding: "5px",
  },
  controls: {
    display: "flex",
    alignItems: "center",
  },
};

export default UserTable;
