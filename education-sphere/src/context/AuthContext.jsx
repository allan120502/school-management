// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { message } from "antd";

// Create context
const AuthContext = createContext();

// Custom hook
export const useAuth = () => useContext(AuthContext);

// AuthProvider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("schoolUser");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Persist user to localStorage
  useEffect(() => {
    if (user) localStorage.setItem("schoolUser", JSON.stringify(user));
    else localStorage.removeItem("schoolUser");
  }, [user]);

  // Login function
  const login = async ({ email, password, role }) => {
    setLoading(true);

    return new Promise((resolve) => {
      setTimeout(() => {
        // Example hardcoded users (replace with real API)
        const mockUsers = [
          { id: "A001", name: "Admin ", email: "admin@example.com", password: "Adm1n$ecure2025!", role: "admin" },
          { id: "T001", name: "Teacher", email: "teacher@example.com", password: "T3ach3r#SafePass!", role: "teacher" },
          { id: "F001", name: "Finance", email: "finance@example.com", password: "F1nance@Strong$2025", role: "finance" },
          { id: "P001", name: "Parent", email: "parent@example.com", password: "P@r3ntSafe2025!", role: "parent" },
          { id: "S001", name: "Student", email: "student@example.com", password: "Stud@2025!", role: "student" },
        ];

        const found = mockUsers.find(
          (u) => u.email === email && u.password === password && u.role === role
        );

        if (found) {
          setUser(found);
          message.success(`Welcome, ${found.name}`);
          resolve(true);
        } else {
          message.error("Invalid credentials or role");
          resolve(false);
        }

        setLoading(false);
      }, 1000);
    });
  };

  // Register function
  const register = async ({ name, email, password, role }) => {
    setLoading(true);

    return new Promise((resolve) => {
      setTimeout(() => {
        // In real app, call backend to create user
        const newUser = { id: Date.now().toString(), name, email, password, role };
        setUser(newUser);
        message.success("Account created successfully!");
        setLoading(false);
        resolve(true);
      }, 1000);
    });
  };

  // Logout
  const logout = () => {
    setUser(null);
    message.info("Logged out");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
