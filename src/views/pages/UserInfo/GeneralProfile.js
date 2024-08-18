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


import { getSessionTimeout } from '../../../Utils/Utils';
import BasicInfo from './Profile/BasicInfo';
import College from './College.js/College';


const General = () => {
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
      <Nav tabs className="v-flow">
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
            <h6>Basic Information</h6>
          </NavLink>
        </NavItem>

      </Nav>
      <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="0" xs="0" md="2" lg="2" xl="2" className='mt-3 mr-0'> </Col>
              <Col sm="12" xs="12" md="8" lg="8" xl="8" id="tab-type2" className='ml-0'>
                <BasicInfo profileManage={"basic"} />
              </Col>
            </Row>
          </TabPane>
          
      </TabContent>
    </div>
  );
};

export default General;