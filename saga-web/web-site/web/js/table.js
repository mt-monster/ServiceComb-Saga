/*
 *   Copyright 2017 Huawei Technologies Co., Ltd
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */

$("#content").bootstrapTable({
    method: 'get',
    dataType: 'json',
    url: 'http://localhost:8080/requests/',
    queryParams: function queryParams(params) {
        var start = document.getElementById("startTime").value;
        var end = document.getElementById("endTime").value;
        return {
            startTime: changeDateFormat(start),
            endTime: changeDateFormat(end),
            pageIndex: params.pageNumber,
            pageSize: params.limit
        };

    }
    ,
    cache: false,
    totalField: 'totalCount',
    dataField: 'requests',
    striped: true,
    pageNumber: 1,
    pageSize: 2,
    pagination: true,
    sidePagination: "server",
    queryParamsType: 'limit',
    columns: [
        {checkbox: true},
        {
            field: 'id',
            title: 'Id',
            align: 'center',
            width: '10%'
        },
        {
            field: 'sagaId',
            title: 'SagaId',
            align: 'center',
            width: '35%'
        },
        {
            field: 'startTime',
            title: 'StartTime',
            align: 'center',
            width: '20%',
            //——修改——获取日期列的值进行转换
            formatter: function (value, row, index) {
                return changeDateFormat(value);
            }
        },
        {
            field: 'completedTime',
            title: 'CompletedTime',
            align: 'center',
            width: '20%',
            //——修改——获取日期列的值进行转换
            formatter: function (value, row, index) {
                return changeDateFormat(value);
            }
        },
        {
            field: 'status',
            title: 'Status',
            align: 'center',
            width: '15%',
            //查看状态详情
            formatter: function (value, row, index) {
                return statusDetails(value,row);
            }
        }

    ]

});


function refresh(params) {

    var start = document.getElementById("startTime").value;
    var end = document.getElementById("endTime").value;

    var params = {
        startTime: changeDateFormat(start),
        endTime: changeDateFormat(end),
        pageIndex: 1,
        pageSize: params.limit
    }
    $('#content').bootstrapTable('refresh', params);
}

//时间转换
function changeDateFormat(value) {
    var date = new Date(value);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    var minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    var second = date.getSeconds();
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
}

//查看状态详情
function statusDetails(value,row) {
    var sagaId = row.sagaId;
    var url = "<a href='detail.jsp?sagaId="+sagaId+"'>"+value+"</a>";
    return url;
}

