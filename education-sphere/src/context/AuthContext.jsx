// src/context/AuthContext.jsx
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("users");
    return saved ? JSON.parse(saved) : [];
  });

 const [students, setStudents] = useState([]); 


  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("currentUser");
    return saved ? JSON.parse(saved) : null;
  });

  const [loading, setLoading] = useState(false);

  // Generate Student ID automatically
  const generateRegNo = () => {
    const year = new Date().getFullYear();
    const seq = students.length + 1;
    return `${year}-STD-${String(seq).padStart(3, "0")}`;
  };

  const register = async (data) => {
    setLoading(true);
    try {
      let newUser = { ...data };

      if (data.role === "student") {
        newUser.regNo = generateRegNo();
        setStudents((prev) => {
          const updated = [...prev, newUser];
          localStorage.setItem("students", JSON.stringify(updated));
          return updated;
        });
      }

      setUsers((prev) => {
        const updated = [...prev, newUser];
        localStorage.setItem("users", JSON.stringify(updated));
        return updated;
      });

      setCurrentUser(newUser);
      localStorage.setItem("currentUser", JSON.stringify(newUser));

      setLoading(false);
      return true;
    } catch (error) {
      console.error(error);
      setLoading(false);
      return false;
    }
  };

  const login = async (data) => {
    setLoading(true);

    const { identifier, password, role } = data;

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    const user = storedUsers.find(
      (u) =>
        u.role === role &&
        (u.email === identifier || u.regNo === identifier) &&
        u.password === password
    );

    setLoading(false);

    if (!user) return false;

    setCurrentUser(user);
    localStorage.setItem("currentUser", JSON.stringify(user));
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  const value = {
    users,
    students,
    currentUser,
    register,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
