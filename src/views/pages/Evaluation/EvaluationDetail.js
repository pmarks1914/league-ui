import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import {
    CBadge,
    CCard,
    CCardBody,
    CCardFooter,
    CCardGroup,
    CCardHeader,
    CCardImage,
    CCardLink,
    CCardSubtitle,
    CCardText,
    CCardTitle,
    CButton,
    CListGroup,
    CListGroupItem
} from '@coreui/react';
import HomeIcon from '@mui/icons-material/Home';
import moment from 'moment';
import { Col, Row } from 'reactstrap';
import axios from 'axios';


const userData = JSON.parse(localStorage.getItem("userDataStore"));
const applicantData = JSON.parse(localStorage.getItem("applicantData"));
// console.log(applicantData, userData)


const EvaluationDetail = () => {

    const [evaluationData, setEvaluationData] = useState({})

    useEffect(() => {
        getFuncEvaluation()
    }, [])
    // console.log("evaluationData ", JSON.stringify(evaluationData))

    function getFuncEvaluation() {
        // 
        let config = {
            method: 'get',
            url: process.env.REACT_APP_BASE_API + "/evaluation/" + window.location.pathname.split('/')[2],
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userData?.token
            },
            data: {}
        };

        axios(config).then(response => {
            //   console.log("data getApplication data api ==", response);

            if (response.status === 200) {
                console.log("data source sch ====", response?.data);
                if (response?.data?.data) {
                    setEvaluationData(response?.data?.data)
                }

            }


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

    // Close the dropdown if the user clicks outside of it
    window.onclick = function (event) {
        // event.preventDefault()
        trackActivity();
    }
    function funEdit(rowIndexData) {

        // setTimeout(()=>{
        window.location.href = '/evaluation-detail/' + "/"
        // }, 1000)


    }

    function trackActivity() {
        // e.preventDefault();
        // getSessionTimeout();
        const currentUser_new = JSON.parse(localStorage.getItem("userDataStore"));
        if (currentUser_new) {
            currentUser_new["timeLogout"] = new Date().getTime() + currentUser_new?.counter;
            localStorage.setItem('userDataStore', JSON.stringify(currentUser_new))
        }
    }
    return (
        <div className='d-flex justify-content-center' style={{ margin: '0px 0px 0px 0px' }}  >
            {/* <Counter /> */}
            <Box style={{ width: '70%', margin: '0px 0px' }} >
                {/* <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}> */}

                {
                    evaluationData?.evaluation_info ?
                    <CCard className='mt-5'>
                        <p className='d-flex justify-content-center mt-2 mb-2 '> <h4>Details: {applicantData?.applicant_full_name} </h4> </p>
                        <CListGroup flush>
                            <CListGroupItem>
                                <Row className='mb-0 d-flex'>
                                    <Col sm="4" xm="4" md="4" lg="4" xl="4">
                                        <a >
                                            <p className="fs-6 fst-italic"> Evaluation progress  </p>
                                        </a>
                                    </Col>
                                    <Col sm="4"></Col>
                                    <Col sm="4">
                                        <a >
                                            {applicantData?.progress || 0}{"%"}
                                        </a>
                                    </Col>
                                </Row>
                            </CListGroupItem>
                            <CListGroupItem>
                                <Row className='mb-0 d-flex'>
                                    <Col sm="4" xm="4" md="4" lg="4" xl="4">
                                        <a >
                                            <p className="fs-6 fst-italic"> Files submitted  </p>
                                        </a>
                                    </Col>
                                    <Col sm="4"></Col>
                                    <Col sm="4">
                                        { (evaluationData?.evaluation_info?.transcript)?.length > 0 ? [<a href={evaluationData?.evaluation_info?.transcript } target='_blank' rel="noreferrer" key={1}> transcript </a>, <br key={2}/>] : '' }
                                        { (evaluationData?.evaluation_info?.certificate)?.length > 0 ? [<a href={evaluationData?.evaluation_info?.certificate } target='_blank' rel="noreferrer" key={1}> certificate </a>, <br key={2}/>] : '' }
                                        { (evaluationData?.evaluation_info?.identification)?.length > 0 ? [<a href={evaluationData?.evaluation_info?.identification } target='_blank' rel="noreferrer" key={1}> identification </a>, <br key={2}/>] : '' }
                                        { (evaluationData?.evaluation_info?.report)?.length > 0 ? [<a href={evaluationData?.evaluation_info?.report } target='_blank' rel="noreferrer" key={1}> Report </a>, <br key={2}/>] : '' } 
                                        { (evaluationData?.evaluation_info?.recommendation)?.length > 0 ? [<a href={evaluationData?.evaluation_info?.recommendation } target='_blank' rel="noreferrer" key={1}> recommendation </a>, <br key={2}/>] : '' } 
                                        { (evaluationData?.evaluation_info?.photo)?.length > 0 ? [<a href={evaluationData?.evaluation_info?.photo } target='_blank' rel="noreferrer" key={1}> photo </a>, <br key={2}/>] : '' } 
    
                                    </Col>
                                </Row>
                            </CListGroupItem>
                            <CListGroupItem>
                                <Row className='mb-0 d-flex'>
                                    <Col sm="4" xm="4" md="4" lg="4" xl="4">
                                        <a >
                                            <p className="fs-6 fst-italic"> Basic info  </p>
                                        </a>
                                    </Col>
                                    <Col sm="4"></Col>
                                    <Col sm="4">
                                        <a > {evaluationData?.evaluation_info?.first_name} {evaluationData?.evaluation_info?.other_name} {evaluationData?.evaluation_info?.last_name}  </a> <br />
                                        <a > {evaluationData?.evaluation_info?.email} </a> <br />
                                        <a > {evaluationData?.evaluation_info?.phone} </a> <br />
                                        <a > {evaluationData?.evaluation_info?.email} </a> <br />
                                        <a > {evaluationData?.evaluation_info?.email} </a>
                                    </Col>
                                </Row>
                            </CListGroupItem>
                            <CListGroupItem>
                                <Row className='mb-0 d-flex'>
                                    <Col sm="4" xm="4" md="4" lg="4" xl="4">
                                        <a >
                                            <p className="fs-6 fst-italic"> Address  </p>
                                        </a>
                                    </Col>
                                    <Col sm="4"></Col>
                                    <Col sm="4">
                                        <a > {evaluationData?.evaluation_info?.country}  </a> <br />
                                        <a > {evaluationData?.evaluation_info?.town} </a> <br />
                                        <a > {evaluationData?.evaluation_info?.city} </a> <br />
                                        <a > ({evaluationData?.evaluation_info?.lat || 0}, {evaluationData?.evaluation_info?.lon || 0} ) </a> <br />
                                        <a > {evaluationData?.evaluation_info?.address} </a>
                                    </Col>
                                </Row>
                            </CListGroupItem>
                            <CListGroupItem>
                                <Row className='mb-0 d-flex'>
                                    <Col sm="4" xm="4" md="4" lg="4" xl="4">
                                        <a >
                                            <p className="fs-6 fst-italic"> Educational info  </p>
                                        </a>
                                    </Col>
                                    <Col sm="4"></Col>
                                    <Col sm="4">
                                        <a > {evaluationData?.evaluation_info?.degree_obtained} </a> <br />
                                        <a > {evaluationData?.evaluation_info?.major_study} </a> <br />
                                        <a > {evaluationData?.evaluation_info?.institution_name} </a> <br />
                                        <a > {evaluationData?.evaluation_info?.department_office} </a> <br />
                                        <a > {evaluationData?.evaluation_info?.gpa} </a>
                                    </Col>
                                </Row>
                            </CListGroupItem>
                            <CListGroupItem>
                                <Row className='mb-0 d-flex'>
                                    <Col sm="4" xm="4" md="4" lg="4" xl="4">
                                        <a >
                                            <p className="fs-6 fst-italic"> Purpose evaluation </p>
                                        </a>
                                    </Col>
                                    <Col sm="4"></Col>
                                    <Col sm="4">
                                        <a > {evaluationData?.evaluation_info?.purpose_evaluation} </a> <br />
                                    </Col>
                                </Row>
                            </CListGroupItem>
                            <CListGroupItem>
                                <Row className='mb-0 d-flex'>
                                    <Col sm="4" xm="4" md="4" lg="4" xl="4">
                                        <a >
                                            <p className="fs-6 fst-italic">  Payment method  </p>
                                        </a>
                                    </Col>
                                    <Col sm="4"></Col>
                                    <Col sm="4">
                                        <a > {evaluationData?.evaluation_info?.payment_method} </a> <br />
                                        <a > {evaluationData?.evaluation_info?.billing_address} </a> <br />
                                    </Col>
                                </Row>
                            </CListGroupItem>
                            <CListGroupItem>
                                <Row className='mb-0 d-flex'>
                                    <Col sm="4" xm="4" md="4" lg="4" xl="4">
                                        <a >
                                            <p className="fs-6 fst-italic">  Reference  </p>
                                        </a>
                                    </Col>
                                    <Col sm="4"></Col>
                                    <Col sm="4">
                                        <a > {evaluationData?.evaluation_info?.reference_email} </a> <br />
                                        <a > {evaluationData?.evaluation_info?.reference_phone} </a> <br />
                                    </Col>
                                </Row>
                            </CListGroupItem>
                            <CListGroupItem>
                                <Row className='mb-0 d-flex'>
                                    <Col sm="4" xm="4" md="4" lg="4" xl="4">
                                        <a >
                                            <p className="fs-6 fst-italic">  Contact person  </p>
                                        </a>
                                    </Col>
                                    <Col sm="4"></Col>
                                    <Col sm="4">
                                        <a > {evaluationData?.evaluation_info?.contact_person} </a> <br />
                                        <a > {evaluationData?.evaluation_info?.contact_person_email} </a> <br />
                                    </Col>
                                </Row>
                            </CListGroupItem>
                            <CListGroupItem>
                                <Row className='mb-0 d-flex'>
                                    <Col sm="4" xm="4" md="4" lg="4" xl="4">
                                        <a >
                                            <p className="fs-6 fst-italic">  Verification consent  </p>
                                        </a>
                                    </Col>
                                    <Col sm="4"></Col>
                                    <Col sm="4">
                                        <a > {evaluationData?.evaluation_info?.verification_status} </a> <br />
                                    </Col>
                                </Row>
                            </CListGroupItem>
                            <CListGroupItem>
                                <Row className='mb-0 d-flex'>
                                    <Col sm="4" xm="4" md="4" lg="4" xl="4"> </Col>
                                    <Col sm="4"></Col>
                                    <Col sm="4">
                                        <a href={`/evaluation-edit/${evaluationData?.id}`} > Edit </a> <br />
                                    </Col>
                                </Row>
                            </CListGroupItem>
    
    
    
    
                        </CListGroup>
                    </CCard>
           
                : "" }


            </Box>
        </div>
    );
};

export default EvaluationDetail;
