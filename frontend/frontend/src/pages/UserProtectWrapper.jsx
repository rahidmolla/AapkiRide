import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext.jsx";

const UserProtectWrapper = ({ children }) => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/UserLogin", { replace: true });
      return;
    }

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setUser(response.data);
          setChecking(false);
        }
      })
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/UserLogin", { replace: true });
      });
  }, [navigate, setUser]);

  if(isLoading) {
            return(
                <div> Loading...</div>
            )
           }

  return
   <>
   {children}
   </>;
};

export default UserProtectWrapper;