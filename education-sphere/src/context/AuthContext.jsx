// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { message } from "antd";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

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

  // Login
  const login = async ({ email, password, role }) => {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
        const found = storedUsers.find(
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

  // Register
  const register = async ({ name, email, password, role }) => {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");

        // Check if email already exists
        if (storedUsers.some((u) => u.email === email)) {
          message.error("Email already registered!");
          setLoading(false);
          return resolve(false);
        }

        // Generate internal ID (temporary)
        const internalID = Date.now().toString();

        const newUser = {
          id: internalID,        // internal system ID
          name,
          email,
          password,
          role,
          studentID: role === "student" ? "" : null, // admin will assign later
          grades: role === "student" ? [] : null,
          attendanceRecords: role === "student" ? [] : null,
          gpa: role === "student" ? null : null,
          fees: role === "student" ? null : null,
        };

        storedUsers.push(newUser);
        localStorage.setItem("users", JSON.stringify(storedUsers));

        setUser(newUser);
        message.success("Account created successfully!");
        setLoading(false);
        resolve(true);
      }, 1000);
    });
  };

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
