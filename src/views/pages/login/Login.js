import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import axios from 'axios';
import { TextField, OutlinedInput, InputLabel, MenuItem, Select } from '@mui/material';
import Button from '@mui/material/Button';
import { Col, Row } from 'reactstrap'
import Box from '@mui/material/Box';

import avatar9 from '../../../assets/brand/logo.svg'
import { FormControl } from '@mui/base'
// import swal from 'sweetalert2'

const swal = require("sweetalert2");
let permList = [
  "can_view",
];
const Login = () => {

  const [getFormDataError, setGetFormDataError] = React.useState({
    "password": false,
    "email": false
  })
  const [usernameVar, setUsernameVar] = useState("")
  const [passwordVar, setPasswordVar] = useState("")
  const [loader, setLoader] = useState("<div></div")
  const [login, setLogin] = useState("Login")
  const [loginError, setLoginError] = useState("")
  const [userType, setUserType] = useState("")
  const [userTypeError, setUserTypeError] = useState(false)

  function CheckLogin(e) {
    e.preventDefault();

    // window.location.href = "/dashboard";
    

    // // console.log("fff", process.env.REACT_APP_BASE_API, passwordVar, usernameVar)
    // window.location.href = "/dashboard";

    if (usernameVar === "") {
      setGetFormDataError({ ...getFormDataError, ...{ "email": true } })
    }
    else if (passwordVar === "") {
      setGetFormDataError({ ...getFormDataError, ...{ "password": true } })

    }
    else if(userType === ""){
      setUserTypeError(true)
    }
    else {
      setLogin("")
      setLoader('<div class="spinner-border "style="color: #e0922f;"></div>`')
      // console.log(" login ")
      // var qs = require('qs');
      let data = JSON.stringify({
        "email": usernameVar,
        "password": passwordVar

      });

      let config = {
        method: 'post',
        url: process.env.REACT_APP_BASE_API + "/login",
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };
      axios(config).then(response => {
        // console.log(response.data, "auth ", response.data.token_type + " " + response.data.token);
        if(userType === "Student"){
              let counter = 600000; // 600000 = 10m
              let userData = response.data;
              userData = {...userData, ...{type: userType, counter: counter}}
              // console.log((JSON.stringify(userData)));
              localStorage.setItem("userDataStore", JSON.stringify(userData));
              // Cookie
              // document.cookie = "cookieData" + "=" + JSON.stringify({ 
              //   account: "", 
              // wallet: "",
              // status: "",
              // access: "",
              // refresh: "",            
              // permission_list: ""
              // })
              setTimeout(() => {
                window.location.href = "/dashboard";
              }, 1000)
        }
        else if( userType === "School"){
          //
          
        }


      }).catch(function (error) {

        if (error.response) {
          // console.log("==>");

          setLoader("<a></a>")
          setLogin("Login")
          setLoginError("Wrong user credentials")
          /*
            * The request was made and the server responded with a
            * status code that falls out of the range of 2xx
            */

        } else if (error.request) {

          setLoader("<a></a>")
          setLogin("Login")
          setLoginError("Wrong user credentials")
          /*
            * The request was made but no response was received, `error.request`
            * is an instance of XMLHttpRequest in the browser and an instance
            * of http.ClientRequest in Node.js
            */

        } else {
          // Something happened in setting up the request and triggered an Error

        }
      }
      );

      // swal.fire({
      //     background: '#ffffff00',
      //     // html: `<div class="spinner-border "style="color: #e0922f;"></div>`, 
      //     showLoaderOnConfirm: false,
      //     showConfirmButton: false,
      //     allowOutsideClick: false,
      //     willOpen: () => {
      //     return 
      //     },
      //   });
    }

  }

  function userTypeLogin(e){
    setUserType(e.target.value)
    setUserTypeError(false)
  }
  return (
    <div className="bg-light min-vh-100 min-vw-100 d-flex flex-row align-items-center">
      <CContainer>

        <CRow className="justify-content-center">
          <CCol md={4} lg={3} xl={3}>
            <CCard className="p-0 cl-container">
              <CCardBody className='m-0'>
                <CRow>
                  <CCol xs="0" sm="0" md={0} lg="1" xl="1" ></CCol>
                  <CCol xs="12" sm="12" md={12} lg="10" xl="10" className='trade-name' >
                    <span><img src={avatar9} className='mb-0' style={{ width: "30px" }} alt="college league" /> COLLEGE LEAGUE
                    </span>


                    <Col xs="12" sm="12" md={12} lg={12} className="mt-3" >
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
                            placeholder="Email"
                            variant="outlined"
                            margin="normal"
                            type="email"
                            fullWidth
                            required
                            onChange={(e) => (setUsernameVar(e.target.value), setGetFormDataError({ ...getFormDataError, ...{ "first_name": false } }))}

                          />

                          <InputLabel shrink htmlFor="password"> </InputLabel>
                          <TextField
                            error={getFormDataError?.password}
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            placeholder="Password "
                            type="password"
                            id="password"
                            // variant = "standard"
                            autoComplete="current-password"
                            onChange={(e) => (setPasswordVar(e.target.value), setGetFormDataError({ ...getFormDataError, ...{ "password": false } }))}
                          />

                        </Box>

                        <FormControl fullWidth>
                          <InputLabel id="user-type-label" className='mt-3' >Select Login As * </InputLabel>
                          
                          <Select
                            labelId="user-type-label"
                            id="user-type"
                            error={userTypeError}
                            value={userType}
                            label=" Login As"
                            onChange={(e)=>userTypeLogin(e)}
                            variant="standard"
                          >
                            <MenuItem value={"Student"}> As Student</MenuItem>
                            <MenuItem value={"School"}>As School</MenuItem>
                          </Select>

                        </FormControl>
                      </div>
                    </Col>
                    <p className="text-medium-emphasis mb-0">{loginError}</p>
                    <CRow>
                      <CCol xs={12}>
                        {/*  */}
                        {login === "Login" ?

                          <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={(e) => CheckLogin(e)}
                            // style={{ background: "#0a0463"}}
                            className="bg-text-com-wp"
                          >
                            {login}
                          </Button>
                          :
                          <a dangerouslySetInnerHTML={{ __html: loader }}></a>

                        }
                      </CCol>
                    </CRow>



                  </CCol>
                  <CCol xs="0" sm="0" md={0} lg="1" xl="1" ></CCol>
                </CRow>
                <div >
                </div>
                <p className='mt-10 mb-2 text-center'>
                  Don{"'"}t have an account? <a href='/signup'> Sign Up </a>
                  <br />
                  <a href='/reset-password' >Forget Password</a>
                </p>
              </CCardBody>
            </CCard>

          </CCol>
        </CRow>


      </CContainer>
    </div>
  )
}

export default Login
