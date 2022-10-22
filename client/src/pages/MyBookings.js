import React from "react";
import { Space, Table, Tag } from 'antd';

const columns = [
    {
        title: 'Purpose',
        dataIndex: 'purpose',
        key: 'purpose',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Date/Time',
        dataIndex: 'dateTime',
        key: 'dateTime',
    },
    {
        title: 'Lab',
        dataIndex: 'lab',
        key: 'lab',
    },
    {
        title: 'Check-in',
        key: 'checkIn',
        dataIndex: 'checkIn',
        render: (_, { tags }) => (
            <>
                {tags.map((tag) => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'Unconfirm') {
                        color = 'red';
                    }
                    if (tag === 'Confirm') {
                        color = 'green';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: 'Description',
        key: 'description',
        render: (_, record) => (
            <Space size="middle">
                <a>Invite {record.name}</a>
                <a>Delete</a>
            </Space>
        ),
    },
];
const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['Unconfirm'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['Confirm'],
    },
    
];

const MyBookings = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">

                </div>

                <div className="col-md-8 m-3">
                    <h2 className="m-5">My Bookings</h2>

                    <Table columns={columns} dataSource={data} />


                </div>

            </div>


        </div>
    )
}

export default MyBookings;