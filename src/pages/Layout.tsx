import React from "react";
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import secureLocalStorage from 'react-secure-storage'

const Layout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: Run checks on the secureLocalStorage and then navigate accordingly
    const token = secureLocalStorage.getItem("token");
    if (!token) navigate("/login")
    else navigate("/dashboard")
  }, []);
  return (
    <>
      Layout
    </>
  );
}

export default Layout;
