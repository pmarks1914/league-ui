import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import DataTable, { createTheme } from 'react-data-table-component';
import swal from 'sweetalert2';
import { Button } from '@material-ui/core';
import { getApplication } from '../../dashboard/DashboardData';
import { Badge } from 'reactstrap';

const moment = require('moment');

const columns = [
    {
        name: '#',
        selector: 'id',
        sortable: true,
        width: '60px'
    }
];


const userData = JSON.parse(localStorage.getItem("userDataStore"));

let salaryGetAll = getApplication();

const Dtable = () => {

    const [products, setProducts] = useState([]);
    
    useEffect(() => {
      salaryGetAll.list.then(value => setProducts( value ) )
    }, []);

    return (
        <div style={{ paddingTop: '10px'}}>
            
            <DataTable
                title=""
                columns={columns}
                data={products || []}
                striped
                persistTableHead
                fixedHeader
                fixedHeaderScrollHeight="90vh"
                pagination
                // paginationServer
                // paginationTotalRows={totalRows}
                // onChangeRowsPerPage={handlePerRowsChange}
                // onChangePage={handlePageChange}
                // customStyles={customStyles}

            />
            
        </div>


    );
};
export default Dtable;