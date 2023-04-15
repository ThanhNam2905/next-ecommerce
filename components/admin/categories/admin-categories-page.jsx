import {
    ClockCircleOutlined,
    Loading3QuartersOutlined
} from '@ant-design/icons';
import { Button, notification, Popconfirm, Table, Tag, Tooltip } from 'antd';
import axios from 'axios';
import React, { useEffect, useReducer, useState } from 'react';
import { getError } from '../../../utils/getError';
import EditSVGIcon from '../../../utils/icon-svg/editSVGIcon';
import RemoveSVGIcon from '../../../utils/icon-svg/removeSVGIcon';
import { useRouter } from 'next/router';
// Date-fns
import { format, formatDistanceToNow, parseISO } from 'date-fns';
import viLocale from 'date-fns/locale/vi';

function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                loading: false,
                categories: action.payload,
                error: ''
            };
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
    const [
        { loading, error, categories, successDelete, loadingDelete },
        dispatch
    ] = useReducer(reducer, {
        loading: true,
        error: '',
        categories: [],
        loadingDelete: false,
    });

    const router = useRouter();

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
        if (successDelete) {
            dispatch({ type: 'DELETE_RESET' });
        } else {
            fetchData();
        }
    }, [successDelete]);

    // Antd Component Popconfirm
    const [visibleDelete, setVisibleDelete] = useState(false);
    const [indexCategory, setIndexCategory] = useState(null);
    const handleCancelDeleteCategory = () => {
        setVisibleDelete(false);
        setIndexCategory(null);
    };
    const showPopconfirm = (key) => {
        setVisibleDelete(true);
        setIndexCategory(key);
    };

    // Handler Delete Category
    const handleConfirmDeleteCategory = async (idCategory, name) => {
        dispatch({ type: 'DELETE_REQUEST' });
        try {
            await axios.delete(`/api/admin/categories/${idCategory}`);
            dispatch({ type: 'DELETE_SUCCESS' });
            notification.success({
                message: 'Thông báo',
                description: `Bạn đã xoá danh mục ${name} thành công`
            });
        } catch (error) {
            dispatch({ type: 'DELETE_FAIL' });
            notification.error({
                message: 'Thông báo',
                description: getError(error)
            });
        }
    };

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
            title: 'Tên Danh mục',
            dataIndex: 'nameCategory',
            key: 'nameCategory',
            align: 'center',
            width: 220,
            render: (nameCategory) => (
                <p className="text-center">{nameCategory}</p>
            )
        },
        {
            title: 'Tên tiêu đề',
            dataIndex: 'title',
            key: 'title',
            align: 'center',
            render: (text) => <p className="text-center">{text}</p>
        },
        {
            title: 'Phân loại',
            dataIndex: 'typeCategory',
            key: 'typeCategory',
            align: 'center',
            render: (text) => <p className="text-center">{text}</p>
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
            dataIndex: 'categoriesItem',
            key: 'action',
            align: 'center',
            render: (categoriesItem) => (
                <div className="flex items-center justify-center gap-x-4">
                    <Tooltip title="Chỉnh sửa" color="#1890ff">
                        <Button
                            type="primary"
                            className="!flex !items-center !justify-center !px-3"
                            onClick={() =>
                                router.push(
                                    `/admin/categories/edit-category/${categoriesItem._id}`
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
                                <span className="font-bold italic px-1">
                                    {' '}
                                    {categoriesItem.nameCategory}{' '}
                                </span>
                                hay không?
                            </p>
                        )}
                        placement="topRight"
                        open={
                            categoriesItem._id === indexCategory
                                ? visibleDelete
                                : null
                        }
                        cancelText="Huỷ bỏ"
                        okButtonProps={{ loading: loadingDelete }}
                        onCancel={handleCancelDeleteCategory}
                        okText="Xoá"
                        onConfirm={() =>
                            handleConfirmDeleteCategory(categoriesItem._id)
                        }
                    >
                        <Tooltip title="Remove" color="#ff4d4f">
                            <Button
                                danger
                                type="primary"
                                className="!flex !items-center !px-3"
                                onClick={() =>
                                    showPopconfirm(
                                        categoriesItem._id,
                                        categoriesItem.name
                                    )
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
    for (let item = 0; item < categories.length; item++) {
        dataList.push({
            stt: item,
            nameCategory: categories[item].nameCategory,
            title: categories[item].title,
            typeCategory: categories[item].typeCategory,
            createdAt: categories[item].createdAt,
            updatedAt: categories[item].updatedAt,
            categoriesItem: categories[item]
        });
    }

    return (
        <>
            <h2 className="text-[18px] capitalize text-gray-700 font-semibold !my-4">
                Danh sách Danh mục
            </h2>

            {loading ? (
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
