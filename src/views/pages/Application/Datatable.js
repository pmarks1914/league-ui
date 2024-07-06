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
import { getApplication } from '../../dashboard/DashboardData';
import { Badge } from 'reactstrap';

const userData = JSON.parse(localStorage.getItem("userDataStore"));
let userGetInfoData = getApplication();
let userGetInfo = []
userGetInfoData?.list?.then(value => { (userGetInfo = value) });

const Dtable = () => {
    const [loader, setLoader] = useState('<div class="spinner-border dashboard-loader" style="color: #e0922f;"></div>')
    const [tableData, setTableData] = useState([]);
    const [noData, setNoData] = useState("")
    const [monitorState, setMonitorState] = useState(1);
    const [dropValue, setDropValue] = useState(0);
  
    // date time
    const [dateTo, setDateTo] = useState(new Date('2014-08-18T21:11:54'));
    const [dateFrom, setDateFrom] = useState(new Date('2014-08-18T21:11:54')); 
    const [value, setValue] = useState([null, null]);
  
    // modals
    // filer transaction
    const [modal1, setModal1] = useState(false)
    // view single transaction 
    const [modal2, setModal2] = useState(false)
  
    const [viewData, setViewData] = useState({})
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
      // console.log("props ", transaction.length)
      // reset user
      if(dateRange?.length > 0 && monitorState === 1){
        setMonitorState(2)
        performFilter("filterByDate", "none")
        setTransactionStatus("")
  
        setLoader('<a></a>')
      }
      else if(transaction.length === 0){
        let xxx = null;
        xxx = setInterval(function() {
          transaction = transaction
          if(transaction.length > 0){
            // datatablaScript(transaction)
            setLoader('<a></a>')
            clearInterval(xxx)
          }
          else{
            setTimeout(()=>{
              setLoader('<a></a>')
              if(transaction?.length < 1){
                setNoData('No Data')
              }
            }, 7000)
          }
        },
        1000)
        
      }
      else if (transaction?.length > 0 && monitorState === 1) {
        // setMonitorState(2)
        datatablaScript(transaction);
  
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
  
      
      // console.log("props ", dateRange, "transaction, transactionStatus, monitorState")
      
    }, [ dateRange, noData, transaction])
  
  
    // perform filter 
    function datatablaScript(tdata) {
      let printCounter = 0;
  
      setTableData(tdata);
      $('#myTable').DataTable().destroy();
      setTimeout(() => {   
         
        $('#myTable').DataTable(
          {
            // data: transaction,
            columnDefs: [
              { "width": "10%", "targets": 2 }
            ],
            processing: true,
            deferLoading: true,
            keys: true,
            // dom: 'Blfrtip',
            // dom: '<"top"Bfrt>rt<"bottom"lip>',
            page: true,
            dom: '<"top">rt<"bottom"ilp><"clear">',
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
              {
                text: 'Filter',
                action: function (e, dt, node, config) {
                  setModal1(true)
                }
              }
            ],
            // scrollY: 600,
            deferRender: false,
            // scroller: false,
            // lengthChange: false
  
          }
        );
      }, 0);
  
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
      window.location.href = '/application-detail/' + rowIndexData?.applicant_program_id + "/"
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
            <th>Programme</th>
            <th>Description</th>
            <th>Progress</th>
            <th>Created at</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
            {
                console.log("tableData ", tableData)
            }
            
            {
              tableData?.length > 0 ?
                tableData?.map((post, id) =>
                <tr key={id}>
                    <td>{id + 1}</td>
                    <td>{ post?.applicant_full_name }</td>
                    <td>{post?.applicant_program_name}</td>
                    <td>{post?.applicant_program_description }</td> 
                    <td>{post?.progress }</td> 
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