// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { message } from "antd";

// Create context
const AuthContext = createContext();

// Custom hook
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load user from localStorage on mount
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
        // No hardcoded passwords; just find user in localStorage
        const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
        let found = storedUsers.find(u => u.email === email && u.password === password && u.role === role);

        if (found) {
          // Ensure student records exist
          if (found.role === "student") {
            found.grades = found.grades || [];
            found.attendanceRecords = found.attendanceRecords || [];
            found.feesRecords = found.feesRecords || [];
            found.gpa = found.gpa ?? null;
          }

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
        // Get existing users
        const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");

        // Check if email already exists
        if (storedUsers.some(u => u.email === email)) {
          message.error("Email already registered");
          setLoading(false);
          resolve(false);
          return;
        }

        // Create new user
        const newUser = { id: Date.now().toString(), name, email, password, role };

        // Initialize student records empty
        if (role === "student") {
          newUser.grades = [];
          newUser.attendanceRecords = [];
          newUser.feesRecords = [];
          newUser.gpa = null;
        }

        // Save to localStorage
        storedUsers.push(newUser);
        localStorage.setItem("users", JSON.stringify(storedUsers));

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
    <AuthContext.Provider value={{ user, setUser, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
