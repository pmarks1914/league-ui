import React, { useEffect, useState } from 'react'
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
import { cilLockLocked, cilUser, cilViewStream } from '@coreui/icons'
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Col, Row } from 'reactstrap'
import Box from '@mui/material/Box';
import { IconButton, InputAdornment } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Swal from 'sweetalert2'
// import swal from 'sweetalert2'

import avatar9 from '../../../assets/brand/logo.png'
const swal = require("sweetalert2");

const JoinTeam = () => {

  const [usernameVar, setUsernameVar] = useState("")
  const [password1Var, setPassword1Var] = useState("")
  const [passwordVar, setPasswordVar] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("")
  const [loader, setLoader] = useState("<div></div")
  const [login, setLogin] = useState("Login")
  const [loginError, setLoginError] = useState("")
  const [error, setError] = useState({})
  const [showPassword1, setShowPassword1] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [inviteData, setInviteData] = useState({})
  //
  useEffect(()=>{

    let id = window.location.pathname.split("/")[2]
    
    let data = '';
    let config_invite = {
        method: 'get',                    
        url: process.env.REACT_APP_BASE_API + "/team/invite/verify/" + id + "/",
        headers: {
            'Content-Type': 'application/json',
        },
        data: data
    };
    axios(config_invite).then(response => {
        // console.log("data checkout 1 ==", response?.data);
        if (response?.data?.status === true) {
            // console.log("g>>>", response?.data?.data?.inviteData)
            if(response?.data?.data){
                setInviteData(response?.data?.data)
                if(response?.data?.account_exist){
                  // window.location.href = '/login'
                  window.location.href = "/team-login";
                }
            }

        }
        else{
            Swal.fire({
                title: 'Oops',
                html: "<div class='pb-0 pt-0'> Invalid User</div>",
                icon: 'error',
                showCancelButton: false,
                showConfirmButton: false,
                allowOutsideClick: false,
            }).then((result) => {
                // 
            })
        }
        

    }).catch(function (error) {
        // 
        if(error){
            // Swal.fire({
            //     title: 'Application Error',
            //     title: 'Oops',
            //     html: "<div class='pb-0 pt-0'> Try again later </div>",
            //     icon: 'warning',
            //     showCancelButton: false,
            //     showConfirmButton: false,
            //     allowOutsideClick: false,
            //     // cancelButtonColor: '#d33',
            //     // timer: 4000
            // }).then((result) => {
            //     // 
            // })
        }
        if (error.response) {
            // // console.log("==");
            /*
            * The request was made and the server responded with a
            * status code that falls out of the range of 2xx
            */

        } else if (error.request) {
            /*
            * The request was made but no response was received, `error.request`
            * is an instance of XMLHttpRequest in the browser and an instance
            * of http.ClientRequest in Node.js
            */

        } else {
            // Something happened in setting up the request and triggered an Error

        }
    });


  },[])
  function CheckLogin(e) {
    e.preventDefault();

    // console.log("fff", process.env.REACT_APP_BASE_API, passwordVar, usernameVar)
    let expPhone = /(020|023|024|025|026|027|028|050|054|055|059|233)[\s.-]?(\d{7}|\d{8})$/;
    // expPhone.test(phone.replace(/\s+/g, ''))
    let mainCharacter = "()[]{}|\`~!@#$%^&*_-+=;:,<>./?'" + '"';
    let alphabet ="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let arrayAlphabet = Array.from( alphabet)
    let arrayMainCharacter = Array.from( mainCharacter)
    // let isPassewordValid1 = false;
    // let isPassewordValid2 = false;
    let [isPassewordValid1, isPassewordValid2, isAlphabetPass1, isAlphabetPass2] = [false, false, false, false]

    for(let i=0; i<arrayMainCharacter.length; i++){
      if( (Array.from(password1Var)).includes(arrayMainCharacter[i]) ){
        isPassewordValid1 = true
      }
      if( (Array.from(passwordVar)).includes(arrayMainCharacter[i]) ){
        isPassewordValid2 = true
      }
    }

    for(let i=0; i<arrayAlphabet.length; i++){
      if( (Array.from(password1Var)).includes(arrayAlphabet[i]) ){
        isAlphabetPass1 = true
      }
      if( (Array.from(passwordVar)).includes(arrayAlphabet[i]) ){
        isAlphabetPass2 = true
      }
    }
    // console.log(isPassewordValid1, isPassewordValid2)
    // console.log(multipleExist)
    // console.log( (Array.from(mainCharacter)).includes([",", "."]), Array.from(password1Var), [".", ","] ) 
   
    if (firstName === "") {
      setError({...error, ...{"firstNameError": true}})
    }
    else if (lastName === "") {
      setError({...error, ...{"lastNameError": true}})
    } 
    else if ( !expPhone.test(phone.replace(/\s+/g, '')) ) {
      setError({...error, ...{"phoneError": true}})
    }  
    else if (password1Var === "" || password1Var.length < 8 || Number(password1Var) || !isPassewordValid1 || !isAlphabetPass1 ) {
      setError({...error, ...{"password1Error": true}})
    }
    else if (passwordVar === "" || passwordVar.length < 8 || Number(password1Var) || !isPassewordValid2 || !isAlphabetPass2 ) {
      setError({...error, ...{"passwordError": true}} )
    } 
    else if ( password1Var !== passwordVar ){
      setError({...error, ...{"password1Error": true, "passwordError": true}} )
    }
    else if( password1Var === passwordVar) {
      setLogin("")
      setLoader('<div class="spinner-border "style="color: #e0922f;"></div>`')
      // console.log(" login ")
      let data = JSON.stringify({
          "firstname": firstName,
          "lastname": lastName,
          "email": inviteData.email,
          "phone": phone,
          "password": password1Var
      });

      let config = {
        method: 'post',
        url: process.env.REACT_APP_BASE_API + "/team/invite/accept/" + window.location.pathname.split("/")[2] + "/",
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };
      axios(config).then(response => {
        setLoader("<a></a>")
        setLogin("Login")
        // console.log(response.status);
        if (response?.data?.status) { 
          // console.log(response?.data)
          localStorage.setItem("inviteData", JSON.stringify(inviteData));
          Swal.fire({
            title: response?.data?.message,
            icon: 'success',
            allowOutsideClick: false,
            // allowEscapeKey: false,
            showCancelButton: false,
            confirmButtonColor: '#0a0463',
            // cancelButtonColor: '#d33',
            confirmButtonText: 'OK!'
          }).then((result) => {
            window.location.href = "/team-login";
            
          });

        }
        else {
          // setLoginError("Wrong user credentials")
          Swal.fire({
            text: response?.data?.message,
            icon: 'info',
            allowOutsideClick: false,
            // allowEscapeKey: false,
            showCancelButton: false,
            confirmButtonColor: '#0a0463',
            // cancelButtonColor: '#d33',
            confirmButtonText: 'OK!'
          }).then((result) => {
            
          });
          
        }

      }).catch(function (error) {

        if (error.response) {
          // // console.log("==>");
          setLoader("<a></a>")
          setLogin("Login")
          setLoginError("Wrong user credentials")
          document.getElementById("wrongUser_id").style.display = "block";
          /*
            * The request was made and the server responded with a
            * status code that falls out of the range of 2xx
            */

        } else if (error.request) {
          
          setLoader("<a></a>")
          setLogin("Login")
          setLoginError("Wrong user credentials")
          document.getElementById("wrongUser_id").style.display = "block";


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

  const handleClickShowPassword1 = () => {
    setShowPassword1( !showPassword1 );
  };

  const handleMouseDownPassword1 = (event) => {
    event.preventDefault();
  };
  const handleClickShowPassword = () => {
    setShowPassword( !showPassword );
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <div className="bg-light min-vh-100 min-vw-100 d-flex flex-row align-items-center">
      <CContainer>
      <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginBottom: '10px'
                    }}
                >
                    <img src={avatar9} className='mb-3' width="100%" />

                </Box>
        <CRow className="justify-content-center">
          <CCol lg={5} xl={5}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h5>Join Now</h5>
                    <p className="text-medium-emphasis">Welcome! Join your team!</p>

                    <TextField 
                    error={ error?.firstNameError }
                    id="firstName"
                    name = "firstName"
                    label="First Name"
                    variant="standard"
                    margin = "normal" 
                    type="text"
                    fullWidth
                    required
                    onChange={(e) => { (setFirstName(e.target.value)); (setError( {...error, ...{"firstNameError": false} }) ) }}  
                    />

                    <TextField 
                    error={ error?.lastNameError }
                    id="lastName"
                    name = "lastName"
                    label="Last Name"
                    variant="standard"
                    margin = "normal" 
                    type="text"
                    fullWidth
                    required
                    onChange={(e) => { (setLastName(e.target.value)); (setError( {...error, ...{"lastNameError": false} }) ) }} 
                    />

                    <TextField 
                    error={ error?.phoneError }
                    id="phone"
                    name = "phone"
                    label="Phone"
                    variant="standard"
                    margin = "normal" 
                    type="tel"
                    fullWidth
                    required
                    onChange={(e) => { (setPhone( (e.target.value).replace(/\s+/g, '') )); (setError( {...error, ...{"phoneError": false} }) ) }} 
                    />

                    <TextField
                    error={ error?.password1Error }
                    margin="normal"
                    required
                    fullWidth
                    name="password1"
                    label="Password"
                    type={ showPassword1 ? "text" : "password" }
                    id="standard-basic"
                    variant = "standard"
                    autoComplete="current-password"                    
                    onChange={(e) => { (setPassword1Var(e.target.value)); (setError( {...error, ...{"password1Error": false} }) ) }} 
                    InputProps={{
                    endAdornment: (
                        <InputAdornment position="end" >
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword1}
                            onMouseDown={handleMouseDownPassword1}
                            edge="end"
                          >
                            {showPassword1 ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                    ),
                    }}
                    />

                    <TextField
                    error={ error?.passwordError }
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Confirm Password"
                    type={ showPassword ? "text" : "password" }
                    id="standard-basic"
                    variant = "standard"
                    autoComplete="current-password"                    
                    onChange={(e) => { (setPasswordVar(e.target.value)); (setError( {...error, ...{"passwordError": false} }) ) }} 
                    InputProps={{
                    endAdornment: (
                        <InputAdornment position="end" >
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                    ),
                    }}
                    />
                    
                    <p className="text-medium-emphasis">{loginError}</p>
                    <CRow>
                      <CCol xs={12}>
                        
                      {login === "Login" ? 

                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={(e) => CheckLogin(e)}
                        className="bg-text-com-wp"
                        >
                        {login}
                        </Button>
                        :
                          <a dangerouslySetInnerHTML={{ __html: loader }}></a>
                        }
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>


            <Box
              sx={{
                // display: 'flex',
                // flexDirection: 'column',
                // alignItems: 'center',
                // marginBottom: '50px'
              }}
            >
              <p className='mt-10 text-center'> 
                <br />
                By clicking {'"'}{login}{'"'}, I agree to the Service Agreement, <a href='https://ventureinnovo.com/terms/'> Terms </a> of service and <a href='https://ventureinnovo.com/privacy/'>  Privacy </a> Policy. 
                <br />
                Already have an account? <a href='/login'> Sign in </a>
              </p>

            </Box>
          </CCol>
          
        </CRow>

      </CContainer>
    </div>
  )
}

export default JoinTeam
