import React from 'react';
import Dtable from './Dtable';

import { getApplication } from '../../dashboard/DashboardData';
import { Badge } from 'reactstrap';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

const userData = JSON.parse(localStorage.getItem("userDataStore"));
let userGetInfoData = getApplication();
let userGetInfo = []
userGetInfoData?.list?.then(value => { (userGetInfo = value) });
console.log("outside compo userGetInfo", userGetInfoData)

const Application = () => {
    return (
        <div>
            <Dtable />
        </div>
    );
};

export default Application;