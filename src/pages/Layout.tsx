import React from "react";
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import secureLocalStorage from 'react-secure-storage'

const Layout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = secureLocalStorage.getItem("token");
    if (!token) navigate("/login")
  }, []);
  return (
    <>
      Layout
    </>
  );
}

export default Layout;
