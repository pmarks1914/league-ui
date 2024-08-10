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

const userData = JSON.parse(localStorage.getItem("userDataStore"));
let userGetInfoData = getEvaluation();
let userGetInfo = []
userGetInfoData?.list?.then(value => { (userGetInfo = value) });
console.log("outside compo userGetInfo", userGetInfoData)

const Dtable = () => {
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
      // console.log("props ", userGetInfo?.length)
      // reset user
      if(dateRange?.length > 0 && monitorState === 1){
        setMonitorState(2)
        performFilter("filterByDate", "none")
        setTransactionStatus("")
  
        setLoader('<a></a>')
      }
      else if(userGetInfo?.length === 0){
        let xxx = null;
        xxx = setInterval(function() {
        //   userGetInfo = userGetInfo
          if(userGetInfo?.length > 0){
              console.log("inside timer userGetInfo", userGetInfo)
            // datatablaScript(userGetInfo)
            setLoader('<a></a>')
            clearInterval(xxx)
          }
          else{
            setTimeout(()=>{
              setLoader('<a></a>')
              if(userGetInfo?.length < 1){
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
      else if(dateRange && monitorState === 2){
        performFilter("filterByDate", "none")
        setTransactionStatus("")
        // setMonitorState(3)
      }
      else{
        setLoader('<a></a>')
        setTimeout(()=>{
          setNoData("No data")
        }, 2000)
      }
  
      // if(transactionStatus && monitorState === 2){
      //   performFilter("filterByStatus")
      // }
  
      
      // console.log("props ", dateRange, "userGetInfo, transactionStatus, monitorState")
      
    }, [ dateRange, noData, userGetInfo])
  
  
    // perform filter 
    function datatablaScript(tdata) {
      let printCounter = 0;
  
      setTableData(tdata);
    //   $('#myTable').DataTable().destroy();
      setTimeout(() => {   
         
        $('#myTable').DataTable(
          {
            // data: userGetInfo,
            columnDefs: [
              { "width": "10%", "targets": 2 }
            ],
            processing: true,
            deferLoading: true,
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
                  let sheet = anytype.xl.worksheets['wingipaytransaction.xml'];
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
                  let sheet = anytype.xl.worksheets['wingipaytransaction.pdf'];
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
  
    }

    function performFilter(type, status){

        // // console.log("by status ", transactionStatus, "type", type )
        // perform filter by date range
        if(type === "filterByDate"){
          // 
          // let dataFilter = userGetInfo?.filter((post, id) => {return ( moment(new Date(post?.created_at)).format('DD/MM/YYYY') >= moment(dateRange[0]).format('DD/MM/YYYY') && moment(new Date(post?.created_at)).format('DD/MM/YYYY') <= moment(dateRange[1]).format('DD/MM/YYYY') ) });
          
          let dataFilter = userGetInfo?.filter((post, id) => {return ( (new Date(post?.created_at).getTime()) >= (dateRange[0])?.getTime() && (new Date(post?.created_at).getTime()) <= (dateRange[1])?.getTime() ) });
    
          // console.log( "data filtered ", dataFilter )
    
          datatablaScript( dataFilter );
    
          setDateFilterData( dataFilter );
        }
        else if(type === "filterByStatus"){
          // 
          // console.log("by status ", status, monitorState )
          if(status === "All Transaction" && monitorState === 1){
            datatablaScript(userGetInfo);
          }
          else if((status === "Successful" || status === "Pending" || status === "Failed") && monitorState === 1){
            datatablaScript( userGetInfo?.filter((post, id) => {return ( post?.status_code === status.toUpperCase() )}) );
          }
          else if((status === "Successful" || status === "Pending" || status === "Failed") && monitorState === 2){
            datatablaScript( dateFilterData?.filter((post, id) => {return ( post?.status_code === status.toUpperCase() )}) );
            
          }
        }
        else if(type === "filterByOptions"){
          // 
          let dataFilter = [];
          if(amountEqual !== 0 || amountGreat !== 0 || amountLess !== 0){
            // 
            if( amountGreat != 0 && amountLess !=0){
              dataFilter = userGetInfo?.filter((post, id) => {
                return ( (post?.amount <= amountLess && post?.amount >= amountGreat) && ( post?.reference_id?.toLowerCase().includes(referanceId.toLowerCase()) && post?.id?.toLowerCase().includes(transactionId.toLowerCase()) ) )
              });
            } 
            else if( amountGreat != 0 ){
              dataFilter = userGetInfo?.filter((post, id) => {
                return ( ((post?.amount >= amountGreat) || ( post?.reference_id?.toLowerCase().includes(referanceId.toLowerCase()) || post?.id?.toLowerCase().includes(transactionId.toLowerCase())) 
                && 
                ( post?.reference_id?.toLowerCase().includes(referanceId.toLowerCase()) && post?.id?.toLowerCase().includes(transactionId.toLowerCase()) ) ))
              });
            }
            else if( amountLess != 0 ){
              dataFilter = userGetInfo?.filter((post, id) => {
                return ( ((post?.amount <= amountLess) || ( post?.reference_id?.toLowerCase().includes(referanceId.toLowerCase()) || post?.id?.toLowerCase().includes(transactionId.toLowerCase()) ) ) 
                && (post?.reference_id?.toLowerCase().includes(referanceId.toLowerCase()) && post?.id?.toLowerCase().includes(transactionId.toLowerCase())) )
              });
            }
            else if( amountEqual != 0 ){
              dataFilter = userGetInfo?.filter((post, id) => {
                return ( ((post?.amount === amountEqual) || ( post?.reference_id?.toLowerCase().includes(referanceId.toLowerCase()) || post?.id?.toLowerCase().includes(transactionId.toLowerCase()) )) && ( post?.reference_id?.toLowerCase().includes(referanceId.toLowerCase()) && post?.id?.toLowerCase().includes(transactionId.toLowerCase()) ) )
              });
            }
          }
          else{
            // console.log("hhhh")
            dataFilter = userGetInfo?.filter((post, id) => {return ( post?.reference_id?.toLowerCase().includes(referanceId.toLowerCase()) && post?.id?.toLowerCase().includes(transactionId.toLowerCase()) )});
          }
          datatablaScript( dataFilter );
          // 98ca3328-2e84-4b52-8942-e04ac1b2df71
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

  function trackActivity() {
    // e.preventDefault();
    // getSessionTimeout();
    const currentUser_new = JSON.parse(localStorage.getItem("userDataStore"));    
    if(currentUser_new){
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
            {/* {
                console.log("tableData ", tableData)
            } */}
            
            {
              tableData?.length > 0 ?
                tableData?.map((post, id) =>
                <tr key={id}>
                    <td>{id + 1}</td>
                    <td>{ post?.applicant_full_name }</td>
                    <td>{post?.applicant_program_description }</td> 
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
                    <td>{post?.applicant_program_end_date } </td> 
                    <td onClick={()=>funE(post)}> <Badge color='primary' className='pointer'> View </Badge></td> 
                </tr>
                )
                : []
            }
            
        </tbody>
      </table>

      {tableData?.length > 0 ? "" : <p style={{textAlign: "center"}}> <br /><br /> {noData}</p>}

      <a dangerouslySetInnerHTML={{ __html: loader }}></a>

    </div>
  )
}

export default Dtable;