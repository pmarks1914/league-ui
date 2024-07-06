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


import { getSessionTimeout } from '../../../Utils/Utils';
import BasicInfo from './Profile/BasicInfo';
import College from './College.js/College';

let date = new Date();
// let dateYearInterval = 100;
// let i = 1;s

// const createOption = (label, dataId) => ({
//   label,
//   value: dataId,
// });
let optionsFinYear = [...Array(100)].map((x, i) => {
  return ({ value: (date.getUTCFullYear() - 100 + 1 + i), label: (date.getUTCFullYear() - 100 + 1 + i), key: i + 1 })
  // return createOption( (date.getUTCFullYear()-100+1+i), (date.getUTCFullYear()-100+1+i) )
}
);
const optionsFinMonth = [
  // {value: "", label: "Select Fin-Month", icon: "", isDisabled: true },
  { value: "January", label: "January", key: 1 },
  { value: "February", label: "February", key: 2 },
  { value: "March", label: "March", key: 3 },
  { value: "April", label: "April", key: 4 },
  { value: "May", label: "May", key: 5 },
  { value: "June", label: "June", key: 6 },
  { value: "July", label: "July", key: 7 },
  { value: "August", label: "August", key: 8 },
  { value: "September", label: "September", key: 9 },
  { value: "October", label: "October", key: 10 },
  { value: "November", label: "November", key: 11 },
  { value: "December", label: "December", key: 12 },
];

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
            <h6>Profile</h6>
          </NavLink>
        </NavItem>
        <br /><br />
      </Nav>
      <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="4" xs="4" md="2" lg="2" xl="2" className='mt-5 mr-0 bg-white'>
                <Nav className="mt-4">
                  <NavItem className='w-100' onClick={()=> setManageProfileSwitch("basic")} >
                    <NavLink className='border border-top-primary'>
                      Basic Information 
                    </NavLink>
                  </NavItem>
                  <NavItem className='w-100' onClick={()=> setManageProfileSwitch("education")} >
                    <NavLink className='border border-top-primary'>
                      Education Information
                    </NavLink>
                  </NavItem>
                  {/* <NavItem className='w-100' onClick={()=> setManageProfileSwitch("family")} >
                    <NavLink className='border border-top-primary'>
                      Family Information
                    </NavLink>
                  </NavItem> */}
                </Nav>
              </Col>
              <Col sm="8" xs="8" md="8" lg="8" xl="8" id="tab-type2" className='ml-0'>
                <BasicInfo profileManage={manageProfileSwitch} />
              </Col>
              <Col sm="0" xs="0" md="2" lg="2" xl="2" className='ml-0'>
              </Col>
            </Row>
          </TabPane>
      </TabContent>
    </div>
  );
};

export default General;