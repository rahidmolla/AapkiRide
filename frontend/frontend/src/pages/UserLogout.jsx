import React, { useEffect } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserLogout = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        axios.get(
            `${import.meta.env.VITE_BASE_URL}/users/logout`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        ).then((response) => {
            if (response.status === 200) {
                localStorage.removeItem('token');
                navigate('/UserLogin');
            }
        }).catch((error) => {
            console.error("Logout failed:", error);
            localStorage.removeItem('token');
            navigate('/UserLogin');
        });

    }, [navigate]);

    return (
        <div>
        </div>
    );
};

export default UserLogout;