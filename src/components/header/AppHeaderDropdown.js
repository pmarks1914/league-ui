import React from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  // CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  // cilBell,
  cilCreditCard,
  // cilCommentSquare,
  cilEnvelopeOpen,
  // cilFile,
  cilLockLocked,
  // cilSettings,
  cilTask,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import $ from 'jquery'
import avatar9 from './../../assets/brand/logo.png' 

const AppHeaderDropdown = (userData) => {
  // console.log(userData?.user?.file_photo)
  function logoutUser(){
    window.location.href="/login";
    // localStorage.removeItem("userDataStore");
    // localStorage.removeItem("signupInfo");
    localStorage.clear();
  }


  return (
    <CDropdown variant="nav">
      <CDropdownToggle placement="bottom-end" className="p-0 profile-img" caret={false}>
        <CAvatar src={ userData?.userData?.user?.file_photo ? (userData?.userData?.user?.file_photo) : avatar9 } width="50%" className='m-0' alt="user image"/>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">User Profile</CDropdownHeader>

        {
          // console.log("userData ", process.env.REACT_APP_MAIN_BASE + userData?.userData?.photo50, userData?.userData)
        }
        <CDropdownItem>
          <CIcon icon={cilUser} className="me-2" />
          {userData?.userData?.user?.first_name?.toUpperCase()}  
        </CDropdownItem>
        <CDropdownItem>
          <CIcon icon={cilCreditCard} className="me-2" />        
          {userData?.userData?.user?.email}
        </CDropdownItem>
        {/* <CDropdownItem>
          <CIcon icon={cilTask} className="me-2" />
        </CDropdownItem> */}
        <CDropdownItem onClick={(e)=>logoutUser()} className="user-select-none">
          <CIcon icon={cilLockLocked} className="me-2 bg-text-wp" />
          {/* <CBadge className="ms-2 bg-text-wp"> */}
          Logout
          {/* </CBadge> */}
        </CDropdownItem>
        {/* <CDropdownItem href="#">
          <CIcon icon={cilFile} className="me-2" />
          Projects
          <CBadge color="primary" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem href="#">
          <CIcon icon={cilLockLocked} className="me-2" />
          Lock Account
        </CDropdownItem> */}
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
