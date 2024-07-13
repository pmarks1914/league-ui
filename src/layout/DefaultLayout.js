import axios from 'axios';
import React, { Component } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'


// session  
const currentUser = JSON.parse(localStorage.getItem("userDataStore")); 

class DefaultLayout extends Component {
  render() {
    if(!currentUser){
      getSchoolInfo()
    } 
    function getSchoolInfo() {
      let config = {
          method: "get",
          url: process.env.REACT_APP_BASE_API + "/token/status",
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + currentUser?.token
          },
      };
      axios(config).then(response => {
        if( response?.data?.status){
          // console.log("No token")
           window.location.href = "/login"
        }
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
    
    // // console.log("path ", window.location.pathname)

    // if(["/dashboard", "/payment/transaction", "/payment/refunds", "/payment/payouts", "/compliance", "/api-keys"].includes(window.location.pathname)){
    //   // 
    // }
    // else{
    //   window.location.href = '/404'
    // }

    window.onstorage = () => {
      // // console.log("storage >", JSON.parse(localStorage.getItem("userDataStore")) )
      if(JSON.parse(localStorage.getItem("userDataStore")) === null){
        // // console.log("storage ")
        window.location.href="/";
      }
    };
    return (
      <div>
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AppHeader />
          <div className="body flex-grow-1 px-3">
            <AppContent />
          </div>
          <AppFooter />
        </div>
      </div>
    );
  }
}

export default DefaultLayout;



// // console.log("storage listener")
// window.addEventListener('storage', function(event){
//   // console.log("storage listener")
//   if (event.key == 'logout-event') { 
//       // ..
//   }
// });