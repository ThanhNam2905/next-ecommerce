import { Loading3QuartersOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, notification } from 'antd';
import React, { useEffect, useReducer, useState } from 'react';
import { getError } from '../../../../utils/getError';
import axios from 'axios';
import toSlugName from '../../../../utils/convertStringToSlugName';

function reducer(state, action) {
    switch (action.type) {
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

export default function CreateProductCategoryAdminPage() {
    const [{ loadingCreate }, dispatch] = useReducer(reducer, {
        loadingCreate: false
    });

    // Antd Form.
    const [form] = Form.useForm();
    const layout = {
        labelCol: {
            span: 24
        },
        wrapperCol: {
            span: 24
        }
    };

    // Get data List Categories from MongoDB
    const [arrayCategories, setArrayCategories] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`/api/admin/categories`);
                await setArrayCategories(data);
            } catch (error) {
                notification.error({
                    message: 'Thông báo',
                    description: getError(error)
                });
            }
        };
        fetchData();
    }, []);
    
    const renderCategory = (categories) => {
        let options = [];
        for(let item of categories) {
            options.push({
                value: item._id,
                label: item.nameCategory
            });
        }
        return options;
    };

    // Feature Create a new Category
    const onSubmitFormAddCategory = async (values) => {
        dispatch({ type: 'CREATE_REQUEST' });

        const { 
            nameProductCategory,
            categoryId
        } = values;

        const slugNameProductCategory = toSlugName(nameProductCategory);
        try {
            await axios.post(`/api/admin/product-categories`, {
                nameProductCategory,
                categoryId,
                slugNameProductCategory,
            });

            setTimeout(() => {
                dispatch({ type: 'CREATE_SUCCESS' });
            }, 500);

            notification.success({
                message: 'Thông báo',
                description: `Bạn vừa thêm danh mục thành công`,
            });


            // Reset value Fields in Form
            // form.resetFields('nameProductCategory');
            // form.resetFields('categoryId');
        } catch (error) {
            dispatch({ type: 'CREATE_FAIL' });
            notification.error({
                message: 'Thông báo',
                description: getError(error)
            })
        }
    };

   

    return (
        <>
            <h1 className="text-[18px] capitalize text-gray-700 font-semibold !my-4">
                Thêm danh mục sản phẩm
            </h1>

            <Form
                name="form-create-product-category"
                className="form-create-product-category bg-white !py-10 !px-8 !mt-4 !rounded-lg space-y-2 !shadow-lg"
                form={form}
                {...layout}
                initialValues={{
                    remember: true
                }}
                onFinish={onSubmitFormAddCategory}
            >
                <div className="!flex items-start justify-between gap-x-8">
                    <h3 className="w-[28%] text-[15px] font-normal capitalize">
                        Tên danh mục sản phẩm:
                    </h3>
                    <Form.Item
                        name="nameProductCategory"
                        style={{ width: '100%' }}
                        rules={[
                            {
                                required: true,
                                message:
                                    'Tên danh mục sản phẩm không được để trống!'
                            }
                        ]}
                        hasFeedback
                    >
                        <Input
                            type="text"
                            min={0}
                            max={200}
                            placeholder="Name product category"
                            className="!py-2.5 !px-4 !rounded-md placeholder:!text-gray-500"
                        />
                    </Form.Item>
                </div>
                <div className="!flex items-start justify-between gap-x-8">
                    <h3 className="w-[28%] text-[15px] font-normal capitalize">
                        Danh mục:
                    </h3>
                    <Form.Item
                        name="categoryId"
                        style={{ width: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn danh mục!'
                            }
                        ]}
                        hasFeedback
                    >
                        <Select
                            showSearch
                            style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center'
                            }}
                            placeholder="Search to Select"
                            className="ant-selectSearch__customize-css focus:!ring-0 focus:!outline-none"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                (option?.label ?? '')
                                    .toLowerCase()
                                    .includes(input.toLowerCase())
                            }
                            options={renderCategory(arrayCategories)}
                        />
                    </Form.Item>
                </div>
                <div className="pt-6">
                    <Form.Item style={{ width: '100%' }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="w-full !py-6 !flex items-center justify-center !text-lg"
                        >
                            {loadingCreate ? (
                                <div className="flex items-center gap-x-2">
                                    <p>Đang tải...</p>
                                    <Loading3QuartersOutlined className="animate-spin" />
                                </div>
                            ) : (
                                <p>Thêm danh mục sản phẩm</p>
                            )}
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </>
    );
}
