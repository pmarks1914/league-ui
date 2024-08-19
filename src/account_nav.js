import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilEco,
  cilMoney,
  cilPeople,
  cilTransfer,
  cilMediaSkipForward,
  cilTriangle,
  cilReload,
  cilWallet,
  cilDataTransferUp,
  cilUser,
  cilSmilePlus,
  cilSpeedometer,
  cilStar,
  cilTablet, 
  cilLibrary,
  cilControl,
  cilMoodBad,
  cilDataTransferDown,
  cilUserPlus,
  cilHappy,
  cilBasket,
  cilBookmark,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'



// catch unavailable urls when user logs into the app
if(["/", "/theme", "/dashboard", "/payment/transaction", "/payment/refunds", "/payment/payouts", "/compliance", "/settings/api-keys", "/bulk-pay", `/bulk-pay/item/${window.location.pathname.split("/")[3]}`, `/bulk-pay/item/${window.location.pathname.split("/")[3]}/`, '/payment-link', '/settings', '/settings/user-management', '/settings/support'].includes(window.location.pathname)){
  // 
}
else{
  // console.log(window.location.pathname.split("/")[3])
  // window.location.href = '/404'
}

const account_nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // },
  },
  // {
  //   component: CNavItem,
  //   name: 'My application',
  //   to: '/application-detail',
  //   icon: <CIcon icon={cilTransfer} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavItem,
  //   name: 'Colleges',
  //   to: '/apply',
  //   icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavItem,
  //   name: 'My application',
  //   to: '/application-detail',
  //   icon: <CIcon icon={cilTransfer} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavItem,
  //   name: 'Colleges',
  //   to: '/apply',
  //   icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  // }, 
  {
    component: CNavItem,
    name: 'My application',
    to: '/evaluation-detail',
    icon: <CIcon icon={cilTransfer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Basic profile',
    to: '/apply-profile',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Create evaluation profile',
    to: '/evaluation-profile',
    icon: <CIcon icon={cilReload} customClassName="nav-icon" />,
  },
  // {
  //   component: CNavGroup,
  //   name: 'P',
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Application',
  //       to: '/application',
  //       icon: <CIcon icon={cilTransfer} customClassName="nav-icon" />,
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Profile',
  //       to: '/profile',
  //       icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  //     },
  //   ],
  // },
  // {
  //   component: CNavItem,
  //   name: 'test',
  //   to: '/test',
  //   icon: <CIcon icon={cilControl} customClassName="nav-icon" />,
  // },
  
]

export default account_nav
