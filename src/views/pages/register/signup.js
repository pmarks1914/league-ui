import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import theme from "src/styles/Styles"
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function SignUp() {
  const navigate = useNavigate()

  const [selectedValue, setSelectedValue] = React.useState('a');

  const [country, setCountry] = React.useState('');
  const [businessType, setBusinessType] = React.useState('');

  const handleChange = (event) => {
    setCountry(event.target.value);
  };

  const handleBusinessTypeChange = (event) => {
    setBusinessType(event.target.value);
  };

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      let expPhone = /(020|023|024|025|026|027|028|050|054|055|059|233)[\s.-]?(\d{7}|\d{8})$/;

      const business_name = data.get('business_name')
      const firstname = data.get('firstname')
      const lastname = data.get('lastname')
      const email = data.get('email')
      const phone = data.get('phone')
      const is_developer = data.get('is_developer')
      const password = data.get('password')
      
      
      const payload = JSON.stringify({
        "firstname": firstname,
        "lastname": lastname,
        "email": email,
        "phone": phone,
        "country_of_origin": country,
        "business_name": business_name,
        "business_type": businessType,
        "is_developer": is_developer,
        "password": password,
      })

        // console.log(payload)
        let config = {
          method: 'post',
          url: process.env.REACT_APP_BASE_API + '/auth/validate_email/',
         
          headers: {
            'Content-Type': 'application/json'
          },
          data: payload
        };
        axios(config).then(function (response){
          // console.log(response["data"]["message"])
          if ( Number(firstname) || firstname.length < 2 ){
            toast.error('First name', {
                position: toast.POSITION.TOP_RIGHT
            });
          }
          if ( Number(lastname) || lastname.length < 2){
            toast.error('Last name', {
                position: toast.POSITION.TOP_RIGHT
            });
          }
          if (response["data"]["message"] === "email already exist."){
            toast.error('Email already exists', {
                position: toast.POSITION.TOP_RIGHT
            });
          } 

          if ( !( expPhone.test(phone.replace(/\s+/g, '') ) ) ){
            toast.error('Invalid phone number', {
              position: toast.POSITION.TOP_RIGHT
          });
          }
          else if (password === "" || password.length < 8 || Number(password) ) {
            toast.error("Password strength! 8 Alphanumeric with a special characters, eg. Mymi%4536 ", {
              position: toast.POSITION.TOP_RIGHT
          });
          }
          
          if ( response["data"]["message"] === "Otp has been sent successfully." && response["data"]["status"] === true && expPhone.test(phone.replace(/\s+/g, '') ) && ( !Number(lastname) && lastname.length > 1 ) && ( !Number(firstname) && firstname.length > 1 ) && (password.length > 7 && !Number(password) ) ){
            localStorage.setItem("signupInfo", payload)
            navigate('/otp')
          }
          else if (!response){
            <Box sx={{ display: 'flex' }}>
              <CircularProgress />
            </Box>
          }
        })
        .catch(function (error) {
          console.log(error);
        });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <FormControl fullWidth>
          <InputLabel id="country">Country</InputLabel>
          <Select
            labelId="country"
            id="country"
            value={country}
            label="Select Country"
            onChange={handleChange}
            variant = "standard"
          >
            <MenuItem value={"Ghana"}>Ghana</MenuItem>
            
            </Select>
            </FormControl>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Business Name"
              name="business_name"
              autoFocus
              variant = "standard"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="First Name"
              name="firstname"
              autoFocus
              variant = "standard"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Last Name"
              name="lastname"
              autoFocus
              variant = "standard"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email"
              name="email"
              autoFocus
              variant = "standard"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Phone Number"
              name="phone"
              autoFocus
              variant = "standard"
            />
            
            <FormControl fullWidth>
            <InputLabel id="country-label">Business Type</InputLabel>
            <Select
              labelId="country-label"
              id="country"
              value={businessType}
              label=" Business Type"
              onChange={handleBusinessTypeChange}
              variant = "standard"
              >
            <MenuItem value={"Sole Proprietor"}>Sole Proprietor</MenuItem>
            <MenuItem value={"Limited Liability Company"}>Limited Liability Company</MenuItem>
            </Select>
            </FormControl>

            <FormControl >
              <FormLabel id="demo-row-radio-buttons-group-label">Are you a developer?</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="is_developer"
              >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" onChange = {handleRadioChange}/>
              <FormControlLabel value="no" control={<Radio />} label="No" onChange = {handleRadioChange}/>
              </RadioGroup>
            </FormControl>


            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              variant = "standard"
            />
          
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style = {{color: "#fff"}}
            >
              Sign Up
            </Button>
            
          </Box>
        </Box>
        <ToastContainer />

      </Container>
    </ThemeProvider>
  );
}