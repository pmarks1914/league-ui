import React, { useState } from 'react';
import Dtable from './Dtable';

import axios from "axios"
import Swal from 'sweetalert2'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CCol, CRow } from '@coreui/react';
// import { getEvaluation } from 'src/views/dashboard/DashboardData';


const userData = JSON.parse(localStorage.getItem("userDataStore"));

const Evaluation = () => {
    // let userGetInfo = []
    // let userGetInfoData = getEvaluation();
    // userGetInfoData?.list?.then(value => { userGetInfo=value });

    const [pushData, setPushData] = useState(false)
    //   console.log("userData ", userData)

    function requestEvaluation() {

        Swal.fire({
            // title: 'Successfully created!',
            text: "Proceed to request for evaluation, provide a description",
            icon: "info",
            allowOutsideClick: false,
            // allowEscapeKey: false,
            showCancelButton: true,
            cancelButtonColor: 'danger',
            confirmButtonColor: 'primary',
            confirmButtonText: 'Confirm',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showLoaderOnConfirm: true,
            preConfirm: (description) => {
                // otpCodecription = otpCode
                if (description === "") {
                    Swal.showValidationMessage(
                        `Request failed! description is required.`
                    )
                }
                else {
                    evaluationApply(description)
                }
            },
        }).then((result) => {
            if (result.isConfirmed) {
            }
        });
    }
    function evaluationApply(description) {
        let config = {
            method: "post",
            url: process.env.REACT_APP_BASE_API + "/evaluation",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userData?.token
            },
            data: {
                "name": userData?.user?.first_name?.trim() + " " + "Evaluation Request",
                "description": description?.trim()
            }
        };
        axios(config).then(response => {
            // console.log(response?.data);
            toast.success(response?.data?.message, {
                position: toast?.POSITION?.TOP_CENTER
            });
            setPushData(true)
        }).catch(function (error) {

            if (error.response) {
                // // console.log("==>");
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
        }
        );

    }

    return (
        <>      
         <ToastContainer />
        {
            userData?.type === 'Student =====' ?
                <a href='#' className='justify-content-between align-items-center text-white bg-dark rounded-1 p-2' onClick={() => requestEvaluation()}> Request evaluation </a>
                : ""
        }


            <Dtable pushData={pushData} />
        </>
    );
};

export default Evaluation;