import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="/" target="_blank" rel="noopener noreferrer">
          venture innovo
        </a>
        <span className="ms-1">&copy; {(new Date()).getUTCFullYear()}.</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
