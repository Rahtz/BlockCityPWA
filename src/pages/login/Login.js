import { useState, useEffect } from "react";
import { supabase } from "../../services/client";

const Login = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return <div></div>;
};

export default Login;
