import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = localStorage.getItem("auth") === "true";

    if (!isAuth) {
      navigate("/");
    }
  }, []);

  return <Sidebar />;
}

export default Home;