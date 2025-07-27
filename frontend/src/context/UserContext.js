import React from 'react';
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token"); //gets token from the localstorage
    if (!token) {                           // If token doesnt exist we set loading to false and return
      setLoading(false);
      return;
    }

    fetch("http://localhost:5001/api/user/profile", { //get request, if no method param->GET
      headers: {
        Authorization: `Bearer ${token}`,         //If token exists we fetch from user with the token as authorization
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        setProfile(data.user); //profile gets all the values from data.user
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch profile:", err.message);
        setLoading(false);
        localStorage.removeItem('token');
      });
  }, []);

  return (
    <UserContext.Provider value={{ profile, setProfile, loading }}>
      {children}
    </UserContext.Provider>
  );
};
