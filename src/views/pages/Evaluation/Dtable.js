import React, { useEffect, useState } from 'react';
import $ from 'jquery'
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-buttons/js/dataTables.buttons.js";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-buttons/js/buttons.flash.js";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons/js/buttons.print.js";
import '../../datatable/table.css';
import { getEvaluation } from '../../dashboard/DashboardData';
import { Badge } from 'reactstrap';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import PropTypes, { func } from "prop-types";


const userData = JSON.parse(localStorage.getItem("userDataStore"));
// let userGetInfoData = getEvaluation();
// let userGetInfo = []
// userGetInfoData?.list?.then(value => { (userGetInfo = value) });
// console.log("outside compo userGetInfo", userGetInfoData)

const Dtable = (props) => {
  // console.log("outside compo props", props)

  const [manageTableData, setManageTableData] = useState(1)

  // console.log(" manageTableData", manageTableData)

  const [loader, setLoader] = useState('<div class="spinner-border dashboard-loader" style="color: #e0922f;"></div>')
  const [tableData, setTableData] = useState([]);
  const [noData, setNoData] = useState("")
  const [monitorState, setMonitorState] = useState(1);
  const [dropValue, setDropValue] = useState(0);

  const [openDateRange, setOpenDateRange] = useState(true);
  const [dateRange, setDateRange] = useState({});
  // startDate: Date.parse("2022-01-13"), endDate: Date.now()

  const [transactionStatus, setTransactionStatus] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [referanceId, setReferanceId] = useState("");
  const [transactionExport, setTransactionExport] = useState({});
  const [dateFilterData, setDateFilterData] = useState({});
  const [amountLess, setAmountLess] = useState(0.00);
  const [amountGreat, setAmountGreat] = useState(0.00);
  const [amountEqual, setAmountEqual] = useState(0.00);

  const toggle = () => setOpenDateRange(!openDateRange);

  useEffect(() => {
    let userGetInfoData = getEvaluation();
    let userGetInfo = []
    userGetInfoData?.list?.then(value => { (userGetInfo = value) });

    // console.log("userGetInfo  ", userGetInfo)
    // reset user
   if (userGetInfo?.length === 0) { 
    // console.log("userGetInfo  1", userGetInfo)
      let xxx = null;
      xxx = setInterval(function () {
        // console.log("userGetInfo 2", userGetInfo)
          userGetInfo = userGetInfo
        if (userGetInfo?.length > 0) {
          // console.log("inside timer userGetInfo", userGetInfo)
          datatablaScript(userGetInfo)
          setLoader('<a></a>')
          clearInterval(xxx)
        }
        else {
          setTimeout(() => {
            setLoader('<a></a>')
            if (userGetInfo?.length < 1) {
              datatablaScript([]);
              setNoData('No Data')
            }
          }, 7000)
        }
      },
        1000)

    }
    else if (userGetInfo?.length > 0 && monitorState === 1) {
      // setMonitorState(2)
      datatablaScript(userGetInfo);
      setLoader('<a></a>')
    }
    else if (dateRange && monitorState === 2) {
      setTransactionStatus("")
      // setMonitorState(3)
    }
    else {
      setLoader('<a></a>')
      setTimeout(() => {
        setNoData("No data")
        datatablaScript([]);
      }, 2000)
    }
    // console.log("props ", props, "userGetInfo, transactionStatus, monitorState")

  }, [dateRange, noData, manageTableData])

  useEffect(() => {
    if (props.pushData) {
      window.location.reload()
    }
  }, [props])
  // perform filter 
  function datatablaScript(tdata) {
    setTableData(tdata);
    //   $('#myTable').DataTable().destroy();
    try {
      setTimeout(() => {
        $('#myTable').DataTable(
          {
            processing: true,
            deferLoading: true,
            // serverSide: true, // Enable server-side processing
            // ajax: function (data, callback, settings) {
            //   // Custom function to handle server-side data fetching
            //   $.ajax({
            //     url: process.env.REACT_APP_BASE_API + "/evaluation-by-student/" + userData?.user?.student_id,  // Replace with your server-side URL
            //     type: 'GET',                       // POST or GET depending on your server setup
            //     data: {
            //       // Pass the necessary parameters to the server
            //       // draw: data.draw,
            //       // start: data.start,
            //       // length: data.length,
            //       // order: data.order,
            //       // search: data.search.value,
            //       // Add any additional parameters needed by your server-side code
            //     },
            //     success: function (response) {
            //       // Pass the received data to the DataTable
            //       callback({
            //         draw: response.draw,
            //         recordsTotal: response.recordsTotal,
            //         recordsFiltered: response.recordsFiltered,
            //         data: response.data
            //       });
            //     },
            //     error: function (xhr, error, thrown) {
            //       // Handle error
            //       console.error("Error fetching data from server:", error);
            //     }
            //   });
            // },
            columnDefs: [
              { "width": "10%", "targets": 2 }
            ],
            keys: true,
            // dom: 'Blfrtip',
            dom: '<"top"Bfrt>rt<"bottom"lip>',
            page: true,
            // dom: '<"top">rt<"bottom"ilp><"clear">',
            buttons: [
              {
                extend: 'copy',
                messageTop: null,
                // text: 'Copy Current Page',
                exportOptions: {
                  modifier: {
                    page: 'current'
                  }
                }
              },
              {
                extend: 'pdfHtml5',
                messageTop: null,
                // text: 'Export to PDF Current Page',
                exportOptions: {
                  modifier: {
                    page: 'current'
                  }
                }
              },
              {
                extend: 'excel',
                messageTop: null,
                // text: 'Export Current Page',
                exportOptions: {
                  modifier: {
                    page: 'current'
                  }
                },
                customize: function (anytype) {
                  let sheet = anytype.xl.worksheets['tofiledata.xml'];
                  $('row:first c', sheet).attr('s', '7');
                }
              },
              {
                extend: 'csv',
                messageBottom: null,
                exportOptions: {
                  modifier: {
                    page: 'current'
                  }
                },
              },
              {
                extend: 'print',
                messageBottom: null,
                exportOptions: {
                  modifier: {
                    page: 'current'
                  }
                },
                customize: function (anytype) {
                  let sheet = anytype.xl.worksheets['tofiledata.pdf'];
                  $('row:first c', sheet).attr('s', '7');
                }
              },
            ],
            // scrollY: 600,
            deferRender: false,
            // scroller: false,
            // lengthChange: false
          }
        );
      }, 0);
    } catch (error) {
      console.log("catch error", error)      
    }

  }
  // Close the dropdown if the user clicks outside of it
  window.onclick = function (event) {
    // event.preventDefault()
    trackActivity();

    setDropValue(0);
    if (!event.target.matches('.dropbtn') && dropValue === 0) {
      let dropdowns = document.getElementsByClassName("dropdown-content");
      let i;
      for (i = 0; i < dropdowns.length; i++) {
        let openDropdown = dropdowns[i];
        // // console.log("list ==> ", openDropdown.classList.contains('show'))
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
        else {
          // openDropdown.classList.remove('show');
        }
      }
    }
  }
  function funE(rowIndexData) {
    // console.log("rowIndexData ", rowIndexData)
    localStorage.setItem("applicantData", JSON.stringify(rowIndexData));

    // setTimeout(()=>{
    window.location.href = '/evaluation-detail/' + rowIndexData?.applicant_program_id + "/"
    // }, 1000)
  }
  function funEvaluationEdit(rowIndexData) {
    // setTimeout(()=>{
    window.location.href = '/evaluation-edit/' + rowIndexData?.applicant_program_id + "/"
    // }, 1000)


  }

  function trackActivity() {
    // e.preventDefault();
    // getSessionTimeout();
    const currentUser_new = JSON.parse(localStorage.getItem("userDataStore"));
    if (currentUser_new) {
      currentUser_new["timeLogout"] = new Date().getTime() + currentUser_new?.counter;
      localStorage.setItem('userDataStore', JSON.stringify(currentUser_new))
    }
  }

  return (

    <div style={{ width: '80%' }}>

      {/* {dateTo.toString()}{" rrr "}{dateFrom.toString()} */}
      <br /><br />
      <table id="myTable" className="display" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Description</th>
            <th>Progress</th>
            <th>Created at</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            tableData?.length > 0 ?
              tableData?.map((post, id) =>
                <tr key={id}>
                  <td>{id + 1}</td>
                  <td>{post?.name}</td>
                  <td>{post?.description?.slice(0, 35)}</td>
                  <td>
                    <div className="clearfix">
                      <div className="float-start ">
                        <div style={{ width: 50, height: 50 }}>
                          <CircularProgressbar
                            value={post?.progress || 25}
                            text={`${post?.progress || 25}%`}
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
                  </td>
                  <td>{post?.applicant_program_end_date} </td>
                  <td> 
                  <Badge color='primary' className='wp-cursor-pointer m-2'  onClick={() => funE(post)}> View </Badge>
                  <Badge color='secondary' className='wp-cursor-pointer m-2' onClick={() => funEvaluationEdit(post)} > Edit </Badge>
                  </td>
                </tr>
              )
              : []
          }

        </tbody>
      </table>

      {tableData?.length > 0 ? "" : <p style={{ textAlign: "center" }}> <br /><br /> {noData}</p>}

      <a dangerouslySetInnerHTML={{ __html: loader }}></a>

    </div>
  )
}

export default Dtable;


Dtable.propTypes = {
  pushData: PropTypes.string,
  // getNewPassedWalkAction: PropTypes.instanceOf(PropTypes.any).isRequired
};