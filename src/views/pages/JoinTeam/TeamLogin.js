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
import {TextField, InputLabel} from '@mui/material/';
import Button from '@mui/material/Button';
import { Col, Row } from 'reactstrap'
import Box from '@mui/material/Box';

import avatar9 from '../../../assets/brand/logo.svg'
// import "../login/generic.css"

const inviteData = JSON.parse(localStorage.getItem("inviteData"));
let permList = [
  "can_view_business_performance_metrics",
  "can_view_transactions",
  "can_export_transactions",
  "can_manage_refunds_&_disputes",
  "can_view_customers",
  "can_create_new_customers",
  "can_manage_&_update_customers",
  "can_view_customer_insights",
  "can_view_payouts",
  "can_export_payouts",
  "can_view_transfers",
  "can_export_transfers",
  "can_create_and_manage_transfers",
  "can_view_balance_history",
  "can_export_balance_history",
  "can_view_payment_pages",
  "can_create_and_manage_payment_pages",
  "can_view_products",
  "can_create_and_manage_products",
  "can_view_invoices",
  "can_create_and_manage_invoices",
  "can_view_subaccounts_&_splits",
  "can_create_and_manage_subaccounts_&_splits",
  "can_view_plans_&_subscriptions",
  "can_create_and_manage_plans_&_subscriptions",
  "can_view_business_settings_&_preferences",
  "can_edit_business_settings_&_preferences",
  "can_view_api_keys_&_webhooks",
  "can_manage_api_keys_&_webhooks",
  "can_view_users",
  "can_manage_and_invite_users",
  "can_view_bank_accounts_settings",
  "can_manage_bank_accounts_settings",
  "can_create_and_manage_charges",
  "can_pay_with_transfer_for_failed_refund"
];
const Login = () => {

  const [usernameVar, setUsernameVar] = useState("")
  const [passwordVar, setPasswordVar] = useState("")
  const [loader, setLoader] = useState("<div></div")
  const [login, setLogin] = useState("Login")
  const [loginError, setLoginError] = useState("")

  function CheckLogin(e) {
    e.preventDefault();

    // // console.log("fff", process.env.REACT_APP_BASE_API, passwordVar, usernameVar)

    if (usernameVar === "") {
      // document.getElementById("usernameError").style.display = "block";
    }
    else if (passwordVar === "") {
      document.getElementById("passwordErr").style.display = "block";
      document.getElementById("usernameError").style.display = "none";
    }
    else {
      setLogin("")
      setLoader('<div class="spinner-border "style="color: #e0922f;"></div>`')
      // console.log(" login ")
      let data = JSON.stringify({
        "username": usernameVar,
        "password": passwordVar
      });

      let config = {
        method: 'post',
        url: process.env.REACT_APP_BASE_API + "/auth/login/",
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
          // console.log(response?.data) 600000 == 10m
          let counter = 600000;
          
          const userData = {
            status: response.data.status,
            access: response?.data?.token,
            refresh: response?.data?.refresh,
            account: inviteData?.account_invited_to,
            availableBalance: response?.data?.availableBalance,
            currency: response?.data?.currency,
            firstname: response?.data?.firstname,
            lastname: response?.data?.lastname,
            other_names: response?.data?.other_names,
            gender: response?.data?.gender,
            id: response?.data?.id,
            nationalId: response?.data?.national_id_number,
            phone: response?.data?.phone.replaceAll('+', ""),
            photo: response?.data?.photo,
            photo150: response?.data?.photo150x150,
            photo50: response?.data?.photo50x50,
            wallet: response?.data?.team_list,
            role: response?.data?.role || "none",
            timeLogout: new Date(new Date().getTime() + counter),
            counter: counter,
            business_email: response?.data?.kyc?.business_email, 
            business_name: inviteData?.business_name?.toString(), 
            gps: response?.data?.kyc?.gps,
            business_TIN: response?.data?.kyc?.business_TIN,
            postal_address: response?.data?.kyc?.postal_address,
            NID_director_1: response?.data?.kyc?.NID_director_1,
            NID_director_2: response?.data?.kyc?.NID_director_2,
            bank_name: response?.data?.kyc?.bank_name,
            bank_account: response?.data?.kyc?.bank_account,
            bank_branch: response?.data?.kyc?.bank_branch,
            email: response?.data?.email,
            business_registration_docs: response?.data?.business_registration_docs,
            business_address: response?.data?.kyc?.business_address,
            permission_list: inviteData?.permissions_list,
            team_list: response?.data?.team_list, 

          };

          localStorage.setItem("userDataStore", JSON.stringify(userData));

          window.location.href = "/dashboard"; 

        }
        else {
          setLoginError("Wrong user credentials")
          document.getElementById("wrongUser_id").style.display = "block";
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
                      id="email"
                      name="email"
                      placeholder="Email"
                      variant="outlined"
                      margin="normal"
                      type="email"
                      fullWidth
                      required
                      onChange={(e) => { setUsernameVar(e.target.value) }}
                    />

                    <InputLabel shrink htmlFor="password"> </InputLabel>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      placeholder="Password "
                      type="password"
                      id="password"
                      // variant = "standard"
                      autoComplete="current-password"
                      onChange={(e) => { setPasswordVar(e.target.value) }}
                    />

                  </Box>
                </div>
              </Col>


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



            </CCol>
            <CCol xs="0" sm="0" md={0} lg="1" xl="1" ></CCol>
          </CRow>
          <div >
          </div>


        </CCardBody>
      </CCard>
      <Box >
        <p className='mt-10 text-center'>
          <br />
          <br />
          <a href='/signup'> Sign Up </a>
        </p>

      </Box>
    </CCol>
  </CRow>


</CContainer>
</div>
  )
}

export default Login
