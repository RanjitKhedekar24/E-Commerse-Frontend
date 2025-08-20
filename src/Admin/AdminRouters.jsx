import React, { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import { Outlet } from "react-router-dom";

export const AdminRouter = () => {
  const [ok, setOk] = useState(false);
  const { auth, setAuth } = useAuth();
  useEffect(() => {
    const authCheck = () => {
      fetch("https://e-commerse-backend-ig4l.onrender.com/auth/adminauth", {
        headers: { authorization: auth?.token },
      }).then((res) => {
        res.json().then((data) => {
          console.log(data);
          if (data.ok) {
            setOk(true);
          } else {
            setOk(false);
          }
        });
      });
    };
    if (auth?.token) {
      authCheck();
    }
  }, [auth.token]);
  return ok ? <Outlet /> : null;
};
