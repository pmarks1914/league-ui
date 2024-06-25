import React, { useState, useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';

import axios from 'axios';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { getApplication } from '../../dashboard/DashboardData';
import { Badge } from 'reactstrap';

const userData = JSON.parse(localStorage.getItem("userDataStore"));

let salaryGetAll = getApplication();
// let salaryGetAllInfo = []
// salaryGetAll.list.then(value => salaryGetAllInfo = value)


const ApplicationDataTables = () => {

  // const items = [];
  // for (let i = 0; i < 30; i++) {
  //   items.push( {id: i+1, name: `Kofi ${i}`, age: 21+i+1, address: `23 WY ${i}`, city: "Accra", salary: ""});
  // }
  // const products = salaryGetAllInfo;

  const [products, setProducts] = useState([]);
  const [salaryGetAllInfo, setSalaryGetAllInfo] = useState()

  const columns = [
    {
      dataField: 'ID',
      text: 'Id',
      // filter: textFilter()
    },
    {
      dataField: 'applicant_full_name',
      text: 'Name',
      filter: textFilter()
    },
    {
      dataField: 'applicant_program_name',
      text: 'Programme',
      filter: textFilter()
    },
    {
      dataField: 'applicant_email',
      text: 'Email',
      filter: textFilter(),
      sort: true
    },
    {
      dataField: 'applicant_program_end_date',
      text: 'Closing date',
      filter: textFilter(),
      // sort: true
    },
    {
      dataField: 'action',
      text: 'Action',
      events: {
        onClick: (e, column, columnIndex, rowIndex) => {
          funE(e, column, columnIndex, rowIndex);
        },
      },
      formatter: (cell, row) => (
        <Badge color='primary' className='pointer'> {cell} </Badge>
      ),

    },
  ];

  useEffect(() => {
    // setTimeout(() => {
    //   setProducts(salaryGetAllInfo || [])
    //   console.log(" >> ", salaryGetAllInfo)
    // }, 1000);

    // let salaryGetAllInfo = []
    salaryGetAll.list.then(value => setProducts( value ) )
  }, []);

  // manage paging
  const options = {
    page: 1,
    sizePerPageList: [
      { text: '5', value: 5 },
      { text: '10', value: 10 },
      { text: '50', value: 50 },
      { text: 'All', value: products.length }
    ],
    sizePerPage: 10,
    pageStartIndex: 1,
    paginationSize: 3,
    prePage: 'Prev',
    nextPage: 'Next',
    firstPage: 'First',
    lastPage: 'Last',
    paginationPosition: 'top'
  };

  function funE(e, column, columnIndex, rowIndexData) {
    console.log("rowIndexData ", rowIndexData)
    localStorage.setItem("applicantData", JSON.stringify(rowIndexData));

    // setTimeout(()=>{
      window.location.href = '/application-detail/' + userData?.organization_id + "/"
    // }, 1000)

    // console.log("<<<<   >>>>", '/payroll/salary/'+rowIndexData?.payrollID?.toString()  )

  }
  return (
    <div className="container table-container">
      {/* <div className="row hdr">
        <div className="col-sm-12 btn btn-info">
          React Bootstrap Table with Searching and Custom Pagination
        </div>
      </div> */}
      
      <div className="container" style={{ marginTop: 50 }}>
        <BootstrapTable
          striped
          hover
          keyField='id'
          data={products}
          columns={columns}
          filter={filterFactory()}
          pagination={paginationFactory(options)}
        />
      </div>
    </div>
  );
};


export default ApplicationDataTables;