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
  {
    component: CNavGroup,
    name: 'P',
    items: [
      {
        component: CNavItem,
        name: 'Application',
        to: '/application',
        icon: <CIcon icon={cilTransfer} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Profile',
        to: '/profile',
        icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
      },
      // {
      //   component: CNavItem,
      //   name: 'Refunds',
      //   to: '/payment/refunds',
      //   icon: <CIcon icon={cilReload} customClassName="nav-icon" />,
      // },
      // {
      //   component: CNavItem,
      //   name: 'Transaction Splits',
      //   to: '/payment/transaction-splits',
      //   icon: <CIcon icon={cilEco} customClassName="nav-icon" />,
      // },
      // {
      //   component: CNavItem,
      //   name: 'Payouts',
      //   to: '/payment/payouts',
      //   icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
      // },
      // {
      //   component: CNavItem,
      //   name: 'Subaccounts',
      //   to: '/payment/subaccounts',
      //   icon: <CIcon icon={cilTriangle} customClassName="nav-icon" />,
      // },
      // {
      //   component: CNavItem,
      //   name: 'Dispute',
      //   to: '/payment/disputes',
      //   icon: <CIcon icon={cilDataTransferUp} customClassName="nav-icon" />,
      // },
      // {
      //   component: CNavItem,
      //   name: 'Payment Link',
      //   to: '/payment-link',
      //   icon: <CIcon icon={cilDataTransferDown} customClassName="nav-icon" />,
      // },
    ],
  },
  // {
  //   component: CNavGroup,
  //   name: 'Transfers',
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Transfers',
  //       to: '/transfer/transfers',
  //       icon: <CIcon icon={cilMediaSkipForward} customClassName="nav-icon" />,
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Recipients',
  //       to: '/transfer/recipients',
  //       icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Balance',
  //       to: '/transfer/balance',
  //       icon: <CIcon icon={cilWallet} customClassName="nav-icon" />,
  //     },
  //   ],
  // },
  // {
  //   component: CNavItem,
  //   name: 'Compliance',
  //   to: '/compliance',
  //   icon: <CIcon icon={cilControl} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavItem,
  //   name: 'Api keys',
  //   to: '/api-keys',
  //   icon: <CIcon icon={cilLibrary} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavItem,
  //   name: 'Bulk Pay',
  //   to: '/bulk-pay',
  //   icon: <CIcon icon={cilMoodBad} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Settings',
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'User management',
  //       to: '/settings/user-management',
  //       icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" />,
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Api keys',
  //       to: '/settings/api-keys',
  //       icon: <CIcon icon={cilLibrary} customClassName="nav-icon" />,
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Support',
  //       to: '/settings/support',
  //       icon: <CIcon icon={cilBookmark} customClassName="nav-icon" />,
  //     },
  //   ],
  // },
  
]

export default account_nav
