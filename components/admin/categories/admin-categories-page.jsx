import { ClockCircleOutlined, DeleteFilled, EditOutlined, Loading3QuartersOutlined } from '@ant-design/icons';
import { Button, Input, notification, Popconfirm, Table, Tag } from 'antd';
import axios from 'axios';
import React, { useEffect, useReducer, useRef, useState } from 'react'
import { getError } from '../../../utils/getError';



function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, categories: action.payload, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        
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

export default function AdminCategoriesPage() {

    const [{ loading, error, categories, successDelete, loadingDelete }, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
        categories: []
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch({ type: 'FETCH_REQUEST' });
                const { data } = await axios.get(`/api/admin/categories`);
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (error) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(error) });
            }
        };
        if(successDelete) {
            dispatch({ type: 'DELETE_RESET'});
        }
        else {
            fetchData();
        }
        
    }, [successDelete]);

    // Feature Update Category
    const [visibleColumnEditItem, setVisibleColumnEditItem] = useState(null);
    const [disableBtnEdit, setDisableBtnEdit] = useState(true);

    const handleCancelUpdateCategory = () => {
        setVisibleColumnEditItem(null);
        setDisableBtnEdit(true);
    }

    const handleUpdateCategory = async (id) => {
        console.log(id);
    }

    const [nameCategory, setNameCategory] = useState('');
    const inputRef = useRef(null);
    const handleChangeInputName = async(e) => {
        const { value } = e.target.value;
        await setNameCategory(value);
        await setDisableBtnEdit(false);
    }

    // Antd Component Popconfirm
    const [visible, setVisible] = useState(false);
    const [indexCategory, setIndexCategory] = useState(null);
    const handleCancelDeleteCategory = () => {
        setVisible(false);
        setIndexCategory(null);
    };
    const showPopconfirm = (key) => {
        setVisible(true);
        setIndexCategory(key);
    };

    const handleConfirmDeleteCategory = async (idCategory, name) => {

        // console.log(idCategory);
        try {
            dispatch({ type: 'DELETE_REQUEST' });
            await axios.delete(`/api/admin/categories/${idCategory}`);
            dispatch({ type: 'DELETE_SUCCESS' });
            notification.success({
                message: 'Thông báo',
                description: `Bạn đã xoá danh mục sản phẩm ${name} thành công`
            });
        } catch (error) {
            dispatch({ type: 'DELETE_FAIL' });
            notification.error({
                message: 'Thông báo',
                description: getError(error)
            });
        }
    }

    


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
            title: 'Tên Danh mục sản phẩm',
            dataIndex: "itemCategories",
            key: 'nameCategory',
            align: 'center',
            width: 220,
            render: (itemCategories) => (
                visibleColumnEditItem === itemCategories._id ? (
                    <div>
                        <Input  defaultValue={itemCategories.name}
                                onChange={handleChangeInputName}
                                ref={inputRef}/>
                    </div>
                ) : (
                    <p className="text-center">{itemCategories.name}</p>
                )
            )
        },
        {
            title: 'Slug',
            dataIndex: "slugCategory",
            key: 'slugCategory',
            align: 'center',
            render: (text) => <p className="text-center">{text}</p>
        },
        {
            title: 'Ngày tạo',
            dataIndex: "createdAt",
            key: 'createdAt',
            align: 'center',
            render: (text) => (
                <Tag
                    className='!inline-flex !items-center gap-x-1.5 !py-1 !px-3'
                    icon={<ClockCircleOutlined />}
                    color="blue">{text.substring(0, 10)}
                </Tag>
            )
        },
        {
            title: 'Ngày cập nhật',
            dataIndex: "updatedAt",
            key: 'updatedAt',
            align: 'center',
            render: (text) => (
                <Tag
                    className='!inline-flex !items-center gap-x-1.5 !py-1 !px-3'
                    icon={<ClockCircleOutlined />}
                    color="green">{text.substring(0, 10)}
                </Tag>
            )
        },
        {
            title: (
                <>
                    <div>Hành động</div>
                    <div className='flex items-center justify-center divide-x divide-gray-600 !mt-4'>
                        <p className='pr-4'>Edit</p>
                        <p className='pl-4 flex items-center gap-x-2'>Delete</p>
                    </div>
                </>
            ),
            dataIndex: "itemCategories",
            key: 'itemCategories',
            align: 'center',
            render: (itemCategories) => (

                <div className=' flex items-center justify-around'>
                    {
                        visibleColumnEditItem === itemCategories._id ? (
                            <div className="flex space-x-3">
                                <Button type='default' onClick={handleCancelUpdateCategory}>Huỷ bỏ</Button>
                                <Button type="primary"
                                    disabled={disableBtnEdit}
                                    onClick={() => handleUpdateCategory(itemCategories._id)}>Cập nhật
                                </Button>
                            </div>
                        ) : (
                            <div className='flex items-center gap-x-4'>
                                <Button
                                    type="primary"
                                    className='!flex !items-center gap-x-2'
                                    onClick={() => {
                                        setVisibleColumnEditItem(itemCategories._id);
                                        inputRef.current &&
                                        inputRef.current.focus({
                                            cursor: 'end'
                                        })
                                    }}>
                                    Edit<EditOutlined />
                                </Button>
                                <Popconfirm
                                    title="Bạn có muốn xoá tài khoản này hay không?"
                                    placement="topRight"
                                    open={itemCategories._id === indexCategory ? visible : null}
                                    cancelText="Cancel"
                                    okButtonProps={{ loading: loadingDelete }}
                                    onCancel={handleCancelDeleteCategory}
                                    okText="Delete"
                                    onConfirm={() => handleConfirmDeleteCategory(itemCategories._id)}>
                                    <Button
                                        danger
                                        className='!flex !items-center gap-x-2'
                                        onClick={() => showPopconfirm(itemCategories._id, itemCategories.name)}>
                                        Delete<DeleteFilled />
                                    </Button>
                                </Popconfirm>
                            </div>
                        )
                    }



                </div>


            )
        },
    ];

    const dataList = [];
    for (let item = 0; item < categories.length; item++) {
        dataList.push({
            stt: item,
            slugCategory: categories[item].slug,
            createdAt: categories[item].createdAt,
            updatedAt: categories[item].updatedAt,
            itemCategories: categories[item],
        })
    }


    return (
        <>
            <h2 className='text-[19px] flex items-center justify-center gap-x-2 !mt-2 !mb-4'>
                Danh sách Danh mục sản phẩm
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
                        dataSource={dataList}
                        bordered />
                )
            }
        </>
    )
}
