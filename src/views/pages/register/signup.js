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
import Swal from 'sweetalert2';
import { Col, Row } from 'reactstrap';

export default function SignUp() {
  const navigate = useNavigate()

  const [getFormDataError, setGetFormDataError] = React.useState({
    "password": false,
    "password1": false,
    "first_name": false,
    "last_name": false,
    "other_names": false,
    "email": false
  })
  const [getFormData, setGetFormData] = React.useState({})
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
      let expPhone = /(020|023|024|025|026|027|028|050|054|055|059|233)[\s.-]?(\d{7}|\d{8})$/;

      const firstname = getFormData?.first_name
      const lastname = getFormData?.last_name
      const email = getFormData?.email
      const password = getFormData?.password 
      
      let mainCharacter = "()[]{}|\`~!@#$%^&*_-+=;:,<>./?'" + '"';
      let alphabet ="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
      let arrayAlphabet = Array.from( alphabet)
      let arrayMainCharacter = Array.from( mainCharacter)
      let [isPassewordValid1, isAlphabetPass1] = [false, false]
  
      for(let i=0; i<arrayMainCharacter.length; i++){
        if( (Array.from(getFormData?.password || "")).includes(arrayMainCharacter[i]) ){
          isPassewordValid1 = true
        }
      }

      for(let i=0; i<arrayAlphabet.length; i++){
        if( (Array.from(getFormData?.password || "")).includes(arrayAlphabet[i]) ){
          isAlphabetPass1 = true
        }
      }
      
      if (!(getFormData?.email)){
        
        setGetFormDataError({...getFormDataError, ...{"email": true}})
      } 
      else if ( !(getFormData?.first_name) || Number(getFormData?.first_name) || getFormData?.first_name?.length < 2 ){
        setGetFormDataError({...getFormDataError, ...{"first_name": true}})
      }
      // console.log(getFormData?.first_name?.length)

      else if ( !(getFormData?.last_name) || Number(getFormData?.last_name) || getFormData?.last_name?.length < 2){
        
        setGetFormDataError({...getFormDataError, ...{"last_name": true}})
      }

      // if ( !( expPhone.test(phone.replace(/\s+/g, '') ) ) ){
      //   toast.error('Invalid phone number', {
      //     position: toast.POSITION.TOP_RIGHT
      // });
      // }
      else if (!(getFormData?.password) || getFormData?.password === "" || getFormData?.password?.length < 8 || Number(getFormData?.password) || !isPassewordValid1 || !isAlphabetPass1 ) {
        setGetFormDataError({...getFormDataError, ...{"password": true}})


      }
      else if( getFormData?.password !== getFormData?.password1 ){
        // 
        setGetFormDataError({...getFormDataError, ...{"password1": true}})
      }
      else{
        sendOTP()
      }



  };

  function sendOTP(){
    

    const payload = JSON.stringify({
      "email": getFormData?.email
    })


    let config_otp = {
      method: 'post',
      url: process.env.REACT_APP_BASE_API + "/v1/otp/email",
      headers: {
          'Content-Type': 'application/json'
      },
      data: payload
  };
    axios(config_otp).then(function (response){
      // console.log(response)
      
    })
    .catch(function (error) {
      // console.log(error);
    });

    Swal.fire({
      text: 'Check your email and type the code here.',
      input: 'text',
      inputAttributes: {
          autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Submit',
      showLoaderOnConfirm: true,
      allowOutsideClick: false,
      confirmButtonColor: '#1677ff',
      cancelButtonColor: '#d33',
      preConfirm: (otpCode) => {
          // otpCodecription = otpCode
          if (otpCode === "") {
              Swal.showValidationMessage(
                  `Request failed! code is required.`
              )
          }
          else {
              let data = JSON.stringify({
                  "email": getFormData?.email,
                  "first_name": getFormData?.first_name,
                  "last_name": getFormData?.last_name,
                  "other_name": getFormData?.other_names,
                  "password": getFormData?.password,
                  "password1": getFormData?.password,
                  "role": "STUDENT",
                  "description": "",
                  "address": "",
                  "otp": otpCode
              })
              let config = {
                  method: 'post',
                  url: process.env.REACT_APP_BASE_API + "/v1/registration",
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  data: data
              };

              sendApiData(config);
          }
      },
  }).then((result1) => {

  })

  }

  function sendApiData(config){
    // console.log(config)
    axios(config).then(function (response){
      
      if(response?.data?.code === 200){
        Swal.fire({
          // title: 'Successfully created!',
          text: response?.data?.message,
          icon: "success",
          allowOutsideClick: false,
          // allowEscapeKey: false,
          showCancelButton: false,
          confirmButtonColor: '#950707',
          // cancelButtonColor: '#d33',
          confirmButtonText: 'Ok'
        }).then((result) => { 
          navigate("/login")
        });
      }
      else{
        Swal.fire({
          // title: 'Successfully created!',
          text: response?.data?.message,
          icon: "error",
          allowOutsideClick: false,
          // allowEscapeKey: false,
          showCancelButton: false,
          confirmButtonColor: '#950707',
          // cancelButtonColor: '#d33',
          confirmButtonText: 'Ok'
        }).then((result) => { });
      }
      
    })
    .catch(function (error) {
      Swal.fire({
        // title: 'Successfully created!',
        text: error?.response?.data?.message,
        icon: "error",
        allowOutsideClick: false,
        // allowEscapeKey: false,
        showCancelButton: false,
        confirmButtonColor: '#950707',
        // cancelButtonColor: '#d33',
        confirmButtonText: 'Ok'
      }).then((result) => { });    
    });
  }

  return (
    
    <div className="bg-light min-vh-100 min-vw-100 d-flex flex-row align-items-center">
    <CssBaseline />

      <CContainer>

        <Row className="justify-content-center">
          <Col md={4} lg={3} xl={3}>
            <CCard className="p-0 cl-container">
              <CCardHeader>
              </CCardHeader>
              <CCardBody className='m-0'>
                <CRow>
                  <CCol xs="0" sm="0" md={0} lg="1" xl="1" ></CCol>
                  <CCol xs="12" sm="12" md={12} lg="10" xl="10" className='trade-name' >
                    <span><img src={avatar9} className='mb-0' style={{ width: "30px" }} alt="college league" /> COLLEGE LEAGUE
                    </span>

                    <p className='mt-3 text-center fs-6'>
                        Sign Up
                    </p>
                    <CCol xs="12" sm="12" md={12} lg={12} className="mt-1" >
                      <div className='mui-control-form' >
                        <Box
                          component="form"
                          noValidate
                          autoComplete="on"
                        >
                          <InputLabel shrink htmlFor="email"> </InputLabel>
                          <TextField
                            error={getFormDataError?.email}
                            id="email"
                            name="email"
                            placeholder="Your email"
                            variant="outlined"
                            margin="normal"
                            type="email"
                            fullWidth
                            required
                            onChange={(e)=> (setGetFormData({...getFormData, ...{"email": e.target.value}}), setGetFormDataError({...getFormDataError, ...{"email": false}}))}
                          />

                          <InputLabel shrink htmlFor="fname"> </InputLabel>
                          <TextField
                            error={getFormDataError?.first_name}
                            id="fname"
                            name="fname"
                            placeholder="First name"
                            variant="outlined"
                            margin="normal"
                            type="text"
                            fullWidth
                            required
                            onChange={(e)=> (setGetFormData({...getFormData, ...{"first_name": e.target.value}}), setGetFormDataError({...getFormDataError, ...{"first_name": false}}))}
                          />

                          <InputLabel shrink htmlFor="lname"> </InputLabel>
                          <TextField
                            error={getFormDataError?.last_name}
                            id="lname"
                            name="lname"
                            placeholder="Last name"
                            variant="outlined"
                            margin="normal"
                            type="text"
                            fullWidth
                            required
                            onChange={(e)=> (setGetFormData({...getFormData, ...{"last_name": e.target.value}}), setGetFormDataError({...getFormDataError, ...{"last_name": false}}))}

                          />

                          <InputLabel shrink htmlFor="oname"> </InputLabel>
                          <TextField
                            error={getFormDataError?.other_names}
                            id="oname"
                            name="oname"
                            placeholder="Other name"
                            variant="outlined"
                            margin="normal"
                            type="text"
                            fullWidth
                            required
                            onChange={(e)=> (setGetFormData({...getFormData, ...{"other_names": e.target.value}}), setGetFormDataError({...getFormDataError, ...{"other_names": false}}))}
                          />


                          <InputLabel shrink htmlFor="newPassword"> </InputLabel>
                          <TextField
                            error={getFormDataError?.password}
                            margin="normal"
                            required
                            fullWidth
                            type="password"
                            placeholder="New password"
                            name="newPassword"
                            autoFocus
                            variant="outlined"
                            className='mb-0'
                            onChange={(e)=> (setGetFormData({...getFormData, ...{"password": e.target.value}}), setGetFormDataError({...getFormDataError, ...{"password": false}}))}
                          />
                          {
                            getFormDataError?.password ?
                            <p className='mt-0 mb-0 cl-text-warn-color'>Strong password is required, eg. Yase@#3064</p>
                            : ""
                          }

                          <InputLabel shrink htmlFor="newPassword2"> </InputLabel>

                          <TextField
                            error={getFormDataError?.password1}
                            margin="normal"
                            required
                            fullWidth
                            type="password"
                            placeholder="Confirm password"
                            name="newPassword2"
                            autoFocus
                            variant="outlined"                            
                            className='mt-4 mb-0'
                            onChange={(e)=> (setGetFormData({...getFormData, ...{"password1": e.target.value}}), setGetFormDataError({...getFormDataError, ...{"password1": false}}))}
                          />
                          {
                            getFormDataError?.password1 ?
                            <p className='mt-0 cl-text-warn-color'>New and confirm passwords do not match.</p>
                            : ""
                          }

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
                      onClick={(e)=>handleSubmit(e)}
                    >
                      Create
                    </Button>

                  </CCol>
                  <CCol xs="0" sm="0" md={0} lg="1" xl="1" ></CCol>
                </CRow>
                <p className='mt-10 mb-2 text-center'>
                  Already have an account? <a href='/login'> Login </a>
                  <br />
                  <a href='/reset-password' >Forget Password</a>
                </p>
              </CCardBody>
            </CCard>
          </Col>
        </Row>


      </CContainer>
    
  </div>
  );
}