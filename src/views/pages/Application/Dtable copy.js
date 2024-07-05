import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import DataTable, { createTheme } from 'react-data-table-component';
import swal from 'sweetalert2';
// import '../SearchField.css';
import { Button } from '@material-ui/core';
// import AddUser from "./AddUser";
import { getApplication } from '../../dashboard/DashboardData';
import { Badge } from 'reactstrap';

const moment = require('moment');
let _that = this;

const columns = [
    {
        name: '#',
        selector: 'id',
        sortable: true,
        width: '60px'
    },
    {
        name: 'Username',
        selector: 'email',
        sortable: true,
    },
    {
        name: 'Role',
        selector: 'role',
        sortable: true,
    },
    {
        name: 'Created On',
        selector: 'createdOn',
        sortable: true,
    },
    {
        name: 'Action',
        selector: 'action',
        sortable: false,
    }
];

const customStyles = {
    rows: {
        style: {
            minHeight: '32px', // override the row height
        }
    },
    headCells: {
        style: {
            paddingLeft: '8px', // override the cell padding for head cells
            paddingRight: '8px',
            // backgroundColor: '#eee',
            // borderTopStyle: 'solid',
            // borderBottomStyle: 'solid',
            // borderColor: '#E60000',
            // borderWidth: '2px'
        },
    },
    headRow: {
        style:{
            minHeight: '35px'
        }
    },
    header: {
        style:{
            minHeight: '25px'
        }
    },
    cells: {
        style: {
            paddingLeft: '8px', // override the cell padding for data cells
            paddingRight: '8px',
        },
    },
    tableWrapper: {
        style: {
            display: 'block'
        }
    },
};


const userData = JSON.parse(localStorage.getItem("userDataStore"));

let salaryGetAll = getApplication();

