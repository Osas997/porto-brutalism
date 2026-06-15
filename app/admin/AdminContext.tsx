"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

interface AdminContextType {
  message: string;
  isSuccess: boolean;
  showNotification: (msg: string, success?: boolean) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);

  const showNotification = useCallback((msg: string, success = true) => {
    setMessage(msg);
    setIsSuccess(success);
    setTimeout(() => {
      setMessage("");
    }, 3000);
  }, []);

  return (
    <AdminContext.Provider
      value={{
        message,
        isSuccess,
        showNotification,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}
