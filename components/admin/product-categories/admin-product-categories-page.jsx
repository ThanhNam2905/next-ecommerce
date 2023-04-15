import React, { useEffect, useReducer, useState } from 'react';
import { getError } from '../../../utils/getError';
import axios from 'axios';
import {
    ClockCircleOutlined,
    Loading3QuartersOutlined
} from '@ant-design/icons';
import { Button, Popconfirm, Table, Tag, Tooltip, notification } from 'antd';
import EditSVGIcon from '../../../utils/icon-svg/editSVGIcon';
import { useRouter } from 'next/router';
import RemoveSVGIcon from '../../../utils/icon-svg/removeSVGIcon';
// Date-fns
import { format, formatDistanceToNow, parseISO } from 'date-fns';
import viLocale from 'date-fns/locale/vi';

function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loadingData: true, error: '' };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                loadingData: false,
                error: '',
                productCategories: action.payload
            };
        case 'FETCH_FAIL':
            return { ...state, loadingData: false, error: action.payload };

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

export default function AdminProductCategoriesPage() {
    const router = useRouter();
    const [
        { loadingData, error, productCategories, successDelete, loadingDelete },
        dispatch
    ] = useReducer(reducer, {
        loadingData: true,
        error: '',
        productCategories: [],
        categories: [],
        loadingDelete: false
    });

    // Get data List Categories from MongoDB
    const [arrayCategories, setArrayCategories] = useState([]);
    useEffect(() => {
        const fetchDataCategory = async () => {
            try {
                const { data } = await axios.get('/api/admin/categories');
                await setArrayCategories(data);
            } catch (error) {
                notification.error({
                    message: 'Thông báo',
                    description: getError(error)
                });
            }
        };
        fetchDataCategory();
    }, []);

    // Get data Product-Category with API
    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch({ type: 'FETCH_REQUEST' });
                const { data } = await axios.get(
                    `/api/admin/product-categories`
                );
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (error) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(error) });
            }
        };
        if (successDelete) {
            dispatch({ type: 'DELETE_RESET' });
        } else {
            fetchData();
        }
    }, [successDelete]);

    // Antd Component Popconfirm
    const [visibleDelete, setVisibleDelete] = useState(false);
    const [indexProductCategory, setIndexProductCategory] = useState(null);
    const handleCancelDeleteProductCategory = () => {
        setVisibleDelete(false);
        setIndexProductCategory(null);
    };
    const showPopconfirm = (key) => {
        setVisibleDelete(true);
        setIndexProductCategory(key);
    };

    // Handler Delete Item ProductCategory
    const handleConfirmDeleteProductCategory = async (id, nameProductCategory) => {
        dispatch({ type: 'DELETE_REQUEST' });
        try {
            await axios.delete(`/api/admin/product-categories/${id}`);
            dispatch({ type: 'DELETE_SUCCESS' });
            notification.success({
                message: 'Thông báo',
                description: `Bạn đã xoá danh mục ${nameProductCategory} thành công`
            });
        } catch (error) {
            dispatch({ type: 'DELETE_FAIL' });
            notification.error({
                message: 'Thông báo',
                description: getError(error)
            });
        }
    };

    // Get data Product-Category with API
    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
            align: 'center',
            width: 35,
            render: (text) => <p className="text-center">{text + 1}</p>
        },
        {
            title: 'Tên Danh Mục Sản Phẩm',
            dataIndex: 'nameProductCategory',
            key: 'nameProductCategory',
            align: 'center',
            render: (text) => <p className="text-left">{text}</p>
        },
        {
            title: 'Loại Danh Mục',
            dataIndex: 'categoryId',
            key: 'categoryId',
            align: 'center',
            render: (categoryId) => (
                <p className="text-left">
                    {arrayCategories.map((item) => {
                        if (item._id === categoryId) {
                            return item.nameCategory;
                        }
                    })}
                </p>
            )
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            align: 'center',
            render: (time) => (
                <Tooltip
                    placement="bottom"
                    title={format(parseISO(time), 'PPPP - HH:MM', {
                        locale: viLocale
                    })}
                >
                    <Tag
                        className="!inline-flex !items-center gap-x-1.5 !py-1 !px-3"
                        icon={<ClockCircleOutlined />}
                        color="blue"
                    >
                        {format(parseISO(time), 'dd/MM/yyyy - HH:MM')}
                    </Tag>
                </Tooltip>
            )
        },
        {
            title: 'Ngày cập nhật',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            align: 'center',
            render: (time, index) => (
                <Tooltip
                    placement="bottom"
                    title={format(parseISO(time), 'PPPP - HH:MM', {
                        locale: viLocale
                    })}
                >
                    <Tag
                        className="!inline-flex !items-center gap-x-1.5 !py-1 !px-3"
                        icon={<ClockCircleOutlined />}
                        color="green"
                    >
                        {formatDistanceToNow(
                            parseISO(
                                index.createdAt === index.updatedAt
                                    ? time
                                    : index.updatedAt
                            ),
                            {
                                addSuffix: true,
                                locale: viLocale
                            }
                        )}
                    </Tag>
                </Tooltip>
            )
        },
        {
            title: (
                <>
                    <div>Hành động</div>
                    <div className="flex items-center justify-center divide-x divide-gray-600 !mt-4">
                        <p className="pr-4">Edit</p>
                        <p className="pl-4 flex items-center gap-x-2">Delete</p>
                    </div>
                </>
            ),
            dataIndex: 'productCategoriesItem',
            key: 'action',
            align: 'center',
            render: (productCategoriesItem) => (
                <div className="flex items-center justify-center gap-x-4">
                    <Tooltip title="Chỉnh sửa" color="#1890ff">
                        <Button
                            type="primary"
                            className="!flex !items-center !justify-center !px-3"
                            onClick={() =>
                                router.push(
                                    `/admin/product-categories/edit-product-category/${productCategoriesItem._id}`
                                )
                            }
                        >
                            <EditSVGIcon styleCustom="w-[21px] h-[21px]" />
                        </Button>
                    </Tooltip>

                    <Popconfirm
                        title={() => (
                            <p>
                                Bạn có muốn xoá danh mục
                                <span className="font-bold italic !mx-3">
                                    {productCategoriesItem.nameProductCategory}
                                </span>
                                hay không?
                            </p>
                        )}
                        placement="topRight"
                        open={
                            productCategoriesItem._id === indexProductCategory
                                ? visibleDelete
                                : null
                        }
                        cancelText="Huỷ bỏ"
                        okButtonProps={{ loading: loadingDelete }}
                        onCancel={handleCancelDeleteProductCategory}
                        okText="Xoá"
                        onConfirm={() =>
                            handleConfirmDeleteProductCategory(
                                productCategoriesItem._id,
                                productCategoriesItem.nameProductCategory
                            )
                        }
                    >
                        <Tooltip title="Remove" color="#ff4d4f">
                            <Button
                                danger
                                type="primary"
                                className="!flex !items-center !px-3"
                                onClick={() =>
                                    showPopconfirm(productCategoriesItem._id)
                                }
                            >
                                <RemoveSVGIcon styleCustom="w-[21px] h-[21px]" />
                            </Button>
                        </Tooltip>
                    </Popconfirm>
                </div>
            )
        }
    ];

    const dataList = [];
    for (let item = 0; item < productCategories.length; item++) {
        dataList.push({
            stt: item,
            nameProductCategory: productCategories[item].nameProductCategory,
            categoryId: productCategories[item].categoryId,
            createdAt: productCategories[item].createdAt,
            updatedAt: productCategories[item].updatedAt,
            productCategoriesItem: productCategories[item]
        });
    }

    return (
        <>
            <h2 className="text-[18px] capitalize text-gray-700 font-semibold !my-4">
                Danh sách Danh mục sản phẩm
            </h2>

            {loadingData ? (
                <div className="w-full h-screen flex items-center justify-center bg-gray-50">
                    <h3 className="text-3xl text-gray-600 font-semibold shadow-lg inline-flex items-center gap-x-2.5">
                        <Loading3QuartersOutlined className="text-[38px] animate-spin" />{' '}
                        Đang tải...
                    </h3>
                </div>
            ) : error ? (
                <div className="alert--error">{error}</div>
            ) : (
                <Table columns={columns} dataSource={dataList} bordered />
            )}
        </>
    );
}
