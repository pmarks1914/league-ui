import React, { useEffect, useState } from 'react'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CWidgetStatsB,
} from '@coreui/react'
import { CChartLine, CChartPie } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
  cil4k,
  cilAlbum,
} from '@coreui/icons'

import moment from 'moment';

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
// import Datatable from '../datatable/DatatableMain'
import { getSchData } from './DashboardData'
import { getSessionTimeout } from '../../Utils/Utils';
import { Badge } from 'reactstrap'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from "axios"
import Swal from 'sweetalert2'
import { getApplication } from './DashboardData';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

let salaryGetAll = getApplication();
const userData = JSON.parse(localStorage.getItem("userDataStore"));
// console.log(" >>><<<", userData)
const Dashboard = () => {
  const [schDetails, setSchDetails] = useState(null)
  const [applicationAction, setApplicationAction] = useState(1)

  const [products, setProducts] = useState([]);

  useEffect(() => {
    // 
    
    let schData = getSchData();
    schData?.list?.then(value => { setSchDetails(value) });
    trackActivity();

  }, [applicationAction])
  // console.log("summarry products", products)
  useEffect(() => {
    salaryGetAll.list.then(value => setProducts( value ) )
  }, []);

  const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

  const progressExample = [
    { title: 'Total', value: '29', percent: 40, color: 'success' },
    { title: 'Unique', value: '24', percent: 20, color: 'info' },
    // { title: 'Pageviews', value: '78.706 Views', percent: 60, color: 'warning' },
    // { title: 'New Users', value: '22.123 Users', percent: 80, color: 'danger' },
    // { title: 'Bounce Rate', value: 'Average Rate', percent: 40.15, color: 'primary' },
  ]

  const progressGroupExample1 = [
    { title: 'Monday', value1: 34, value2: 78 },
    { title: 'Tuesday', value1: 56, value2: 94 },
    { title: 'Wednesday', value1: 12, value2: 67 },
    { title: 'Thursday', value1: 43, value2: 91 },
    { title: 'Friday', value1: 22, value2: 73 },
    { title: 'Saturday', value1: 53, value2: 82 },
    { title: 'Sunday', value1: 9, value2: 69 },
  ]

  const progressGroupExample2 = [
    { title: 'Male', icon: cilUser, value: 53 },
    { title: 'Female', icon: cilUserFemale, value: 43 },
  ]

  const progressGroupExample3 = [
    { title: 'Organic Search', icon: cibGoogle, percent: 56, value: '191,235' },
    { title: 'Facebook', icon: cibFacebook, percent: 15, value: '51,223' },
    { title: 'Twitter', icon: cibTwitter, percent: 11, value: '37,564' },
    { title: 'LinkedIn', icon: cibLinkedin, percent: 8, value: '27,319' },
  ]

  const tableExample = [
    {
      avatar: { src: avatar1, status: 'success' },
      user: {
        name: 'Yiorgos Avraamu',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'USA', flag: cifUs },
      usage: {
        value: 50,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'success',
      },
      payment: { name: 'Mastercard', icon: cibCcMastercard },
      activity: '10 sec ago',
    },
    {
      avatar: { src: avatar2, status: 'danger' },
      user: {
        name: 'Avram Tarasios',
        new: false,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Brazil', flag: cifBr },
      usage: {
        value: 22,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'info',
      },
      payment: { name: 'Visa', icon: cibCcVisa },
      activity: '5 minutes ago',
    },
    {
      avatar: { src: avatar3, status: 'warning' },
      user: { name: 'Quintin Ed', new: true, registered: 'Jan 1, 2021' },
      country: { name: 'India', flag: cifIn },
      usage: {
        value: 74,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'warning',
      },
      payment: { name: 'Stripe', icon: cibCcStripe },
      activity: '1 hour ago',
    },
    {
      avatar: { src: avatar4, status: 'secondary' },
      user: { name: 'Enéas Kwadwo', new: true, registered: 'Jan 1, 2021' },
      country: { name: 'France', flag: cifFr },
      usage: {
        value: 98,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'danger',
      },
      payment: { name: 'PayPal', icon: cibCcPaypal },
      activity: 'Last month',
    },
    {
      avatar: { src: avatar5, status: 'success' },
      user: {
        name: 'Agapetus Tadeáš',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Spain', flag: cifEs },
      usage: {
        value: 22,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'primary',
      },
      payment: { name: 'Google Wallet', icon: cibCcApplePay },
      activity: 'Last week',
    },
    {
      avatar: { src: avatar6, status: 'danger' },
      user: {
        name: 'Friderik Dávid',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Poland', flag: cifPl },
      usage: {
        value: 43,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'success',
      },
      payment: { name: 'Amex', icon: cibCcAmex },
      activity: 'Last week',
    },
  ]
  function declineConfirm(programId, action){
    
    Swal.fire({
      // title: 'Successfully created!',
      text: action,
      icon: "info",
      allowOutsideClick: false,
      // allowEscapeKey: false,
      showCancelButton: true,
      cancelButtonColor: 'danger',
      confirmButtonColor: 'primary',
      confirmButtonText: 'Confirm'
    }).then((result) => { 
      if(result.isConfirmed){
        declineApply(programId)
      }
    });
  }
  function declineApply(programId) {

    // console.log(programId)
    let config = {
        method: "DELETE",
        url: process.env.REACT_APP_BASE_API + "/application/" + programId,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userData?.token
        },
        body: {}
    };
    axios(config).then(response => {
        setApplicationAction(applicationAction+1)
        toast.success(response?.data?.message, {
            position: toast?.POSITION?.TOP_CENTER
        });
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

  function funE(rowIndexData) {
    // console.log("rowIndexData ", rowIndexData)
    localStorage.setItem("applicantData", JSON.stringify(rowIndexData));

    // setTimeout(()=>{
      window.location.href = '/application-detail/' + userData?.organization_id + "/"
    // }, 1000)

    // console.log("<<<<   >>>>", '/payroll/salary/'+rowIndexData?.payrollID?.toString()  )

  }
  
  return (
    <>
      {/* Sch  */}
      {/* <WidgetsDropdown /> */}
      {/* <WidgetsBrand withCharts /> */}

      <ToastContainer />
      {
        userData?.type === 'Student' ?
        <CRow className='m-3' >
          <CCol sm="12" md="12" lg="12" xl="12">
            <a href='/apply' className='justify-content-between align-items-center text-white bg-dark rounded-1 p-2' > Quick link to apply </a>
          </CCol>
        </CRow>
        : ""
      }
      <br />
      
      {/* stats */}
      <CRow className='m-3'>
        <CCol xs={12} sm={6} lg={3}>
          <CWidgetStatsB
            className="mb-4"
            progress={{ color: 'success', value: 100 }}
            text="All school"
            title="School"
            value={userData?.user?.count_stats?.school || 0}
          />
        </CCol>
        <CCol xs={12} sm={6} lg={3}>
          <CWidgetStatsB
            className="mb-4"
            progress={{ color: 'danger', value: 100 }}
            text="All programme"
            title="Programmes"
            value={userData?.user?.count_stats?.programme || 0}
          />
        </CCol>
        <CCol xs={12} sm={6} lg={3}>
          <CWidgetStatsB
            className="mb-4"
            progress={{ color: 'warning', value: 100 }}
            text="My application"
            title="Application"
            value={userData?.user?.count_stats?.application || "0"}
          />
        </CCol>
        <CCol xs={12} sm={6} lg={3}>
          <CWidgetStatsB
            className="mb-4"
            progress={{ color: 'info', value: 100 }}
            text="My files uploaded"
            title="File"
            value={userData?.user?.count_stats?.file || "0"}
          />
        </CCol>
      </CRow>

      {/* table for student */}
      {
        userData?.type === 'Student' ?
          <CRow className='m-3' style={{width: "100%"}}>

            <CCol  >
              
              <CCard className="mb-4">            
                <CCardHeader> Application Overview </CCardHeader>
                <CCardBody>

                  <CTable align="middle" className="mb-0 border" hover responsive>
                    <CTableHead color="light">
                      <CTableRow>
                        <CTableHeaderCell className="text-center">
                          <CIcon icon={cilAlbum} />
                        </CTableHeaderCell>
                        <CTableHeaderCell>Name</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Programme</CTableHeaderCell>
                        <CTableHeaderCell>Status</CTableHeaderCell>
                        <CTableHeaderCell>Action</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    {/* { console.log(" schDetails >>", schDetails ) } */}
                    <CTableBody>
                      {schDetails?.data?.map((item, index) => (
                        <CTableRow v-for="item in tableItems" key={index}>
                          <CTableDataCell className="text-center">
                            <CAvatar size="md" src={process.env.REACT_APP_BASE_API + userData?.photo} status={"success"} />
                          </CTableDataCell>
                          <CTableDataCell>
                            <div>{item?.student?.user?.first_name}</div>
                            <div className="small text-medium-emphasis">
                              <span>{'New '}</span> | Applied:{' '}  
                              {moment(item?.created_on).format("YYYY-MM-DD")}
                            </div>
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                            {item?.description} 
                            {/* <CIcon size="xl" icon={item.country.flag} title={item.country.name} /> */}
                          </CTableDataCell>
                          <CTableDataCell>
                            <div className="clearfix">
                              <div className="float-start ">
                              <div style={{ width: 50, height: 50 }}>
                                  <CircularProgressbar
                                    value={item?.progress || 25}
                                    text={`${item?.progress || 25}%`}
                                    background
                                    backgroundPadding={6}
                                    styles={buildStyles({
                                      backgroundColor: "#303c54",
                                      textColor: "#fff",
                                      pathColor: "#fff",
                                      trailColor: "transparent"
                                    })}
                                  />
                                </div>
                              </div>
                            </div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <div className="small text-medium-emphasis"></div>
                            <Badge color='primary' onClick={(e)=>{ declineConfirm( item?.id, "Decline Application : "+ item?.description ) } } > Delete </Badge> 
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                </CCardBody>
              </CCard>
            </CCol>

            <CCol >
              <CCard className="mb-4">
                <CCardHeader>Your analytics</CCardHeader>
                <CCardBody>
                  <CChartPie
                    data={{
                      labels: ['School', 'Application', 'Programme', 'File'],
                      datasets: [
                        {
                          data: [userData?.user?.count_stats?.school || 0, userData?.user?.count_stats?.application, userData?.user?.count_stats?.programme, userData?.user?.count_stats?.file],
                          backgroundColor: ['#2eb85c', '#f9b115', '#e55353', '#3399ff'],
                          hoverBackgroundColor: ['#2eb85c', '#f9b115', '#e55353', '#3399ff'],
                        },
                      ],
                    }}
                  />
                </CCardBody>
              </CCard>
            </CCol>
          </CRow> 
        : ""
      }
      {/* table for student */}
      {
        userData?.type === 'School' ?
          <CRow className='m-3' style={{width: "100%"}}>

            <CCol xs={12} sm={8} lg={8} className='mt-2'>
              
              <CCard className="mb-4">            
                <CCardHeader> Application Overview </CCardHeader>
                <CCardBody>

                  <CTable align="middle" className="mb-0 border" hover responsive>
                    <CTableHead color="light">
                      <CTableRow>
                        <CTableHeaderCell className="text-center">
                          <CIcon icon={cilPeople} />
                        </CTableHeaderCell>
                        <CTableHeaderCell>Name</CTableHeaderCell>
                        <CTableHeaderCell>Email</CTableHeaderCell>
                        <CTableHeaderCell className="">Programme</CTableHeaderCell>
                        <CTableHeaderCell>Status</CTableHeaderCell>
                        <CTableHeaderCell>Action</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {products?.map((item, index) => (
                        <CTableRow v-for="item in tableItems" key={index}>
                          <CTableDataCell className="text-center">
                            <CAvatar size="md" src={process.env.REACT_APP_BASE_API + userData?.photo} status={"success"} />
                          </CTableDataCell>
                          <CTableDataCell>
                            <div>{item?.account?.user?.first_name + " " + item?.account?.user?.last_name}</div>
                            <div className="small text-medium-emphasis">
                              <span>{'New '}</span> | Applied:{' '}  
                              {moment(item?.updated_at).format("YYYY-MM-DD")}
                            </div>
                          </CTableDataCell>
                          <CTableDataCell className="">
                            {item?.applicant_email}
                            {/* <CIcon size="xl" icon={item.country.flag} title={item.country.name} /> */}
                          </CTableDataCell>
                          <CTableDataCell className="">
                            {item?.applicant_program_name}
                            {/* <CIcon size="xl" icon={item.country.flag} title={item.country.name} /> */}
                          </CTableDataCell>
                          <CTableDataCell>
                            <div className="clearfix">
                              <div className="float-start ">
                            { item?.status === "Pending" ? <strong>1%</strong> : "" }
                            { item?.status === "Started" ? <strong>25%</strong> : "" }
                            { item?.status === "Completed" ? <strong>50%</strong> : "" }
                            { item?.status === "Processing" ? <strong>75%</strong> : "" }
                            { item?.status === "Approved" ? <strong>100%</strong> : "" }
                            { item?.status === "Rejected" ? <strong>0%</strong> : "" }
                              </div>
                              <div className="float-end">
                                <small className="text-medium-emphasis">{item?.status}</small>
                              </div>
                            </div>
                            {
                              item?.status === "Pending" ? 
                              <CProgress thin color={"secondary"} value={1} />
                              : ""
                            }
                            {
                              item?.status === "Started" ? 
                              <CProgress thin color={"secondary"} value={25} />
                              : ""
                            }
                            {
                              item?.status === "Completed" ? 
                              <CProgress thin color={"info"} value={50} />
                              : ""
                            }
                            {
                              item?.status === "Processing" ? 
                              <CProgress thin color={"warning"} value={75} />
                              : ""
                            }
                            {
                              item?.status === "Approved" ? 
                              <CProgress thin color={"success"} value={100} />
                              : ""
                            }
                            {
                              item?.status === "Rejected" ? 
                              <CProgress thin color={"danger"} value={0} />
                              : ""
                            }
                          </CTableDataCell>
                          <CTableDataCell>
                            <div className="small text-medium-emphasis"></div>
                            <Badge color='primary' onClick={(e)=>{ funE( item ) } } > View </Badge> 
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow> 
        : ""
      }



{
        userData?.type === 'School' ?
        <CRow className='m-3' >
          <CCol sm="12" md="12" lg="12" xl="12">
            <a href={`/applications/${userData?.organization_id}`} className='justify-content-between align-items-center text-white bg-dark rounded-1 p-2' > Load More </a>
          </CCol>
        </CRow>
        : ""
      }
    </>
  )
}

export default Dashboard
