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

import avatar9 from '../../../assets/brand/logo.png'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCardHeader,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'

export default function SignUp() {
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
      const oldPassword = data.get('oldPassword')
      const newPassword = data.get('newPassword')
      const newPassword2 = data.get('newPassword2')
     

      const payload = JSON.stringify({
        "oldPassword": oldPassword,
        "newPassword": newPassword,
        "newPassword2": newPassword2,
      })
      // console.log(payload);

      // console.log(payload)
        let config = {
          method: 'post',
          url: process.env.REACT_APP_BASE_API + '/v1/send/otp/email',
          headers: {
            'Content-Type': 'application/json'
          },
          data: payload
        };
        axios(config).then(function (response){
          // console.log(response["data"])
          if (response["data"]["code"] === 200){
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
          // console.log(error);
        });
  };

  return (
    <div >
      <div className="bg-light min-vh-100 min-vw-100 d-flex flex-row align-items-center">
        <CssBaseline />

          <CContainer>

            <CRow className="justify-content-center">
              <CCol md={4} lg={3} xl={3}>
                <CCard className="p-0 cl-container">
                  <CCardHeader>
                  </CCardHeader>
                  <CCardBody className='m-0'>
                    <CRow>
                      <CCol xs="0" sm="0" md={0} lg="1" xl="1" ></CCol>
                      <CCol xs="12" sm="12" md={12} lg="10" xl="10" className='trade-name' >
                        <span><img src={avatar9} className='mb-0' width="100%" alt="college league" />
                        </span>

                        <p className='m-0 text-center fs-6'>
                          Change Password
                        </p>

                        {/* <Typography component="h6" variant="h6" className='mt-3 text-center fs-6'>
                            Change Password
                        </Typography> */}
                        <CCol xs="12" sm="12" md={12} lg={12} className="mt-1" >
                          <div className='mui-control-form' >
                            <Box
                              component="form"
                              noValidate
                              autoComplete="on"
                            >
                              <InputLabel shrink htmlFor="oldPassword"> </InputLabel>
                              <TextField
                                error
                                id="oldPassword"
                                name="oldPassword"
                                placeholder="Old password"
                                variant="outlined"
                                margin="normal"
                                type="email"
                                fullWidth
                                required
                              />

                              <InputLabel shrink htmlFor="newPassword"> </InputLabel>

                              <TextField
                                margin="normal"
                                required
                                fullWidth
                                placeholder="new password"
                                name="newPassword"
                                autoFocus
                                variant="outlined"
                              />

                              <InputLabel shrink htmlFor="newPassword2"> </InputLabel>

                              <TextField
                                margin="normal"
                                required
                                fullWidth
                                placeholder="confirm password"
                                name="newPassword2"
                                autoFocus
                                variant="outlined"
                              />

                            </Box>
                          </div>
                        </CCol>


                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                          style = {{color: "#fff"}}
                          className="bg-text-com-wp"
                          onClick={handleSubmit}
                        >
                          Submit
                        </Button>

                      </CCol>
                      <CCol xs="0" sm="0" md={0} lg="1" xl="1" ></CCol>
                    </CRow>
                    <div >
                    </div>


                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>


          </CContainer>
        
      </div>


    </div>
  );
}