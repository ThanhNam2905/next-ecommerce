import { DeleteOutlined, EditOutlined, Loading3QuartersOutlined } from '@ant-design/icons';
import { Table, Image, Button, Tooltip, Popconfirm, notification } from 'antd';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
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

        case 'DELETE_REQUEST':
            return { ...state, loadingDelete: true };
        case 'DELETE_SUCCESS':
            return { ...state, loadingDelete: false, successDelete: true };
        case 'DELETE_FAIL':
            return { ...state, loadingDelete: false };
        case 'DELETE_RESET':
            return { ...state, loadingDelete: false, successDelete: false };

        default:
            return state;
    }
}


export default function AdminProductsPage() {

    const router = useRouter();
    const [{ loading, error, products, loadingDelete, successDelete }, dispatch] = useReducer(reducer, {
        loading: true,
        products: [],
        error: '',
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

        if(successDelete) {
            dispatch({ type: 'DELETE_RESET' });
        }
        else {
            fetchData();
        }
    }, [successDelete]);


    //  Handler Event Delete Item Product
    const [openPopconfirmDeleteItem, setOpenPopconfirmDeleteItem] = useState(loadingDelete);
    const [indexProduct, setIndexProduct] = useState(null);
    const [confirmLoading, setConfirmLoadingDelete] = useState(false);

    const showPopconfirmDeleteItem = (idProduct) => {
        setOpenPopconfirmDeleteItem(true);
        setIndexProduct(idProduct);
    }

    const handlerDeleteItemProduct = async (idProduct) => {
        setConfirmLoadingDelete(true);

        try {
            dispatch({ type: 'DELETE_REQUEST' });
            await axios.delete(`/api/admin/products/${idProduct}`);
            setTimeout(() => {
                dispatch({ type: 'DELETE_SUCCESS' });
                setConfirmLoadingDelete(false);
            }, 1500);
            
            notification.success({
                message: 'Th??ng b??o',
                description: `B???n ???? xo?? s???n ph???m th??nh c??ng`
            });
        } catch (error) {
            dispatch({ type: 'DELETE_FAIL' });
            notification.error({
                message: 'Th??ng b??o',
                description: getError(error)
            });
        }

        setTimeout(() => {
            setOpenPopconfirmDeleteItem(false);
            setConfirmLoadingDelete(false);
        }, 500);
    };
    const handleCancelDeleteItemProduct = () => {
        setOpenPopconfirmDeleteItem(false);
    };

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
            title: 'T??n s???n ph???m',
            dataIndex: 'productItem',
            key: 'nameProduct',
            align: 'center',
            width: '20',
            render: (productItem) =>
                <div className="text-center font-semibold line-clamp-1">
                    <Tooltip placement='bottom' title='Xem chi ti???t s???n ph???m'>
                        <Link href={`/product/${productItem.slugProduct}`}>
                            <a target='_blank' className='hover:underline hover:decoration-[1.5px] hover:underline-offset-2 transition-all duration-300 ease-linear'>{productItem.nameProduct}</a>
                        </Link>
                    </Tooltip>
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
            title: '???nh SP',
            dataIndex: "imagesProducts",
            key: 'imagesProducts',
            align: 'center',
            render: (imagesArray) => (
                <>
                    <Image
                        preview={{ visible: visible === imagesArray.index ? true : null }}
                        width={80}
                        height={80}
                        src={imagesArray[0].url}
                        alt={imagesArray[0].url}
                        onClick={() => setVisible(imagesArray[0].public_id)}
                    />
                    <div style={{ display: 'none' }}>
                        <Image.PreviewGroup preview={{ visible: visible === imagesArray[0].public_id ? true : null, onVisibleChange: vis => setVisible(vis) }}>

                            {
                                imagesArray.length > 0 &&
                                imagesArray.map((img, index) => (
                                    <Image
                                        src={img.url}
                                        key={index}
                                        alt={img.url} />
                                ))
                            }
                        </Image.PreviewGroup>
                    </div>

                </>
            )
        },
        {
            title: 'Gi?? ti???n',
            dataIndex: "priceProduct",
            key: 'priceProduct',
            align: 'center',
            render: (text) =>
                <p className="text-center font-normal text-red-600">
                    {new Intl.NumberFormat().format(text)}
                    <sup className='underline ml-1 mt-6'>??</sup>
                </p>
        },
        {
            title: (
                <>
                    <p className='!mb-1.5'>H??nh ?????ng</p>
                    <div className='flex items-center justify-center divide-x-2 divide-gray-600'>
                        <p className='pr-4'>Edit</p>
                        <p className='pl-4'>Delete</p>
                    </div>
                </>
            ),
            dataIndex: "productItem",
            key: 'actions',
            align: 'center',
            render: (productItem) => (
                <div className=' flex items-center justify-around'>
                    <Button 
                        type='primary' 
                        className='!flex !items-center gap-x-2'
                        onClick={() => router.push(`/admin/products/edit-product/${productItem._id}`)}>
                            Edit<EditOutlined />
                    </Button>
                    <Popconfirm
                        title={<div>
                            <p> B???n c?? mu???n xo?? s???n ph???m 
                                <span className='text-red-500 font-semibold'> {productItem.nameProduct} </span> n??y kh??ng?
                            </p>
                        </div>}
                        open={ productItem._id === indexProduct ? openPopconfirmDeleteItem : false}
                        onConfirm={() => handlerDeleteItemProduct(productItem._id)}
                        okButtonProps={{
                            loading: confirmLoading,
                        }}
                        okText='X??c nh???n'
                        cancelText='Hu??? b???'
                        onCancel={handleCancelDeleteItemProduct}>
                        <Button 
                            type='primary' danger 
                            className='!flex !items-center gap-x-2'
                            onClick={() => showPopconfirmDeleteItem(productItem._id)}>
                                Delete <DeleteOutlined />
                        </Button>
                    </Popconfirm>
                </div >
            )
        },
    ];

    const listUsers = [];
    for (let item = 0; item < products.length; item++) {
        listUsers.push({
            stt: item,
            nameProduct: products[item].nameProduct,
            codeProduct: products[item].codeProduct,
            priceProduct: products[item].priceProduct,
            imagesProducts: products[item].imagesProduct,
            productItem: products[item],
        })
    }

    return (
        <>
            <h2 className='text-[19px] text-center !mt-2 !mb-4'>Danh s??ch S???n ph???m</h2>
            <div className='mb-5'>
                <Button type="primary" size='large'>
                    <Link href={`/admin/products/create-product`}>
                        <a className='!text-white'>Th??m s???n ph???m</a>
                    </Link>
                </Button>
            </div>

            {
                loading ? (
                    <div className='w-full h-screen flex items-center justify-center bg-gray-50'>
                        <h3 className='text-3xl text-gray-600 font-semibold shadow-lg inline-flex items-center gap-x-2.5'>
                            <Loading3QuartersOutlined className='text-[38px] animate-spin' /> ??ang t???i...
                        </h3>
                    </div>
                ) : error ? (
                    <div className='alert--error'>{error}</div>
                ) : (
                    <Table
                        key={1}
                        columns={columns}
                        dataSource={listUsers}
                        bordered />
                )
            }
        </>
    )
}
