import { Loading3QuartersOutlined, UserOutlined } from '@ant-design/icons';
import { Switch, Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import { getError } from '../../../utils/getError';


function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: ''};
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, users: action.payload, error: ''};
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}


export default function AdminUsersPage() {

    const [{ loading, error, users }, dispatch] = useReducer(reducer, {
        loading: true,
        users: [],
        error: ''
    });

    useEffect(() => {
        const fetchData = async() => {
            try {
                dispatch({ type: 'FETCH_REQUEST' });
                const { data } = await axios.get('/api/admin/users');
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (error) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(error)});
            }
        };
        fetchData();
    }, []);

    const columns = [
        {
            title: 'STT',
            dataIndex: "stt",
            key: 'stt',
            align: 'center',
            width: 35,
            render: (text) => <p className="text-center">{text + 1}</p>
        },
        {
            title: 'Email',
            dataIndex: "email",
            key: 'email',
            align: 'center',
            render: (text) => <p className="text-center">{text}</p>
        },
        {
            title: 'Họ tên',
            dataIndex: "username",
            key: 'username',
            align: 'center',
            render: (text) => <p className="text-center">{text}</p>
        },
        {
            title: 'Số điện thoại',
            dataIndex: "numberPhone",
            key: 'numberPhone',
            align: 'center',
            render: (text) => <p className="text-center">{text}</p>
        },
        {
            title: 'Phân quyền User',
            dataIndex: "isAdmin",
            key: 'isAdmin',
            align: 'center',
            render: (text) => (
                <Switch 
                    checkedChildren='Admin' 
                    unCheckedChildren='User' 
                    defaultChecked={text ? true : false } 
                    className='!w-10'
                    />
            )
        },
    ];

    console.log(users);
    const listUsers = [];
    for( let item = 0; item < users.length; item++) {
        listUsers.push({
            stt: item,
            email: users[item].email,
            username: users[item].name,
            numberPhone: users[item].numberPhone,
            isAdmin: users[item].isAdmin,
        })
    }

    return (
        <>
            <h2 className='text-[19px] flex items-center justify-center gap-x-2 !mt-2 !mb-4'>
                <UserOutlined />
                Danh sách Tài khoản
            </h2>
            {
                loading ? (
                    <div className='w-full h-screen flex items-center justify-center bg-gray-50'>
                        <h3 className='text-3xl text-gray-600 font-semibold shadow-lg inline-flex items-center gap-x-2.5'>
                            <Loading3QuartersOutlined className='text-[38px] animate-spin' /> Đang tải...
                        </h3>
                    </div>
                ) : error ? (
                        <div className='alert--error'>{error}</div>
                ) : (
                    <Table 
                        columns={columns} 
                        dataSource={listUsers} 
                        bordered />
                )
            }
        </>
    )
}
