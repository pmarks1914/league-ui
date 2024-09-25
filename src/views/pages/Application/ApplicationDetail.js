import React from 'react';
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


const userData = JSON.parse(localStorage.getItem("userDataStore"));
const applicantData = JSON.parse(localStorage.getItem("applicantData"));
console.log(applicantData, userData)



const ApplicationDetail = () => {
    return (
        <div className='d-flex justify-content-center' style={{ margin: '0px 0px 0px 0px' }}  >

            <Box style={{ width: '70%', margin: '0px 0px' }} >
                <CCard className='mt-5'>
                    <p className='d-flex justify-content-center mt-4 mb-2 '> <h4>Details: {applicantData?.applicant_full_name} </h4> </p>
                    <CListGroup flush>

                        <CListGroupItem>

                            <Row className='mb-0 d-flex'>
                                <Col sm="4" xm="4" md="4" lg="4" xl="4">
                                    <a >
                                        <p className="fs-6 fst-italic">Name</p>
                                    </a>
                                </Col>
                                <Col sm="4"></Col>
                                <Col sm="4">
                                    <a >
                                        {applicantData?.data?.student?.user?.last_name} {" "}
                                        {applicantData?.data?.student?.user?.first_name} {" "}
                                        {applicantData?.data?.student?.user?.other_name}
                                        <br /> 
                                        {applicantData?.data?.student?.user?.email}
                                    </a>
                                </Col>

                            </Row>

                        </CListGroupItem>

                        <CListGroupItem>

                            <Row className='mb-0 d-flex'>
                                <Col sm="4" xm="4" md="4" lg="4" xl="4">
                                    <a >
                                        <p className="fs-6 fst-italic"> Programme </p>
                                    </a>
                                </Col>
                                <Col sm="4"></Col>
                                <Col sm="4">
                                    <a >
                                        {applicantData?.applicant_program_name}
                                    </a>
                                </Col>

                            </Row>

                        </CListGroupItem>

                        <CListGroupItem>

                            <Row className='mb-0 d-flex'>
                                <Col sm="4" xm="4" md="4" lg="4" xl="4">
                                    <a >
                                        <p className="fs-6 fst-italic"> School</p>
                                    </a>
                                </Col>
                                <Col sm="4"></Col>
                                <Col sm="4">
                                    <a >
                                        {applicantData?.data?.programme?.school?.name || "N/A"}
                                    </a>
                                    <p>
                                        {applicantData?.data?.programme?.school?.description || "N/A"}
                                    </p>
                                </Col>

                            </Row>

                        </CListGroupItem>
                        {/* <CListGroupItem>
                            <Row className='mb-0 d-flex'>
                            
                            </Row>
                        </CListGroupItem> */}
                        

                        <CListGroupItem>

                            <Row className='mb-0 d-flex'>
                                <Col sm="4" xm="4" md="4" lg="4" xl="4">
                                    <a >
                                        <p className="fs-6 fst-italic"> Application progress  </p>
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

                        {
                            applicantData?.account?.family?.map((element, id) => {
                                return <CListGroupItem key={id}>
                                    <Row className='mb-0 d-flex'>
                                        <Col sm="4" xm="4" md="4" lg="4" xl="4">
                                            <a >
                                                <p className="fs-6 fst-italic"> Family {id + 1}  </p>
                                            </a>
                                        </Col>
                                        <Col sm="4"></Col>
                                        <Col sm="4">
                                            <a >
                                                {(element?.first_name + " " + element?.last_name  ) || "N/A"}                               
                                            </a>
                                        </Col>
                                    </Row>
        
                                </CListGroupItem>
                            })
                        }

                        {
                            applicantData?.account?.address?.map((element, id) => {
                                return <CListGroupItem key={id}>
                                    <Row className='mb-0 d-flex'>
                                        <Col sm="4" xm="4" md="4" lg="4" xl="4">
                                            <a >
                                                <p className="fs-6 fst-italic"> Address line {id + 1}  </p>
                                            </a>
                                        </Col>
                                        <Col sm="4"></Col>
                                        <Col sm="4">
                                            <a >
                                                {(element?.name) || "N/A"}                               
                                            </a>
                                        </Col>
                                    </Row>
        
                                </CListGroupItem>
                            })
                        }

                        {
                            applicantData?.account?.account_certificate?.map((element, id) => {
                                return <CListGroupItem key={id}>
                                    <Row className='mb-0 d-flex'>
                                        <Col sm="4" xm="4" md="4" lg="4" xl="4">
                                            <a >
                                                <p className="fs-6 fst-italic"> Certificate {id + 1} {"("}{element?.name}{")"} </p>
                                            </a>
                                        </Col>
                                        <Col sm="4"></Col>
                                        <Col sm="4">
                                            <a href={element?.file_attachment} target="_blank" rel='noreferrer'>
                                                {(element?.file_attachment) || "N/A"}                               
                                            </a>
                                        </Col>
                                    </Row>
        
                                </CListGroupItem>
                            })
                        }



                    </CListGroup>
                </CCard>


            </Box>
        </div>
    );
};

export default ApplicationDetail;