const Dtable = () => {

    let dataTest = [ {id: 1, email: "ff"}, {id: 2, email: "ff"} ];
    // console.log("FilterData test0==>", id );

    const [data, setData] = useState({});
    // 
    const [loading, setLoading] = useState(false);
    const [swalLoading, setSwalLoading] = useState(
        swal.fire({
            timer: 1300,
            background: '#ffffff00',
            color: '#000',
            onBeforeOpen: () => {
              swal.showLoading()
            }
          })
    );
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);

    const [products, setProducts] = useState([]);
    
    useEffect(() => {
      salaryGetAll.list.then(value => setProducts( value ) )
    }, []);
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let filterListResultsParse = {};

    useEffect(() => {
        // fetchDataPage(1);        
    }, []);


    const fetchDataPage = async page => {

        setLoading(true);
        let currentUserPage = page;
        const response = await axios.get("gggggggg/" + "?page=" + currentUserPage + "&pageSize=" + perPage,
            {
                headers: {
                    ContentType: "application/json"

                }
            }
        )
            .then(response => {
                let currentUserErrorCode = response?.data?.errCode;

                let postUserResults = response?.data?.data || [];

                let postUserItems = postUserResults;

                const postList = postUserItems?.length ? (
                    postUserItems.map((post, id) => {
                        let dateCreated = new Date(post.createdAt);
                        let dateUpdated = new Date(post.createdOn);
                        return (
                            {
                                id: page === 1 ? (id + 1) : ((perPage * (page - 1)) + id + 1),
                                email: post?.username,
                                role:post.userrole.profilename,
                                createdOn: post?.modon != "Invalid date" ? moment(post?.modon).format('DD/MM/YYYY') : "N/A",
                                action:
                                    <Fragment>                                        
                                    </Fragment>
                            }
                        )
                    })
                ) : []


                    setData(postList);
                    // setData(prevData => postList);
                    setTotalRows(response?.data?.totalCount)
         

            }).catch(function (error) {
                if (error.response) {
                    /*
                     * The request was made and the server responded with a
                     * status code that falls out of the range of 2xx
                     */
                } else if (error.request) {
                    /*
                     * The request was made but no response was received, error.request
                     * is an instance of XMLHttpRequest in the browser and an instance
                     * of http.ClientRequest in Node.js
                     */
                } else {
                    // Something happened in setting up the request and triggered an Error
    
                }
            });

        setLoading(false);
    };

    const handlePageChange = page => {
        fetchDataPage(page);
    };


    const handlePerRowsChange = async (newPerPage, page) => {
        setLoading(true);

        let currentUserPage = page;
        const response = await axios.get("gggggggg/" + "?page=" + currentUserPage + "&pageSize=" + newPerPage,
            {
                headers: {
                    ContentType: "application/json"

                }
            }
        )
            .then(response => {
                let currentUserErrorCode = response?.data?.errCode;
                let postUserResults = response?.data?.data || [];
                let postUserItems = postUserResults;
                const postList = postUserItems.length ? (
                    postUserItems.map((post, id) => {
                        let dateCreated = new Date(post.createdAt);
                        let dateUpdated = new Date(post.createdOn);
                        return (
                            {
                                id: id + 1,
                                email: post.username,
                                role: post.userrole.profilename,
                                createdOn: post?.modon != "Invalid date" ? moment(post?.modon).format('DD/MM/YYYY') : "N/A",
                                action:
                                    <Fragment>
                                       
                                    </Fragment>
                            }
                        )
                    })
                ) : []


                    setData(postList);
                    setTotalRows(response?.data?.totalCount);
                    setPerPage(newPerPage);

            }).catch(function (error) {
                if (error.response) {
                    /*
                     * The request was made and the server responded with a
                     * status code that falls out of the range of 2xx
                     */
                } else if (error.request) {
                    /*
                     * The request was made but no response was received, error.request
                     * is an instance of XMLHttpRequest in the browser and an instance
                     * of http.ClientRequest in Node.js
                     */
                } else {
                    // Something happened in setting up the request and triggered an Error
    
                }
            });

    };

    
    function searchFilter(e, searchData) {
        e.preventDefault();
        console.log("search==>", searchData);
        const dataFilter = data?.map((post, id) => post);
        // const dataFilterMap = dataFilter.filter(post=> post.email != null).filter(post => (post.email).toString().toLowerCase().includes(searchData.toLowerCase()) || (post.createdOn).toString().toLowerCase().includes(searchData.toLowerCase()) );

        if (searchData === "") {
            // console.log("pagdate update00==>", dataFilterMap);
            fetchDataPage(1);
        }
        else {
            
            axios.get("gggggggg/" + "?" + searchData + "&page=1&pageSize=10&username=" + currentUser.usernameWithoutAt,
            {
                headers: {
                    ContentType: "application/json",
                    Authorization: currentUser?.token,
                }
            }
            ).then(res => {
                let searchDataNew = res?.data?.data;

                let postUserItems = searchDataNew;

                const postList = postUserItems?.length ? (
                    postUserItems.map((post, id) => {
                        let dateCreated = new Date(post.createdAt);
                        let dateUpdated = new Date(post.createdOn);
                        return (
                            {
                                id: id+1,
                                email: post.username,
                                role: post.userrole.profilename,
                                createdOn: moment(post?.modon).format('DD/MM/YYYY'),
                                action:
                                <Fragment>
                                </Fragment>
                            }
                        )
                    })
                ) : []
                setData(postList)

            }).catch(function (error) {
                if (error.response) {
                    /*
                     * The request was made and the server responded with a
                     * status code that falls out of the range of 2xx
                     */
                } else if (error.request) {
                    /*
                     * The request was made but no response was received, error.request
                     * is an instance of XMLHttpRequest in the browser and an instance
                     * of http.ClientRequest in Node.js
                     */
                } else {
                    // Something happened in setting up the request and triggered an Error
    
                }
            });
        
        }

    }
    function enterKeyToFilter(e, searchData) {
        // console.log("search==>", e.key);
       if(e.key === "Enter") {
        e.preventDefault();
        const dataFilter = data?.map((post, id) => post);

        if (searchData === "") {
            // console.log("pagdate update00==>", dataFilterMap);
            fetchDataPage(1);
        }
        else {
            
            axios.get("gggggggg/" + "?" + searchData + "&page=1&pageSize=100&username=" + currentUser.usernameWithoutAt,
            {
                headers: {
                    ContentType: "application/json",
                    Authorization: currentUser?.token,
                }
            }
            ).then(res => {
                let searchDataNew = res?.data?.data;

                let postUserItems = searchDataNew;

                const postList = postUserItems?.length ? (
                    postUserItems.map((post, id) => {
                        let dateCreated = new Date(post.createdAt);
                        let dateUpdated = new Date(post.createdOn);
                        return (
                            {
                                id: id+1,
                                email: post.username,
                                role: post.userrole.profilename,
                                createdOn: moment(post?.modon).format('DD/MM/YYYY'),
                                action:
                                <Fragment>
                                   
                                </Fragment>
                            }
                        )
                    })
                ) : []
                setData(postList)

            }).catch(function (error) {
                if (error.response) {
                    /*
                     * The request was made and the server responded with a
                     * status code that falls out of the range of 2xx
                     */
                } else if (error.request) {
                    /*
                     * The request was made but no response was received, error.request
                     * is an instance of XMLHttpRequest in the browser and an instance
                     * of http.ClientRequest in Node.js
                     */
                } else {
                    // Something happened in setting up the request and triggered an Error
    
                }
            });
        }
}

    }


    return (
        <div style={{ paddingTop: '10px'}}>
            <div className="searchDev">
                <input className="inputSearch" placeholder=" Search  by name ..." onKeyPress={ (e)=> enterKeyToFilter(e, document.getElementsByClassName("inputSearch")[0].value ) } />
                {/* onChange={(e) => searchFilter(e, e.target.value)} */}
                <Button id="btnSearch" onClick={ (e)=> searchFilter(e, document.getElementsByClassName("inputSearch")[0].value ) } > Search </Button>
            </div> 
            
            <DataTable
                title=""
                columns={columns}
                data={[]}
                striped
                persistTableHead
                fixedHeader
                fixedHeaderScrollHeight="90vh"
                progressComponent={<div>swalLoading</div>}
                pagination
                paginationServer
                paginationTotalRows={totalRows}
                onChangeRowsPerPage={handlePerRowsChange}
                onChangePage={handlePageChange}
                customStyles={customStyles}

            />
            
        </div>


    );
};
export default Dtable;