import React, { useEffect, useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Label } from 'reactstrap'
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
} from '@coreui/react'
import { DocsCallout, DocsExample } from 'src/components'
import classnames from 'classnames';
// import './gen.css';
import $ from 'jquery';
import Select, { components } from 'react-select';
import { ToastContainer, toast } from 'react-toastify';


import { getSessionTimeout } from '../../../Utils/Utils';
import EditSubmittedEvaluationInfo from './Profile/EditSubmittedEvaluationInfo';
import College from './College.js/College';
import PaginatedCardList from './PaginatedCardList';


const EditSubmittedEvaluationProfile = () => {
  const [activeTab, setActiveTab] = useState('1');

  const [getCount, setGetCount] = useState(1)

  // manage profile switches for items - tab 2
  // basic info, education info, family info
  const [manageProfileSwitch, setManageProfileSwitch] = useState("basic")

  useEffect(() => {
    getSessionTimeout();
  }, [])

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
    setGetCount(2);
    if (tab === '1' || tab === '14' || "212") {
      // document.getElementById("fin-month-id").style.display = "block";
    }
    else {
      // document.getElementById("fin-month-id").style.display = "none";
    }
  }
  function trackActivity() {
    // e.preventDefault(); 
    getSessionTimeout();
    const currentUser_new = JSON.parse(localStorage.getItem("userDataStore"));
    if (currentUser_new) {
      currentUser_new["timeLogout"] = new Date().getTime() + currentUser_new?.counter;
      localStorage.setItem('userDataStore', JSON.stringify(currentUser_new))
    }
  }

  window.onclick = function (event) {
    // event.preventDefault()
    trackActivity()
  }
  return (
    <div className="App">
      <ToastContainer />
      <Nav tabs className="v-flow">
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); setManageProfileSwitch("education") }}
          >
            <h6>Educational Information</h6>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); setManageProfileSwitch("additional") }}
          >
            <h6> Additional Documents </h6>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => { toggle('3'); setManageProfileSwitch("other") }}
          >
            <h6> Other Information </h6>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="0" xs="0" md="2" lg="2" xl="2" className='mt-3 mr-0'> </Col>
              <Col sm="12" xs="12" md="8" lg="8" xl="8" id="tab-type2" className='ml-0'>
                <EditSubmittedEvaluationInfo profileManage={"education"} />
              </Col>
            </Row> 
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="0" xs="0" md="2" lg="2" xl="2" className='mt-3 mr-0'> </Col>
              <Col sm="12" xs="12" md="8" lg="8" xl="8" id="tab-type2" className='ml-0'>
                <EditSubmittedEvaluationInfo profileManage={"additional"} />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="3">
            <Row>
              <Col sm="0" xs="0" md="2" lg="2" xl="2" className='mt-3 mr-0'> </Col>
              <Col sm="12" xs="12" md="8" lg="8" xl="8" id="tab-type2" className='ml-0'>
                <EditSubmittedEvaluationInfo profileManage={"other"} />
              </Col>
            </Row>
          </TabPane>
      </TabContent>

      {/* <PaginatedCardList /> */}
    </div>
  );
};

export default EditSubmittedEvaluationProfile;