import axios from "axios";
import React from "react";
import moment from 'moment';

const userData = JSON.parse(localStorage.getItem("userDataStore"));
let loader = '<div class="spinner-border dashboard-loader" style="color: #e0922f;"></div>'

export function getSchData(){

    // /939e8b7b-ce5c-421f-b635-a88dc14fcb32/ 
    let data = '';
    let config_sch = {}
    console.log(window.location )
    if(userData?.type === "Student"){
        if(window.location.pathname === '/dashboard'){
            config_sch = {
                method: 'get',
                url: process.env.REACT_APP_BASE_API + "/application-by-student-last-five/" + userData?.user?.student_id + "?per_page=5&page=1",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + userData?.token
                },
                data: data
            };

        }
        else{
            config_sch = {
                method: 'get',
                url: process.env.REACT_APP_BASE_API + "/application-by-student/" + userData?.user?.student_id,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + userData?.token
                },
                data: data
            };
        }
    }
    else if(userData?.type === "School"){
        config_sch = {
            method: 'get',
            url: process.env.REACT_APP_BASE_API + "/admission/organization/" + userData?.organization_id + "/",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userData?.token
            },
            data: data
        };
    }

    function schDetails(){
        return axios(config_sch).then(response => {
            // console.log("data ==", response?.data);
            if (response.status === 200) {
                // 
                return response.data;
            }
            return

        }).catch(function (error) {

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
        }
        );

    }
 
    
    return {
        "list": schDetails(),
    }
}
export function getApplication(){

    let data = '';
    let config_sch = {}
    if(userData?.type === "Student"){
        config_sch = {
            method: 'get',
            url: process.env.REACT_APP_BASE_API + "/application-by-student/" + userData?.user?.student_id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userData?.token
            },
            data: data
        };
    }

    let dataSource = axios(config_sch).then(response => {
    //   console.log("data getApplication data api ==", response);
        <a dangerouslySetInnerHTML={{ __html: loader }}></a>
        if (response.status === 200) {
              console.log("data source sch ====", response?.data?.data);
            if(response?.data){loader = "<a></>";}
                
            <a dangerouslySetInnerHTML={{ __html: loader }}></a>;

            let tableData = response?.data?.data;
            let transformData = Object.keys(tableData)?.map((post, id) => {
                return {
                  "ID": id+1,
                  "applicant_full_name": tableData[id]?.description, 
                  "account_dob": tableData[id]?.description,
                  "account_photo": tableData[id]?.description,
                  "progress": (tableData[id]?.progress ? tableData[id]?.progress : 25),
                  "applicant_last_name": tableData[id]?.account?.user?.last_name,
                  "applicant_phone": tableData[id]?.account?.user?.phone,
                  "applicant_email": tableData[id]?.account?.user?.email,
                  "applicant_program_description": tableData[id]?.programme?.description,
                  "applicant_program_name": tableData[id]?.programme?.name,
                  "applicant_program_end_date": moment(tableData[id]?.programme?.end_date)?.format('LLLL'),
                  "applicant_program_start_date": moment(tableData[id]?.programme?.start_date)?.format('LLLL'),
                  "applicant_program_id": tableData[id]?.programme?.id,
                  "account": tableData[id]?.account,
                  "status": tableData[id]?.status,
                  "action": "View",
                  "data": (tableData[id]),
                  
                //   "action": `<a href= ${'/payroll/salary/'}${tableData[id]?.payrollID} > View </a> ` 
                }
              })
            return transformData;
        }
        return

    }).catch(function (error) {

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
    }
    );
    
    console.log("before return-------->>> ", dataSource)
    return {
        "list": dataSource
    }
}
export function getEvaluation(){

    let data = '';
    let config_sch = {}
    if(userData?.type === "Student"){
        config_sch = {
            method: 'get',
            url: process.env.REACT_APP_BASE_API + "/evaluation-by-student/" + userData?.user?.student_id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userData?.token
            },
            data: data
        };
    }

    let dataSource = axios(config_sch).then(response => {
    //   console.log("data getApplication data api ==", response);
        <a dangerouslySetInnerHTML={{ __html: loader }}></a>
        if (response.status === 200) {
              console.log("data source sch ====", response?.data?.data);
            if(response?.data){loader = "<a></>";}
                
            <a dangerouslySetInnerHTML={{ __html: loader }}></a>;

            let tableData = response?.data?.data;
            let transformData = Object.keys(tableData)?.map((post, id) => {
                return {
                  "ID": id+1,
                  "applicant_full_name": tableData[id]?.description, 
                  "account_dob": tableData[id]?.description,
                  "account_photo": tableData[id]?.description,
                  "progress": (tableData[id]?.progress ? tableData[id]?.progress : 25),
                  "applicant_last_name": tableData[id]?.account?.user?.last_name,
                  "applicant_phone": tableData[id]?.account?.user?.phone,
                  "applicant_email": tableData[id]?.account?.user?.email,
                  "applicant_program_description": tableData[id]?.programme?.description,
                  "applicant_program_name": tableData[id]?.programme?.name,
                  "applicant_program_end_date": moment(tableData[id]?.programme?.end_date)?.format('LLLL'),
                  "applicant_program_start_date": moment(tableData[id]?.programme?.start_date)?.format('LLLL'),
                  "applicant_program_id": tableData[id]?.programme?.id,
                  "account": tableData[id]?.account,
                  "status": tableData[id]?.status,
                  "action": "View",
                  "data": (tableData[id]),
                  
                //   "action": `<a href= ${'/payroll/salary/'}${tableData[id]?.payrollID} > View </a> ` 
                }
              })
            return transformData;
        }
        return

    }).catch(function (error) {

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
    }
    );
    
    // console.log("before return-------->>> ", dataSource)
    return {
        "list": dataSource
    }
}