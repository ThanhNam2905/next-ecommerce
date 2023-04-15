import { Loading3QuartersOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, notification } from 'antd';
import axios from 'axios';
import React, { useEffect, useReducer, useState } from 'react';
import { getError } from '../../../../utils/getError';
import { useRouter } from 'next/router';
import toSlugName from '../../../../utils/convertStringToSlugName';


function reducer(state, action) {
    switch(action.type) {
        case 'UPDATE_REQUEST':
            return { ...state, loadingUpdate: true, errorUpdate: ''};
        case 'UPDATE_SUCCESS':
            return { ...state, loadingUpdate: false, errorUpdate: ''};
        case 'UPDATE_FAIL': 
            return { ...state, loadingUpdate: false, errorUpdate: action.payload };
    }
}

export default function EditProductCategoryAdminPage() {

    const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
        loadingUpdate: false, 
        errorUpdate: ''
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
    }
    
    // Get Data from Api
    const router = useRouter();
    const { id } = router.query;
    const [productCategory, setProductCategory] = useState({
        nameProductCategory: '',
        categoryId: '',
    });
    useEffect(() => {
        const fetchData = async() => {
            try {
                if(id) {
                    const { data } = await axios.get(`/api/admin/product-categories/${id}`);
                    await setProductCategory({
                        nameProductCategory: data.productCategory.nameProductCategory,
                        categoryId: data.productCategory.categoryId
                    });
                }
            } catch (error) {
                notification.error({
                    message: 'Thông báo',
                    description: getError(error)
                });
            }
        };
        fetchData();
    }, [id]);
    useEffect(() => {
        if(productCategory) {
            form.setFieldsValue({
                nameProductCategory: productCategory.nameProductCategory,
                categoryId: productCategory.categoryId
            })
        }
    }, [form, productCategory]);

    // Handler Edit Product Category
    const onSubmitFormEditProductCategory = async (values) => {
        dispatch({ type: 'UPDATE_REQUEST'});

        const {
            nameProductCategory,
            categoryId
        } = values;
        const slugNameProductCategory = await toSlugName(nameProductCategory);

        try {
            await axios.put(`/api/admin/product-categories/${id}`, {
                nameProductCategory, 
                categoryId,
                slugNameProductCategory
            });

            setTimeout(() => {
                dispatch({ type: 'UPDATE_SUCCESS' });
            }, 500);

            notification.success({
                message: 'Thông báo',
                description: `Bạn vừa chỉnh sửa danh mục sản phẩm thành công`
            });

            router.push('/admin/product-categories');
        } catch (error) {
            dispatch({ type: 'UPDATE_FAIL'});
            notification.error({
                message: 'Thông báo',
                description: getError(error)
            })
        }
    }

    return (
        <>
            <h1 className="text-[18px] capitalize text-gray-700 text-left font-semibold !mt-4 !mb-6">
                Chỉnh sửa danh mục sản phẩm
            </h1>

            <Form
                name="form-edit-product-category"
                className="form-edit-product-category bg-white !py-10 !px-8 !mt-4 !rounded-lg space-y-2 !shadow-lg"
                form={form}
                {...layout}
                initialValues={{
                    remember: true
                }}
                onFinish={onSubmitFormEditProductCategory}
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
                            {   loadingUpdate ? (
                                <div className="flex items-center gap-x-2">
                                    <p>Đang tải...</p>
                                    <Loading3QuartersOutlined className="animate-spin" />
                                </div>
                            ) : (
                                <p>Chỉnh sửa danh mục sản phẩm</p>
                            )}
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </>
    );
}
