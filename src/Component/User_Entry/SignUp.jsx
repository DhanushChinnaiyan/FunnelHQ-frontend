import {
    Box,
    Button,
    CircularProgress,
    IconButton,
    TextField,
    Typography,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import axios from "axios";
  import "./UserEntry.css";
  import { useCommonContext } from "../../State_Management/ContextApi";
  import { Link, useNavigate } from "react-router-dom";
  import { decodeToken } from "react-jwt";
  import GoogleIcon from '@mui/icons-material/Google';
  
  const UserSignup = () => {
    const navigate = useNavigate();
    const { commonApi } = useCommonContext();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
      });
    const [inpClicked,setInpClicked] = useState({
        email:false,
        password:false
    }) 
    const [validation,setValidation] = useState({
        email:false,
        oneLowerCase:false,
        oneUpperCase:false,
        oneNumber:false,
        oneSpecialChar:false,
        min8CharLength:false
    })
  
    useEffect(() => {
      const userToken = localStorage.getItem("userToken");
      if(userToken){
        const user = decodeToken(userToken).user;
        if (user) {
          navigate("/", { replace: true });
        }
      }
    }, []);
  
    
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });

      if(name === "email"){
        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    
        setValidation({
      ...validation,
      email: validEmail
    });

      }else if(name === "password"){
        setValidation({
            ...validation,
            oneLowerCase: /(?=.*[a-z])/.test(value),
            oneUpperCase: /(?=.*[A-Z])/.test(value),
            oneNumber: /(?=.*\d)/.test(value),
            oneSpecialChar: /(?=.*[!@#$%&*?])/.test(value),
            min8CharLength: /(?=.*[a-zA-Z\d!@#$%&*?]{8,})/.test(value)
          });
      }


    };
    
    const handleSubmit = async (e) => {
      try {
        e.preventDefault();
        setLoading(true);
        const response = await axios.post("https://funnelhq-4h7s.onrender.com/api/user/signup",formData);
        const data = await response.data;
        console.log(data)
        if (data.message === "Successfully registered") {
          localStorage.setItem("userToken",data.token)
          navigate("/");
        }
      } catch (error) {
        alert(error.response.data.message);
        console.log("Signup error ", error.response.data);
      } finally {
        setLoading(false);
      }
    };

    const googleAuth = () => {
      window.open(
        `https://funnelhq-4h7s.onrender.com/auth/google/callback`,
        "_self"
      );
    };
  
    return (
      <Typography component="div" className="userEntryCard">
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ width: 300 }}
          className="UserEntryBox"
        >
          <Typography component="h1">Register Your Account</Typography>
          <TextField
            id="outlined-multiline-flexible"
            label="Name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            InputProps={{
              sx: {
                color: "rgb(255, 211, 158)",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgb(137, 71, 163)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgb(250, 140, 195)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgb(250, 140, 195)",
                },
              },
            }}
            InputLabelProps={{
              sx: {
                color: "rgb(137, 71, 163)",
                "&.Mui-focused": {
                  color: "rgb(250, 140, 195)",
                },
              },
            }}
          />
          <TextField
            id="outlined-textarea"
            label="Email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            onFocus={()=>setInpClicked({...inpClicked,email:true})}
            onBlur={()=>setInpClicked({...inpClicked,email:false})}
            InputProps={{
              sx: {
                color: "rgb(255, 211, 158)",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgb(137, 71, 163)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgb(250, 140, 195)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgb(250, 140, 195)",
                },
              },
            }}
            InputLabelProps={{
              sx: {
                color: "rgb(137, 71, 163)",
                "&.Mui-focused": {
                  color: "rgb(250, 140, 195)",
                },
              },
            }}
          />
          {
           inpClicked.email &&  <Typography textAlign="center" color={validation.email?"green":"error"}>Valid email</Typography>
          }
  
          <TextField
            id="outlined-multiline-static"
            label="Password"
            name="password"
            required
            type="password"
            value={formData.password}
            onChange={handleChange}
            onFocus={()=>setInpClicked({...inpClicked,password:true})}
            onBlur={()=>setInpClicked({...inpClicked,password:false})}
            InputProps={{
              sx: {
                color: "rgb(255, 211, 158)",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgb(137, 71, 163)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgb(250, 140, 195)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgb(250, 140, 195)",
                },
              },
            }}
            InputLabelProps={{
              sx: {
                color: "rgb(137, 71, 163)",
                "&.Mui-focused": {
                  color: "rgb(250, 140, 195)",
                },
              },
            }}
          />
        { inpClicked.password && 
        <Typography component="div" style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
            <Typography color={validation.oneNumber?"green":"error"}>Min one number</Typography>
            <Typography color={validation.oneUpperCase?"green":"error"}>Min one upper case letter</Typography>
            <Typography color={validation.oneLowerCase?"green":"error"}>Min one lower case letter</Typography>
            <Typography color={validation.oneSpecialChar?"green":"error"}>Min one special character</Typography>
            <Typography color={validation.min8CharLength?"green":"error"}>Min 8 character</Typography>
          </Typography>
  }
          <Button
            disabled={loading}
            variant="contained"
            type="submit"
            sx={{ backgroundColor: "rgb(93, 23, 121)" }}
          >
            {loading ? (
              <CircularProgress
                size="30px"
                sx={{ color: "rgb(210, 114, 248)" }}
              />
            ) : (
              "SIGN UP"
            )}
          </Button>
          <Link to="/login" className="Link">
            Already have an account? Login here
          </Link>
          <Box component="div" style={{display:"flex",flexDirection:"column",alignItems:"center",height:100,justifyContent:"center"}}>
           <Typography  color="secondary" component="h2">OR</Typography>
          <Typography  component="div" display="flex" alignItems="center">
          <IconButton onClick={googleAuth}>
                 <GoogleIcon color="secondary"/>        
          </IconButton>
          <Typography component="span" color="aliceblue">Sign up with Google</Typography>
          </Typography>
         </Box>
        </Box>
      </Typography>
    );
  };
  
  export default UserSignup;
  