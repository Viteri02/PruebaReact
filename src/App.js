// App.js
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import LoginFormPage from "./pages/LoginFormPage";
import PrivatePage from "./pages/PrivatePage";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <Router>
      {" "}
      {/* Asegúrate de que toda la aplicación esté envuelta dentro de Router */}
      <div className="App">
        <Switch>
          <Route path="/login">
            <LoginFormPage setAuthenticated={setAuthenticated} />
          </Route>
          <PrivateRoute path="/private" authenticated={authenticated}>
            <PrivatePage />
          </PrivateRoute>
          {/* Agrega una ruta para manejar cualquier otra URL */}
          <Route path="/">
            {authenticated ? (
              <Redirect to="/private" />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
