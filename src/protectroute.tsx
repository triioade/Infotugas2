import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate, Outlet } from 'react-router-dom';

const ProtectRoutes = () => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/", { replace: true });
    } else {
      setChecked(true);
    }
  }, [navigate]);

  if (!checked) return null; 

  return <Outlet />;
};

export default ProtectRoutes;
