import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name:"",
    email:""
  });

	const getUser = async () => {
		try {
			const response= await axios.get("https://funnelhq-4h7s.onrender.com/auth/login/success");
			setUser(response.data.user);
      console.log(response)
		} catch (err) {
			console.log(err);
		}
	};


  useEffect(() => {
    getUser();
    const userToken = localStorage.getItem("userToken");

    if (!userToken) {
      navigate("/login", { replace: true });
    } else {
      try {
        const user = decodeToken(userToken).user;

        if(!user._id){
          localStorage.removeItem("userToken");
          navigate("/login", { replace: true }); 
        }

        setUser({
          name:user.name,
          email:user.email
        })
      } catch (error) {

        console.error("Error decoding token:", error);
        navigate("/login", { replace: true }); 
      }
    }
  }, [])

  const logoutFunction = () => {
    localStorage.removeItem("userToken")
    navigate("/login", { replace: true }); 
  }
  return (
    <Typography component="div" className="profile">
      <Box component="div" className="card">
        <Typography component="div" textAlign="center">PROFILE</Typography>
        <Typography component="div" fontSize="14px">User Name : {user.name}</Typography>
        <Typography component="div" fontSize="14px">User Mail : {user.email}</Typography>
        <Button color="success" variant="contained" onClick={logoutFunction}>
          Logout
        </Button>
      </Box>
    </Typography>
  );
};

export default Home;
