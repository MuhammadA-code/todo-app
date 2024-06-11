import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";

import ToDoList from "./components/ToDoList";
import { AuthProvider, AuthContext } from "./context/AuthContext";

const App = () => {
  
  return (<>
   
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/sign_in" element={<Home />} />
          <Route path="/sign_up" element={<Signup />} />
          <Route
            path="/todos"
            element={
              <ProtectedRoute>
                <ToDoList />
              </ProtectedRoute>
            }
          />
         {localStorage.getItem('Authorization') ?  <Route path="/" element={<Navigate to="/todos" />} /> : <Route path="/" element={<Navigate to="/sign_in" />} />}
        </Routes>
      </Router>
    </AuthProvider>
    </>
  );
};

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>;

  return children;
};

export default App;