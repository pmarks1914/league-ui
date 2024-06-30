import React, { useEffect, useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Label, ButtonGroup, Badge } from 'reactstrap'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CAccordion,
    CAccordionBody,
    CAccordionHeader,
    CAccordionItem,
    CButton,
    CCardGroup,
    CContainer
} from '@coreui/react';
import Button from '@mui/material/Button';
import Select, { components } from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios"


const userData = JSON.parse(localStorage.getItem('userDataStore'));

const College = () => {
    const [collegeInformation, setCollegeInformation] = useState(null)
    const [schoolInformation, setSchoolInformation] = useState(null)    
    const [getFormData, setGetFormData] = useState(null)

    useEffect(() => {
        // 
        getSchoolInfo()
    }, [])
    let transformProgramData = Object.keys(schoolInformation || []).map((post, id) => {
        return {
            "id": id + 1,
            "programId": schoolInformation[id]?.id,
            "value": schoolInformation[id]?.name,
            "label": schoolInformation[id]?.name,
            "description": schoolInformation[id]?.description,
            // "icon": ,
            // "image": schoolInformation[id]?.flag
        }
    })
    // console.log("schoolInformation ", getFormData)

    function setProgramInfo(e){
        setGetFormData({...getFormData, ...{ "programName": e.value, "programId": e.programId, "department": e.department, "description": e.description }})
    }
    function getSchoolInfo() {
        let config = {
            method: "get",
            url: process.env.REACT_APP_BASE_API + "/schools",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userData?.token
            },
        };
        axios(config).then(response => {
            console.log(response?.data);
            setCollegeInformation(response?.data?.data)
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

    function getProgramInfo(schoolId, schoolInfo) {
        setGetFormData({...getFormData, ...{ "schoolId": schoolId }})
        setSchoolInformation(schoolInfo?.programme)
    } 

    function applyProgram(programmeData) {

        console.log("school-programme", programmeData)
        let config = {
            method: "post",
            maxBodyLength: "Infinity",
            url: process.env.REACT_APP_BASE_API + "/programme",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userData?.token
            },
            data: {
                "description": programmeData?.description,
                "name": programmeData?.programName,
                "school_id": programmeData?.schoolId
            }
        };
        axios(config).then(response => {
            // console.log(response?.data);

            toast.success(response?.data.message, {
                position: toast.POSITION.TOP_CENTER
            });
            setGetFormData({...getFormData, ...{ "programName": "", "department": "", "programId": "" }})
            // setSchoolInformation(response?.data)
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
        <div className='mt-5'>
            <ToastContainer />
            <CAccordion activeItemKey={1} className="mt-0">

            {
                collegeInformation?.length ?
                    collegeInformation?.map((post, id) => 
                        (
                            <CAccordionItem key={id+1} itemKey={post.id} >
                                <CAccordionHeader onClick={()=>getProgramInfo(post?.id, post) }> {post?.name} </CAccordionHeader>
                                <CAccordionBody>
                                    <CRow>
                                    </CRow>
                                    <CRow>
                                        <CCol xs="8" sm="8" md={8} lg={8} className="mt-1" >
                                            {/*  */}
                                            <bold className="text-uppercase fs-6" >School Bio </bold>
                                            <p>
                                                {post?.description}
                                            </p>
                                            <p>
                                                {getFormData?.description ? <bold className="text-uppercase fs-6" >Program description </bold> : "" } 
                                                { getFormData?.description?.length > 1 ? <br /> : ""}
                                                { getFormData?.description?.length > 1 ? getFormData?.description : ""}
                                                
                                            </p>

                                        </CCol>
                                        <CCol xs="4" sm="4" md={4} lg={4} className="mt-1" >
                                            <img src={post?.banner} alt="School Image" width="40%" />
                                            <br />
                                            {post?.organization_address?.country} { post?.organization_address?.country?.length > 1 ? <br /> : ""}
                                            {post?.organization_address?.town} { post?.organization_address?.town?.length > 1 ? <br /> : ""}
                                            {post?.organization_address?.city} { post?.organization_address?.city?.length > 1 ? <br /> : ""}
                                            {post?.organization_address?.address} { post?.organization_address?.address?.length > 1 ? <br /> : ""}
                                            {post?.organization_address?.street_name} { post?.organization_address?.street_name?.length > 1 ? <br /> : ""}
                                            {post?.organization_email} { post?.organization_email?.length > 1 ? <br /> : ""}
                                            {post?.organization_phone} { post?.organization_phone?.length > 1 ? <br /> : ""}
                                            {post?.website ? <a href={post?.website} target="_blank" rel="noreferrer" >  {post?.website} </a> : "" } { post?.website?.length > 1 ? <br /> : ""}
                                            <p className='mb-3'></p>
                                            {getFormData?.department ? `Department name: ${getFormData?.department}` : "" } { getFormData?.department?.length > 1 ? <br /> : ""}
                                            {getFormData?.programName ? `Program name: ${getFormData?.programName}` : "" } { getFormData?.programName?.length > 1 ? <br /> : ""}
                                            
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol xs="8" sm="8" md={8} lg={8} className="mt-1" >
                                            {/*  */}
                                        </CCol>
                                        <CCol xs="4" sm="4" md={4} lg={4} className="mt-1" >

                                            <Label for="program" className="label-dc"> </Label>
                                            <Select
                                                placeholder={"Select program"}
                                                options={transformProgramData}
                                                id="program"
                                                className='other-input-select d-filters wp-cursor-pointer'
                                                onChange={(e) => setProgramInfo(e)}
                                            />
                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                sx={{ mt: 3, mb: 2 }}
                                                // style={{ color: "#fff" }}
                                                // className="bg-text-com-wp"
                                                onClick={(e) => applyProgram(getFormData)}
                                                >
                                                Apply
                                            </Button>
                                        </CCol>
                                    </CRow>
                                </CAccordionBody>
                            </CAccordionItem>
                        )
                    )
                    : ""
            }
            </CAccordion>
        </div>
    );
};

export default College;



