import React, { useEffect, useState } from 'react'
import $ from 'jquery'
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-buttons/js/dataTables.buttons.js";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-buttons/js/buttons.flash.js";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons/js/buttons.print.js";
import '../../datatable/table.css';
import { userGetData } from '../Data/PageData';
import UserManagementDataTables from './UserManagementDataTables'
import axios from 'axios';

let currentUser = JSON.parse(localStorage.getItem("userDataStore")); 

// let transactionData = getTransactionData();
// let transaction = []
// transactionData?.transaction?.then(value => { (transaction = value) });

const UserManagement = () => {
    const [dataDetails, setDataDetails] = useState()
    const [roleData, setRoleData] = useState({})

    useEffect(() => { 
        // 
        // let apikey_data = apikeyData();
        // apikey_data?.apikey?.then(value => { setApikeyDetails(value) });

        let userGetInfoData = userGetData();
        userGetInfoData?.userGetData?.then(value => { setDataDetails(value) });

        // console.log("currentUser ", currentUser)
        // let data = '';
        // let config_roles = {
        //     method: 'get',                    
        //     url: process.env.REACT_APP_BASE_API + "/roles/" + currentUser?.account + "/",
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': 'Bearer ' + currentUser?.token
        //     },
        //     data: data
        // };
        // axios(config_roles).then(response => {
        //     // console.log("data 1 ==", response?.data);
        //     if (response?.data?.status === true) {
        //         // 
        //         // console.log("g>>>", response?.data?.data)
        //         setRoleData(response?.data)

        //     }
        //     else{
        //         // Swal.fire({
        //         //     title: 'Oops',
        //         //     html: "<div class='pb-0 pt-0'> Invalid User</div>",
        //         //     icon: 'error',
        //         //     showCancelButton: false,
        //         //     showConfirmButton: false,
        //         //     allowOutsideClick: false,
        //         // }).then((result) => {
        //         //     // 
        //         // })
        //     }
            

        // }).catch(function (error) {
        //     // 
        //     if(error){
        //         // Swal.fire({
        //         //     title: 'Application Error',
        //         //     title: 'Oops',
        //         //     html: "<div class='pb-0 pt-0'> Try again later </div>",
        //         //     icon: 'warning',
        //         //     showCancelButton: false,
        //         //     showConfirmButton: false,
        //         //     allowOutsideClick: false,
        //         //     // cancelButtonColor: '#d33',
        //         //     // timer: 4000
        //         // }).then((result) => {
        //         //     // 
        //         // })
        //     }
        //     if (error.response) {
        //         // // console.log("==");
        //         /*
        //         * The request was made and the server responded with a
        //         * status code that falls out of the range of 2xx
        //         */

        //     } else if (error.request) {
        //         /*
        //         * The request was made but no response was received, `error.request`
        //         * is an instance of XMLHttpRequest in the browser and an instance
        //         * of http.ClientRequest in Node.js
        //         */

        //     } else {
        //         // Something happened in setting up the request and triggered an Error

        //     }
        // });

    }, [])


    return (
        <div>
            {/* open modal for filter date range */}
            {/* <CButton onClick={() => setModal1(!modal1)} icon={cilArrowRight} className="float-end" >Filter</CButton> */}
            <br /><br />
            <UserManagementDataTables dataDetails={dataDetails} />

        </div>
    )
}

export default UserManagement;