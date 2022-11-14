import { AppstoreAddOutlined, EditOutlined, Loading3QuartersOutlined } from '@ant-design/icons';
import { Table, Image, Button, Tooltip } from 'antd';
import axios from 'axios';
import Link from 'next/link';
// import Image from 'next/image';
import React, { useEffect, useReducer, useState } from 'react'
import { getError } from '../../../utils/getError';


function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, products: action.payload, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'CREATE_REQUEST': 
            return { ...state, loadingCreate: true };
        case 'CREATE_SUCCESS': 
            return { ...state, loadingCreate: false };
        case 'CREATE_FAIL': 
            return { ...state, loadingCreate: false };
        default:
            return state;
    }
}


export default function AdminProductsPage() {

    const [{ loading, error, products }, dispatch] = useReducer(reducer, {
        loading: true,
        products: [],
        error: '',
        loadingCreate: true
    });

    const [visible, setVisible] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch({ type: 'FETCH_REQUEST' });
                const { data } = await axios.get(`/api/admin/products`);
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (error) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(error) });
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
            title: 'Tên sản phẩm',
            dataIndex: "nameProduct",
            key: 'nameProduct',
            align: 'center',
            width: '20',
            render: (text) => 
                <div className="text-center font-semibold line-clamp-1">
                    <Tooltip placement='bottom' title={text}>{text}</Tooltip>
                </div>
        },
        {
            title: 'Code SP',
            dataIndex: "codeProduct",
            key: 'codeProduct',
            align: 'center',
            render: (text) => <p className="text-center">{text}</p>
        },
        {
            title: 'Ảnh SP',
            dataIndex: "imagesProducts",
            key: 'imagesProducts',
            align: 'center',
            render: (imagesArray) => (
                <>
                    <Image
                        preview={{ visible: visible === imagesArray.index ? true : null }}
                        width={80}
                        height={80}
                        src={imagesArray[0].url_img}
                        alt='images products'
                        onClick={() => setVisible(imagesArray[0].public_id)}
                    />
                    <div style={{ display: 'none' }}>
                        <Image.PreviewGroup preview={{ visible : visible === imagesArray[0].public_id ? true : null, onVisibleChange: vis => setVisible(vis) }}>  
                            
                            {
                                imagesArray.length > 0 && 
                                imagesArray.map((img, index) =>(
                                        <Image 
                                            src={img.url_img} 
                                            key={index}
                                            alt={img.url_img}/>
                                    ))
                            }
                        </Image.PreviewGroup>
                    </div>
                    
                </>
            )
        },
        {
            title: 'Giá tiền',
            dataIndex: "priceProduct",
            key: 'priceProduct',
            align: 'center',
            render: (text) =>
                <p className="text-center font-normal text-red-600">
                    {new Intl.NumberFormat().format(text)}
                    <sup className='underline ml-1 mt-6'>đ</sup>
                </p>
        },
        {
            title: (
                <>
                    <p>Hành động</p>
                    <p className='flex items-center justify-center divide-x divide-gray-600 !mt-4'>
                        <p className='pr-4'>Xem chi tiết</p>
                        <p className='pl-4 flex items-center gap-x-2'>Edit <EditOutlined/></p>    
                    </p>
                </>
            ),
            key: 'actions',
            align: 'center',
            render: () => (
                <div className=' flex items-center justify-around'>
                    <Button type="primary">Details</Button>
                    <Button className='!flex !items-center gap-x-2'>Edit<EditOutlined/></Button>
                </div>
            )
        },
    ];

    console.log(products);
    const listUsers = [];
    for (let item = 0; item < products.length; item++) {
        listUsers.push({
            stt: item,
            nameProduct: products[item].nameProduct,
            codeProduct: products[item].codeProduct,
            priceProduct: products[item].priceProduct,
            imagesProducts: products[item].imagesProduct,
        })
    }

    return (
        <>
            <h2 className='text-[19px] text-center !mt-2 !mb-4'>Danh sách Sản phẩm</h2>
            <div className='mb-5'>
                <Button type="primary" size='large'>
                    <Link href={`/admin/products/create-product`}>
                        <a className='!text-white'>Thêm sản phẩm</a>
                    </Link>
                </Button>
            </div>

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
